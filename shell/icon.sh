#!/usr/bin/env bash
# Export macOS app icons, names and deeplinks (with optional i18n names from .lproj).
# Icons are converted to PNG (256x256 when available, else default size).
# Usage: [OUT_DIR=/path] [INCLUDE_I18N=1] ./icon.sh
# Output: CSV to stdout "name,icon_path,deeplink"; PNGs written to OUT_DIR (default: ./app-icons).

OUT_DIR="${OUT_DIR:-./app-icons}"
INCLUDE_I18N="${INCLUDE_I18N:-0}"
TARGET_SIZE=256

# 默认/系统级 URL Scheme，不当作 Deep Link 展示
DEFAULT_SCHEMES="http https mailto file wais nntp ftp tel sms facetime facetime-audio news webcal about irc ssh sftp rdp vnc"

mkdir -p "$OUT_DIR"
OUT_DIR_ABS=$(cd "$OUT_DIR" 2>/dev/null && pwd || echo "$OUT_DIR")
CSV_TMP=$(mktemp)
PNG_TMP=$(mktemp).png
trap 'rm -f "$CSV_TMP" "$PNG_TMP"' EXIT

safe_filename() {
  echo "$1" | sed 's/[\/\\:*?"<>|]/-/g; s/^\.*//; s/^[[:space:]]*//; s/[[:space:]]*$//' | sed 's/  */ /g'
}

is_default_scheme() {
  local s="$1"
  for d in $DEFAULT_SCHEMES; do
    [[ "$s" == "$d" ]] && return 0
  done
  return 1
}

csv_row() {
  local n="$1" p="$2" d="$3"
  # name 需要 CSV 转义，icon_path 与 deeplink 原样输出（deeplink 中用空格分隔）
  printf '"%s",%s,%s\n' "$(echo "$n" | sed 's/"/""/g')" "$p" "$d" >> "$CSV_TMP"
}

# Convert icns to PNG: 256x256 if source has enough size, else default size
icns_to_png() {
  local src_icns="$1" out_png="$2"
  sips -s format png "$src_icns" --out "$PNG_TMP" &>/dev/null || return 1
  [[ ! -f "$PNG_TMP" ]] && return 1
  local w h
  w=$(sips -g pixelWidth "$PNG_TMP" 2>/dev/null | awk '/pixelWidth:/ { print $2 }')
  h=$(sips -g pixelHeight "$PNG_TMP" 2>/dev/null | awk '/pixelHeight:/ { print $2 }')
  if [[ -n "$w" && -n "$h" && "$w" -ge "$TARGET_SIZE" && "$h" -ge "$TARGET_SIZE" ]]; then
    sips -z "$TARGET_SIZE" "$TARGET_SIZE" "$PNG_TMP" --out "$out_png" &>/dev/null || cp "$PNG_TMP" "$out_png"
  else
    cp "$PNG_TMP" "$out_png" 2>/dev/null
  fi
  [[ -f "$out_png" ]]
}

# 从 Info.plist 提取自定义 URL scheme，过滤默认 scheme，并拼成 "scheme:// scheme2://"
extract_deeplinks() {
  local plist="$1"
  local custom=""
  local idx=0
  while true; do
    raw=$(/usr/libexec/PlistBuddy -c "Print :CFBundleURLTypes:${idx}:CFBundleURLSchemes" "$plist" 2>/dev/null)
    [[ $? -ne 0 ]] && break
    while read -r line; do
      s=$(echo "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
      # 只保留像 scheme 的 token：不含空格、{、}，且不是 Array
      [[ -z "$s" || "$s" == "Array" || "$s" == "{" || "$s" == "}" ]] && continue
      [[ "$s" == *"{"* || "$s" == *"}"* || "$s" == *" "* ]] && continue
      if ! is_default_scheme "$s"; then
        if [[ -n "$custom" ]]; then custom="$custom $s://"; else custom="$s://"; fi
      fi
    done <<< "$raw"
    idx=$((idx + 1))
  done
  echo "$custom"
}

# /Applications, ~/Applications, system apps, CoreServices
for dir in /Applications ~/Applications /System/Applications /System/Library/CoreServices; do
  [[ ! -d "$dir" ]] && continue
  for app in "$dir"/*.app; do
    [[ ! -d "$app" ]] && continue
    plist="$app/Contents/Info.plist"
    [[ ! -f "$plist" ]] && continue

    name=$(/usr/libexec/PlistBuddy -c "Print :CFBundleDisplayName" "$plist" 2>/dev/null)
    [[ -z "$name" || "$name" == *"Does Not Exist"* ]] && name=$(/usr/libexec/PlistBuddy -c "Print :CFBundleName" "$plist" 2>/dev/null)
    [[ -z "$name" || "$name" == *"Does Not Exist"* ]] && name=$(basename "$app" .app)

    bundle_id=$(/usr/libexec/PlistBuddy -c "Print :CFBundleIdentifier" "$plist" 2>/dev/null)
    [[ -z "$bundle_id" || "$bundle_id" == *"Does Not Exist"* ]] && bundle_id=$(basename "$app" .app | tr ' ' '-')

    icon_file=""
    icon_ref=$(/usr/libexec/PlistBuddy -c "Print :CFBundleIconFile" "$plist" 2>/dev/null)
    if [[ -n "$icon_ref" && "$icon_ref" != *"Does Not Exist"* ]]; then
      res="$app/Contents/Resources/$icon_ref"
      [[ -f "$res" ]] && icon_file="$res"
      [[ -z "$icon_file" && -f "${res}.icns" ]] && icon_file="${res}.icns"
    fi
    if [[ -z "$icon_file" ]]; then
      first_icns=$(find "$app/Contents/Resources" -maxdepth 1 -name "*.icns" 2>/dev/null | head -1)
      [[ -n "$first_icns" ]] && icon_file="$first_icns"
    fi

    [[ -z "$icon_file" || ! -f "$icon_file" ]] && continue

    base=$(safe_filename "$bundle_id")
    [[ -z "$base" ]] && base="app"
    dest_path="$OUT_DIR/${base}.png"
    icns_to_png "$icon_file" "$dest_path" || continue
    abs_dest="$OUT_DIR_ABS/${base}.png"

    deeplinks=$(extract_deeplinks "$plist")

    csv_row "$name" "$abs_dest" "$deeplinks"

    if [[ "$INCLUDE_I18N" == "1" ]]; then
      for lproj in "$app/Contents/Resources/"*.lproj; do
        [[ -d "$lproj" ]] || continue
        strings_file="$lproj/InfoPlist.strings"
        [[ -f "$strings_file" ]] || continue
        i18n_name=$(/usr/libexec/PlistBuddy -c "Print :CFBundleDisplayName" "$strings_file" 2>/dev/null)
        [[ -z "$i18n_name" || "$i18n_name" == *"Does Not Exist"* ]] && i18n_name=$(/usr/libexec/PlistBuddy -c "Print :CFBundleName" "$strings_file" 2>/dev/null)
        [[ -n "$i18n_name" && "$i18n_name" != *"Does Not Exist"* && "$i18n_name" != "$name" ]] && csv_row "$i18n_name" "$abs_dest" "$deeplinks"
      done
    fi
  done
done

echo "name,icon_path,deeplink"
sort -t',' -k2 -u "$CSV_TMP" 2>/dev/null || cat "$CSV_TMP"
