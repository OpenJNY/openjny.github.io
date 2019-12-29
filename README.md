# README.md

openjny.github.io のソースコード

## dev

レポジトリのクローン

```bash
$ git clone --branch vuepress git@github.com:OpenJNY/openjny.github.io.git blog
$ cd blog
```

セットアップ

```bash
$ yarn
$ yarn dev

$ docker run -it --name vuepress-blog -p 8080:8080 -v $(pwd):/blog -w /blog node:latest /bin/bash
root@containerid:/blog # yarn
root@containerid:/blog # yarn dev
```

## deploy

`vuepress` ブランチに push すれば、Travis が走って `master` ブランチに `src/.vuepress/dist` を展開してくれる。

```bash
$ cd blog

$ # do something

$ git add -A
$ git commit -m "Add an article about ..."

$ git push
```