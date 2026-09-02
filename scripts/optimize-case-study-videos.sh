#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd "$(dirname "$0")" && pwd)"
workspace_root="$(cd "$script_dir/../.." && pwd)"
fallback_encoder="/Applications/Recoverit.app/Contents/MacOS/Recoverit.app/Contents/MacOS/ffmpeg"
encoder_bin="${VIDEO_ENCODER_BIN:-}"

if [[ -z "$encoder_bin" ]] && command -v ffmpeg >/dev/null 2>&1; then
  encoder_bin="$(command -v ffmpeg)"
fi

if [[ -z "$encoder_bin" ]] && [[ -x "$fallback_encoder" ]]; then
  encoder_bin="$fallback_encoder"
fi

if [[ -z "$encoder_bin" ]] || [[ ! -x "$encoder_bin" ]]; then
  echo "A working ffmpeg binary is required. Set VIDEO_ENCODER_BIN and run again." >&2
  exit 1
fi

output_dir="$(mktemp -d "${TMPDIR:-/tmp}/portfolio-video-encode.XXXXXX")"
trap 'rm -rf "$output_dir"' EXIT

encode_video() {
  local relative_file="$1"
  local target_width="$2"
  local poster_width="$3"
  local source_file="$workspace_root/$relative_file"
  local file_name
  local stem
  local encoded_file
  local poster_file
  local poster_target

  file_name="$(basename "$source_file")"
  stem="${file_name%.*}"
  encoded_file="$output_dir/${stem}-${target_width}.mp4"
  poster_file="$output_dir/${stem}-${target_width}.poster.webp"
  poster_target="$(dirname "$source_file")/${stem}.poster.webp"

  if [[ ! -f "$source_file" ]]; then
    echo "Missing source: $relative_file" >&2
    return 1
  fi

  local media_info
  media_info="$("$encoder_bin" -hide_banner -i "$source_file" 2>&1 || true)"
  if printf '%s' "$media_info" | grep -Eq "${target_width}x[0-9]+.*30 fps"; then
    if [[ ! -f "$poster_target" ]]; then
      "$encoder_bin" -hide_banner -loglevel error -y \
        -ss 0.35 -i "$source_file" -frames:v 1 \
        -vf "scale=${poster_width}:-2:flags=lanczos" \
        -c:v libwebp -quality 84 \
        "$poster_target"
    fi
    echo "Already optimized $relative_file"
    return 0
  fi

  "$encoder_bin" -hide_banner -loglevel error -y \
    -i "$source_file" \
    -map_metadata -1 -an \
    -vf "fps=30,scale=${target_width}:-2:flags=lanczos,unsharp=5:5:0.30:5:5:0" \
    -c:v libx264 -preset slow -crf 16 -tune animation \
    -profile:v high -level 5.1 -pix_fmt yuv420p \
    -g 60 -keyint_min 30 -sc_threshold 0 \
    -movflags +faststart \
    "$encoded_file"

  "$encoder_bin" -hide_banner -loglevel error -y \
    -ss 0.35 -i "$encoded_file" -frames:v 1 \
    -vf "scale=${poster_width}:-2:flags=lanczos" \
    -c:v libwebp -quality 84 \
    "$poster_file"

  mv "$encoded_file" "$source_file"
  mv "$poster_file" "$poster_target"
  echo "Optimized $relative_file"
}

# Full-width web demos retain a 2x source. Smaller inline demos use a tighter
# source because extra pixels only increase transfer and decoder work.
encode_video "PrepInsta Prime Web Case Study/public/media/v-nav.mp4" 2176 1440 &
encode_video "PrepInsta Prime Web Case Study/public/media/v-purchase.mp4" 2176 1440 &
encode_video "PrepInsta Prime Web Case Study/public/media/v-mentor.mp4" 1440 1200 &
encode_video "PrepInsta Prime Web Case Study/public/media/v-learn.mp4" 1080 960 &
wait

encode_video "PrepInsta Prime Mobile App Case Study/public/media/v-sheet.mp4" 960 960 &
encode_video "PrepInsta Prime Mobile App Case Study/public/media/v-exp-final.mp4" 960 960 &
encode_video "PrepInsta Prime Mobile App Case Study/public/media/v-exp-iter.mp4" 960 960 &
encode_video "PrepInsta Prime Mobile App Case Study/public/media/v-splash.mp4" 960 960 &
wait

encode_video "PrepInsta Prime Mobile App Case Study/public/media/v-home1.mp4" 1080 1080 &
encode_video "PrepInsta Prime Mobile App Case Study/public/media/v-home2.mp4" 1080 1080 &
encode_video "PrepInsta Prime Mobile App Case Study/public/media/v-coupon.mp4" 960 960 &
wait

echo "All case-study videos are optimized."
