#!/usr/bin/env bash
# Static export for the self-contained preview. API routes can't be statically
# exported, so app/api is moved aside for the build and always restored.
set -euo pipefail
cd "$(dirname "$0")/.."
mv app/api .api-preview-aside
trap 'mv .api-preview-aside app/api' EXIT
PREVIEW_EXPORT=1 NEXT_TELEMETRY_DISABLED=1 npx next build
node scripts/build-preview.mjs "${1:-preview}"
