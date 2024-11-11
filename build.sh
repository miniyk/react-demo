#!/bin/bash
# $1 --- build_external_params 的值
# $build_type --- build_type 的值

source ~/.bashrc
nvm use 18.20.4
echo "----------node版本----------"
node -v

# pnpm dlx pnpm@8.15.5 install

npx pnpm@8.15.5 install

npx pnpm install
echo "----------依赖下载完毕----------"

if [ -n "$build_type" ] && [ "$build_type" = 'online' ]; then
  npx pnpm run build:prod
  # 你的其他命令
else
  npx pnpm run build:test
fi
echo "----------构建完毕----------"
echo "----------build_type 的值: $build_type----------"
echo "----------build_external_params 的值: $1----------"

if [ $? -ne 0 ]; then
  exit 1
fi

# 检查 ./dist/ 目录是否存在且不为空
if [ ! -d "./dist/" ] || [ -z "$(ls -A ./dist/)" ]; then
  echo "Error: The ./dist/ directory is empty or does not exist."
  exit 1
fi

mkdir -p ./output/webroot/ges-admin-background

cp -r ./dist/* ./output/webroot/ges-admin-background
