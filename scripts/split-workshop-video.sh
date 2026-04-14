#!/usr/bin/env bash
# Split a large workshop MP4 into ~5-minute segments (stream copy) so each file stays under
# GitHub's 100 MB limit. Requires ffmpeg on PATH.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

INPUT="${1:-$ROOT/public/Software 8 april Webinar-esv2-50p-bg-10p-music-10p.mp4}"
OUTDIR="$ROOT/public/workshop"
MANIFEST="$ROOT/data/workshop-video-parts.json"
SEGMENT_SECONDS="${SEGMENT_SECONDS:-300}"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Install it (e.g. apt install ffmpeg) and retry." >&2
  exit 1
fi

if [[ ! -f "$INPUT" ]]; then
  echo "Input not found: $INPUT" >&2
  echo "Usage: $0 [path-to-source.mp4]" >&2
  exit 1
fi

mkdir -p "$OUTDIR"

echo "Splitting into $OUTDIR/part-%%03d.mp4 (segment time ${SEGMENT_SECONDS}s, stream copy)…"
ffmpeg -hide_banner -loglevel error -stats -y -i "$INPUT" -c copy -map 0 \
  -f segment -segment_time "$SEGMENT_SECONDS" -reset_timestamps 1 \
  "$OUTDIR/part-%03d.mp4"

mapfile -t FILES < <(ls -1 "$OUTDIR"/part-*.mp4 2>/dev/null | sort || true)
if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "No output segments in $OUTDIR" >&2
  exit 1
fi

TOTAL_SEC=""
if command -v ffprobe >/dev/null 2>&1; then
  TOTAL_SEC="$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$INPUT" 2>/dev/null || true)"
fi

JSON_PARTS=""
for f in "${FILES[@]}"; do
  base="$(basename "$f")"
  esc="${base//\\/\\\\}"
  esc="${esc//\"/\\\"}"
  if [[ -n "$JSON_PARTS" ]]; then
    JSON_PARTS+=","
  fi
  JSON_PARTS+="\"\/workshop\/${esc}\""
done

mkdir -p "$(dirname "$MANIFEST")"
if [[ -n "$TOTAL_SEC" ]] && [[ "$TOTAL_SEC" =~ ^[0-9]*\.?[0-9]+$ ]]; then
  printf '{"totalDurationSec":%s,"parts":[%s]}\n' "$TOTAL_SEC" "$JSON_PARTS" >"$MANIFEST"
else
  printf '{"parts":[%s]}\n' "$JSON_PARTS" >"$MANIFEST"
  echo "Warning: could not read total duration with ffprobe; add totalDurationSec to $MANIFEST for a unified timeline." >&2
fi

echo "Wrote $MANIFEST with ${#FILES[@]} part(s). Commit public/workshop/*.mp4 and data/workshop-video-parts.json."
