#!/usr/bin/env bash

msg="$@"
[ -n "$msg" ] || {
    echo "Commit message must be specified."
    exit 1
}

git commit -a -m \""$msg"\" && git push origin HEAD:src && hexo clean && hexo deploy