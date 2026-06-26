# 糖尿病クラス分類：kNN と Random Forest の比較

## 1. 目的

`diabetes.csv` を用いて糖尿病の有無（`Outcome`）を予測する二値分類モデルを構築し、
k 近傍法（kNN）と Random Forest について、デフォルト設定と
ハイパーパラメータチューニング後の性能を比較した。

## 2. データと前処理

- 全データ数: 768 件
- 学習データ: 614 件（80%）
- テストデータ: 154 件（20%）
- 陽性率: 34.9%
- 分割方法: `random_state=42` の層化分割
- 0 を欠損値として扱った列と件数: `{"Glucose": 5, "BloodPressure": 35, "SkinThickness": 227, "Insulin": 374, "BMI": 11}`
- 欠損値は、学習データ内で算出した中央値により補完
- kNN のみ各特徴量を標準化

前処理はモデルと同じ Pipeline 内で実行し、交差検証時のデータ漏洩を防いだ。

## 3. ハイパーパラメータ探索

5 分割 Stratified K-Fold 交差検証を用い、ROC-AUC が最大になる組み合わせを
GridSearchCV で選択した。最良パラメータは以下の通り。

- **kNN**: `{"n_neighbors": 21, "p": 2, "weights": "distance"}`（最良 CV ROC-AUC: 0.834）
- **Random Forest**: `{"max_depth": 4, "max_features": "log2", "min_samples_leaf": 1, "min_samples_split": 5, "n_estimators": 300}`（最良 CV ROC-AUC: 0.841）

探索範囲は、kNN が近傍数・距離による重み・距離尺度、Random Forest が
木の数・木の深さ・分割に必要なサンプル数・葉に必要なサンプル数・
分割時に使用する特徴量数とした。

## 4. テストデータでの結果

| model         | setting   |   accuracy |   precision |   recall |    f1 |   roc_auc |
|:--------------|:----------|-----------:|------------:|---------:|------:|----------:|
| kNN           | default   |      0.753 |       0.66  |    0.611 | 0.635 |     0.79  |
| kNN           | tuned     |      0.753 |       0.682 |    0.556 | 0.612 |     0.812 |
| Random Forest | default   |      0.766 |       0.696 |    0.593 | 0.64  |     0.821 |
| Random Forest | tuned     |      0.727 |       0.65  |    0.481 | 0.553 |     0.809 |

`accuracy` は全予測の正解率、`precision` は陽性予測の信頼性、
`recall` は実際の糖尿病患者を検出できた割合、`f1` は precision と recall の調和平均、
`roc_auc` は判定閾値に依存しない識別性能を表す。

チューニング前後の差分は以下の通り（正の値が改善）。

- **kNN**（tuned − default）: accuracy +0.000、precision +0.022、recall -0.056、f1 -0.022、roc_auc +0.023
- **Random Forest**（tuned − default）: accuracy -0.039、precision -0.046、recall -0.111、f1 -0.087、roc_auc -0.012

各指標の最高値は、accuracy: Random Forest default（0.766）、precision: Random Forest default（0.696）、recall: kNN default（0.611）、f1: Random Forest default（0.640）、roc_auc: Random Forest default（0.821） だった。

## 5. 考察

kNN はチューニング後も accuracy は同じだったが、ROC-AUC と precision が向上し、
recall と F1 は低下した。Random Forest はチューニング後に全テスト指標が低下した。
これは、ハイパーパラメータを学習データ内の交差検証 ROC-AUC で選んでおり、
未知のテストデータでの改善が保証されるわけではないためである。今回の分割では、
総合的にはデフォルトの Random Forest が最も安定していた。

医療スクリーニングでは偽陰性を減らすことが重要なため、accuracy だけでなく
recall も重視する必要がある。その観点では、今回最も recall が高かった
デフォルト kNN も候補になる。一方、ROC-AUC を重視する場合は
デフォルト Random Forest が最良だった。

今回のテスト結果は単一のホールドアウト分割に対する値であり、
データ分割によるばらつきがある。また、本分析は学習課題用であり、
臨床診断へ直接利用できる性能検証を行ったものではない。

## 6. 再現方法

```bash
uv sync
uv run python main.py
```

数値結果は `results/metrics.csv`、混同行列は
`results/confusion_matrices.png`、指標比較図は `results/metric_comparison.png`
に保存される。
