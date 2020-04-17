#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"

cd ../client

yarn run lint
yarn run test
yarn run build
