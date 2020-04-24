#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"

cd ../

export API_BASE_URL=http://api:8080
export CYPRESS_BASE_URL=${1:-http://localhost:8083}

main() {
  restart_containers
  wait_until_up
  run_tests
  stop_containers
}

restart_containers() {
  docker-compose down --volumes --remove-orphans
  docker-compose up --detach
}

wait_until_up() {
  docker-compose \
    exec \
    client \
    /scripts/wait.sh ${API_BASE_URL/http:\/\//} --timeout=120 -- echo good to go
}

run_tests() {
  pushd e2e

  yarn run test --headless --browser chrome
  yarn run test --headless --browser firefox

  popd
}

stop_containers() {
  docker-compose down --volumes --remove-orphans
}

main
