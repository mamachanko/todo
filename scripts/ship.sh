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

  export API_BASE_URL=http://api:8080

  docker-compose down --volumes --remove-orphans
  docker-compose up --detach
  docker-compose exec client /scripts/wait ${API_BASE_URL/http:\/\//} --timeout=120 -- echo good to go

  ./e2e.sh

  docker-compose down --volumes --remove-orphans
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
