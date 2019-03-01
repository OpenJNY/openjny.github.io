# openjny.github.io

[OpenJNY's Blog](https://openjny.github.io/) のソースコード

## インストール

```bash
git clone --recurse-submodules --branch src git@github.com:OpenJNY/openjny.github.io.git blog
cd blog
npm install
```

## 更新

```bash
# deploy
hexo deploy -g

# backup
git add -A
git commit -m "[update] 記事を追加"
git push
```