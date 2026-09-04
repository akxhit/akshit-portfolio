#!/bin/bash
# Copies the Figma exports out of the working folders into public/media,
# renaming them to stable ids and resampling to the width the layout actually
# asks for at 2× on a Retina screen. sips only — no ImageMagick needed.
#
# Re-run after re-exporting from Figma, then `node scripts/manifest.mjs`.
#
# Sizing rule: a desktop capture is displayed ~1088 CSS px wide, so it wants
# ~2176px of source. A before/after column is ~531px, so ~1100. A phone frame is
# ~206–272px, so 750 is already 3×.
set -e
SRC="/Users/akshitmanik/Downloads/PrepInsta APP"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/media"
mkdir -p "$OUT"

# w <src> <id> <width>
w() { sips --resampleWidth "$3" "$SRC/$1" --out "$OUT/$2.png" >/dev/null && echo "  $2  ${3}w"; }

# crop <src> <id> <cropw> <croph> <x> <y> <finalw>
crop() {
  sips -c "$4" "$3" --cropOffset "$6" "$5" "$SRC/$1" --out "$OUT/$2.png" >/dev/null
  sips --resampleWidth "$7" "$OUT/$2.png" --out "$OUT/$2.png" >/dev/null
  echo "  $2  ${7}w (cropped)"
}

# top <src> <id> <keep-height-in-source-px> <finalw>
# Trims a long capture before the dead band at the bottom. sips -c crops from
# the centre, so the top slice is taken with an explicit offset of 0,0 against
# the source's own width.
top() {
  local sw; sw=$(sips -g pixelWidth "$SRC/$1" | awk '/pixelWidth/{print $2}')
  sips -c "$3" "$sw" --cropOffset 0 0 "$SRC/$1" --out "$OUT/$2.png" >/dev/null
  sips --resampleWidth "$4" "$OUT/$2.png" --out "$OUT/$2.png" >/dev/null
  echo "  $2  ${4}w (top $3px)"
}

# slice <src> <id> <finalw> <maxsliceh>
# A 2176x17436 PNG is more than the image optimiser will reliably chew through —
# it hangs rather than erroring. Long pages are cut into stacked slices instead,
# which also means they decode in parallel and paint progressively.
slice() {
  local tmp="$OUT/.$2.full.png"
  sips --resampleWidth "$3" "$SRC/$1" --out "$tmp" >/dev/null
  local h; h=$(sips -g pixelHeight "$tmp" | awk '/pixelHeight/{print $2}')
  local n=$(( (h + $4 - 1) / $4 ))
  local each=$(( (h + n - 1) / n ))
  local i=0 y=0 cut
  while [ $y -lt $h ]; do
    i=$((i+1)); cut=$each
    [ $((y+cut)) -gt $h ] && cut=$((h-y))
    sips -c "$cut" "$3" --cropOffset "$y" 0 "$tmp" --out "$OUT/$2-$i.png" >/dev/null
    y=$((y+each))
  done
  rm -f "$tmp"
  echo "  $2  ${3}w  ${h}px in $n slices"
}

echo "· long-scroll pages (desktop)"
slice "Puchase page/Purchase page web.png"                          purchase-web   2176 4400
slice "Syllabus Page/final.png"                                     syllabus-web   1100 4400
slice "Syllabus Page/Older version which i redesigned.png"          syllabus-old   1100 4400
top "Profile/Paid user.png"                                         profile-web    3290 2176

echo "· long-scroll pages (mobile web)"
# these three end with 600–1100px of empty black before the tab bar
top "Profile/For Paid User.png"                                     profile-m        4500 750
top "Profile/For Unpaid User-1.png"                                 profile-m-unpaid 3600 750
top "Profile/In progress Empty state.png"                           profile-m-empty  2150 750

echo "· desktop overlays"
crop "Profile/popup.png"          profile-edit 1429 2119 1454  374   860
crop "Profile/popup-1.png"        cert-modal   1429 1529 1454  648   900
w "Profile/Frame.png"                                               upgrade-open    1100

echo "· components"
crop "Profile/Component 227.png"  course-cards 1164 1521   24   24   800
crop "Profile/Success.png"        toast-call   1113  730   18   18   900

echo "· mobile overlays"
w "Profile/Mobile-4.png"                                            profile-m-avatar 750
w "Profile/Upgrade.png"                                             profile-m-upg    750

echo "· search"
w "Search/search bar.png"                                           search-context  2176
w "Search/selcted.png"                                              search-open     1006
w "Search/results.png"                                              search-results  1080
w "Search/if user clicked on any category.png"                      search-cat      1080

echo "· syllabus chrome"
w "Syllabus Page/nav bar when user scrolls down it will redirect them to respective section.png" syllabus-rail 2176

echo "· video"
cp "$SRC/NAVBAR/Nav Bar video.mp4"                                  "$OUT/v-nav.mp4"
cp "$SRC/Puchase page/Purchase page animation.mp4"                  "$OUT/v-purchase.mp4"
cp "$SRC/Syllabus Page/lear by doing animation.mp4"                 "$OUT/v-learn.mp4"
cp "$SRC/Syllabus Page/Mentor animation.mp4"                        "$OUT/v-mentor.mp4"
echo "  4 recordings"

echo "done → $OUT"
