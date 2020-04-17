#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"

cd ../client

yarn run serve -- --port 8081 --open
