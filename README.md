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

## new post

```bash
$ yarn new <template-name> <title> [<title-for-filename>]
```

例

```bash
$ yarn new base "テンプレート エンジン Mustache で新規記事の生成" create-a-new-article-with-mustache
# yarn run v1.21.1
# $ node new-post.js base "テンプレート エンジン Mustache で新規記事の生成" create-a-new-article-with-mustache
# Created a new post at: src\_posts\2019-12-31-create-a-new-article-with-mustache.md
# Done in 0.28s.
```

## docker-compose

```bash
$ docker-compose up -d
$ docker-compose blog yarn new base foo-bar # to create a new article
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