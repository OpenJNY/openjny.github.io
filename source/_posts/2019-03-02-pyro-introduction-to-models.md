---
title: Pyro で始める確率プログラミング言語
category:
  - Python
  - Pyro
tags:
  - 確率的プログラミング
  - Pyro
  - PyTorch
  - Python
  - 機械学習
  - 統計学
date: 2019-03-02 00:17:17
---

この記事では

<!-- more -->

## Pyro とはなにか？

確率モデル (probabilistic models) は、不確かな情報や推論を表現する為に使われます。
例えば、

一方で、プログラミング言語とは何でしょうか？
プログラミング言語とは、非常に一貫性があり、高い抽象度で処理の記述を行う為の言語です。

確率モデルとプログラミング言語を合わせたのが **確率的プログラミング言語 (probabilistic programming language; PPL)** です。

ドキュメントによれば Pyro の特徴は次の 3 つらしいです[^1]。

* 豊かな表現力
  * 確率モデルの処理の流れや定義を、普通の Python コードのように書くことができます
  * Pyro のプリミティブなデータ型は、sampling, observation, learnable parameters
* スケーラブル
  * 変分推論に関する関数は、モデルと変分分布（Pyro ではガイドと呼ぶ）を入力に受取り、ELBO を最大化します
  * この関数で計算される微分やテンソル演算は、PyTorch によって高度に最適化されています
* 柔軟
  * ガイド（Pyro での変分分布の名前）は任意のプログラムであり、事前知識の組み込みやトラブルシューティングが楽にできる

[^1]: [MLTrain@UAI_-Introduction-to-Pyro.pdf](https://mltrain.cc/wp-content/uploads/2018/02/MLTrain@UAI_-Introduction-to-Pyro.pdf)

## 確率モデル

確率モデルは、パラメータと確率変数から構成されています。
確率変数はさらに観測可能性で分類できて、観測出来ない確率変数を**潜在変数 (latent variable)**といい、観測できる確率変数を**観測変数 (observed variable) **といいます。

パラメータや確率変数の依存関係を表すのに、グラフィカルモデルがよく使われます。
次の図は、グラフィカルモデルの例です。

![](/images/2019-03-02-pyro-introduction-to-models/graphical-model.png)

この例だと、

* パラメータ：$\mu, \sigma^2, \sigma^2$
* 潜在変数：$\mu_{parent}, \mu_{mfr}, \beta, \varepsilon$
* 観測変数：$y_i$

です。
グラフィカルモデルについては、『パターン認識と機械学習』や『実践 ベイズモデリング -解析技法と認知モデル』が詳しいので、気になる方がいればご覧ください。

ここで、パラメータという用語について少し補足しておきます。
一般に、母数あるいはパラメータ (parameter) とは、確率変数が従う分布を決定する統計量を指します。
PRML や階層ベイズの文脈では、パラメータの事を超パラメータと呼び、潜在変数の一部をパラメータと呼んで（つまりパラメータを確率変数として扱って）いますが、この記事では、Pyro の表記に倣ってパラメータは確率変数*ではない*ものとします。
これは後述する変分パラメータに関しても同様です。

## 推論問題

私達が確率モデルを作る理由は、「得られたデータがどんな過程で生成されているか？」という、データ生成の背景にある法則を知りたいからです。
この目的を達成するためには、**データを最も説明する**ように作ったモデルのチューニングをする必要があります。

数理的なアプローチを取る為には、モデルがデータをより良く「説明する」とは何かを定量的に定義しなければならないのですが、統計学の世界では説明度合いを**尤度 (liklihood)**で与えるのが一般的です。
我々も長いものに巻かれましょう😜[^likelihood]。

[^likelihood]: 尤度については、[尤度とは何者なのか？ - MyEnigma](https://myenigma.hatenablog.com/entry/20120624/1340538748) などの記事でも詳細を知ることができます。他にも東京大学出版会の基礎統計学シリーズの二巻も詳しいです。

### 尤度の最大化・・・？

潜在変数が存在する確率モデルの場合、尤度について少し注意しなければなりません。
というのも、尤度を計算するには、観測変数と潜在変数のどちらの確率変数も必要だからです。

具体的には、パラメータの集合を $\vtheta$、観測変数と潜在変数の集合をそれぞれ $\vX, \vZ$ とすると、尤度は $L(\vtheta) = p(\vX, \vZ; \vtheta)$ です。
$p(\vX, \vZ; \vtheta)$ は、あるモデルがパラメータ $\vtheta$ である時の、$\vX,\vZ$ の同時分布を表しています。

なんじゃい、計算する式あるんかいと思うかもしれなせんが、ところがどっこい。潜在変数はその定義からも明らかな通り、観測することができません。
ですので、この式の右辺を使って $L(\vtheta)$ を計算することは不可能です。

ここで $\vZ$ が確率変数であったことを思い出しましょう。


モデルエビデンス (evidence)**と呼ばれる値で

## Pyro での表現方法

### モデルの記述

さて、Pyro ではどのようにして確率モデルを記述するのでしょうか？

Pyro では異なる2つの関数を使って、パラメータと確率変数をそれぞれ定義します。

* `pyro.param` でパラメータを定義
* `pyro.sample` で確率変数を定義

非常に簡単ですね。
さらに `pyro.sample` のキーワード引数 `obs` に観測値を与えると、潜在変数ではなく確率変数として定義することができます。

```py
def model(x_data, y_data):
    w_prior = Normal(torch.zeros(1, 2), torch.ones(1, 2)).to_event(1)
    b_prior = Normal(torch.tensor([[8.]]), torch.tensor([[1000.]])).to_event(1)
    with pyro.plate("map", len(x_data)):
        # run the nn forward on data
        prediction_mean = lifted_reg_model(x_data).squeeze(-1)
        # condition on the observed data
        pyro.sample("obs",
                    Normal(prediction_mean, scale),
                    obs=y_data)
        return prediction_mean
```
例を見てみましょう。





モデルは、観測可能なデータ $\vx$、潜在変数 $\vz$、そしてモデルを支配するパラメータ $\theta$ で表現することが出来ます。
$\vx$ と $\vz$ の同時分布は
$$
p _ { \theta } ( \mathbf { x } , \mathbf { z } ) = p _ { \theta } ( \mathbf { x } | \mathbf { z } ) p _ { \theta } ( \mathbf { z } )
$$
と書くことができます。

ここで、与えられたデータに対して