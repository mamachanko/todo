#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"

main() {
  build
  e2e
  push
  celebrate
}

build() {
  echo ""
  echo "👷🏻‍♀️ let's build"
  echo ""

  ./build-client.sh
  ./build-api.sh
}

e2e() {
  echo ""
  echo "🧪️ let's e2e"
  echo ""

  ./e2e-local.sh
}

push() {
  echo ""
  echo "🆙 let's push"
  echo ""

  git push
}

celebrate() {
  echo ""
  echo "🚢 successfully shipped:"
  echo "🍾"
  echo "🍾     $(git show -s --format=oneline @)"
  echo "🍾"
  echo ""
}

main
