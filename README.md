# README.md

## dev

```bash
$ yarn
$ yarn dev
```

```bash
$ docker run -it --name vuepress-blog -p 8080:8080 -v $(pwd):/blog -w /blog node:latest /bin/bash

root@containerid:/blog # yarn
root@containerid:/blog # yarn dev
```

## deploy