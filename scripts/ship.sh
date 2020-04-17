#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"

echo ""
echo "👷🏻‍♀️let's ship"
echo ""

./build-client.sh
./build-api.sh

git push

echo ""
echo "🚢 successfully shipped"
echo ""
