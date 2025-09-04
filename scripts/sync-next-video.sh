#!/usr/bin/env bash
set -euo pipefail

# Sync only directories that contain video files to avoid clutter.
# Requires: bun, next-video installed locally.

ROOT_DIR=$(dirname "$(dirname "${BASH_SOURCE[0]}")")
cd "$ROOT_DIR"

VIDEO_EXTS='mp4|webm|mkv|ogg|ogv|wmv|avi|mov|flv|m4v|3gp'

# Find unique directories under content/ that contain at least one video file
mapfile -t DIRS < <(find content -type f -regextype posix-extended -iregex ".*\.(${VIDEO_EXTS})$" -print0 \
  | xargs -0 -n1 dirname \
  | sort -u)

if [ ${#DIRS[@]} -eq 0 ]; then
  echo "No local video files found under ./content. Nothing to sync."
  exit 0
fi

echo "Found ${#DIRS[@]} directory(ies) with videos:"
printf -- " - %s\n" "${DIRS[@]}"
echo

for dir in "${DIRS[@]}"; do
  echo "▶ Syncing videos in: $dir"
  bunx --bun next-video sync --dir "$dir"
  # Clean up accidental JSON created for non-video files in this directory
  find "$dir" -type f -name "*.json" \
    ! -iname "*.mp4.json" \
    ! -iname "*.webm.json" \
    ! -iname "*.mkv.json" \
    ! -iname "*.ogg.json" \
    ! -iname "*.ogv.json" \
    ! -iname "*.wmv.json" \
    ! -iname "*.avi.json" \
    ! -iname "*.mov.json" \
    ! -iname "*.flv.json" \
    ! -iname "*.m4v.json" \
    ! -iname "*.3gp.json" \
    -print -delete || true
  echo
done

echo "Done. If assets remain 'sourced', set provider credentials and re-run."
