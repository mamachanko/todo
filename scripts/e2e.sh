#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"

cd ../e2e

export CYPRESS_BASE_URL=${1:-http://localhost:8083}

yarn run test --headless --browser chrome
yarn run test --headless --browser firefox
