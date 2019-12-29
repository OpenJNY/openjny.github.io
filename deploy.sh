#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd "${VUEPRESS_DIR}/.vuepress/dist"

git init
git add -A
git commit -m "Publishing site on $(date "+%Y-%m-%d %H:%M:%S")"

# if you are deploying to https://<USERNAME>.github.io
git push -f --quiet "https://${GITHUB_TOKEN}@github.com/${GITHUB_USER}/${GITHUB_USER}.github.io.git" master

cd -
