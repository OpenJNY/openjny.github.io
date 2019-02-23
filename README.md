# OpenJNY

[OpenJNYの日記](https://openjny.github.io/) のソースコード

`hexo` を利用して生成しています。

## 更新方法

`git` を使用して静的サイトを生成しデプロイするには、node パッケージである `hexo-deployer-git` が必要になります。

```bash
npm install hexo-deployer-git --save
```

あとは `_config.yml` を少し編集すればデプロイの為の設定は終わり。

```yml
deploy:
  type: git
  repo: git@github.com:OpenJNY/openjny.github.io.git
  branch: master
  message: "[update] Site updated: {{ now('YYYY-MM-DD HH:mm:ss') }}"
```

ここではホスティングに github を用いました。
本セクションの最後に記載しているデプロイ用コマンドを打つことで、`OpenJNY/openjny.github.io` の `master` ブランチに生成された静的サイトがプッシュされます。

さて、生成した静的サイトをデプロイするだけでなく、記事のソースコード等もバックアップしておきたいところです。
という訳で生成に使うファイルをまとめて `src` ブランチにプッシュします。

```bash
git init
git remote add origin git@github.com:OpenJNY/openjny.github.io.git
git add -A
git commit -m "First commit"
git push -u origin master:src
```

上記の手順を踏んでおけば、デプロイとバックアップはそれぞれ次のように簡単に行えます。

```bash
# deploy
hexo deploy -g

# backup
git add -A
git commit -m "[update] Sources updated"
git push
```