#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"

cd ../api

./gradlew clean build --info --no-daemon
