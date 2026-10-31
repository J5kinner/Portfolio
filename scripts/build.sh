#!/usr/bin/env bash
# Builds every portfolio version into dist/:
#   /     -> portfolio3.0 (live)
#   /v2/  -> portfolio2.0
#   /v1/  -> portfolio1.0
set -euo pipefail
cd "$(dirname "$0")/.."

rm -rf dist
mkdir -p dist/v1 dist/v2

build_react() {
  local dir=$1 public_url=$2
  (cd "$dir" && npm ci --legacy-peer-deps && PUBLIC_URL="$public_url" npm run build)
}

build_react portfolio3.0 ""
build_react portfolio2.0 "/v2"

cp -R portfolio3.0/build/. dist/
cp -R portfolio2.0/build/. dist/v2/
rsync -a --exclude Archive portfolio1.0/ dist/v1/
