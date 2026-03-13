#!/usr/bin/env bash
# 默认/系统级 URL Scheme，不当作 Deep Link 展示
DEFAULT_SCHEMES="http https mailto file wais nntp ftp tel sms facetime facetime-audio news webcal about irc ssh sftp rdp vnc"

is_default_scheme() {
  local s="$1"
  for d in $DEFAULT_SCHEMES; do
    [[ "$s" == "$d" ]] && return 0
  done
  return 1
}

for dir in /Applications ~/Applications; do
  [[ ! -d "$dir" ]] && continue
  for app in "$dir"/*.app; do
    [[ ! -d "$app" ]] && continue
    plist="$app/Contents/Info.plist"
    [[ ! -f "$plist" ]] && continue

    # 应用显示名：优先 CFBundleDisplayName，其次 CFBundleName，最后用 .app 文件名
    name=$(/usr/libexec/PlistBuddy -c "Print :CFBundleDisplayName" "$plist" 2>/dev/null)
    [[ -z "$name" || "$name" == *"Does Not Exist"* ]] && name=$(/usr/libexec/PlistBuddy -c "Print :CFBundleName" "$plist" 2>/dev/null)
    [[ -z "$name" || "$name" == *"Does Not Exist"* ]] && name=$(basename "$app" .app)

    custom=""
    idx=0
    while true; do
      raw=$(/usr/libexec/PlistBuddy -c "Print :CFBundleURLTypes:${idx}:CFBundleURLSchemes" "$plist" 2>/dev/null)
      [[ $? -ne 0 ]] && break
      while read -r line; do
        s=$(echo "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
        # 只保留像 scheme 的 token：不含空格、{、}，且不是 Array
        [[ -z "$s" || "$s" == "Array" || "$s" == "{" || "$s" == "}" ]] && continue
        [[ "$s" == *"{"* || "$s" == *"}"* || "$s" == *" "* ]] && continue
        if ! is_default_scheme "$s"; then
          if [[ -n "$custom" ]]; then custom="$custom,$s"; else custom="$s"; fi
        fi
      done <<< "$raw"
      idx=$((idx + 1))
    done

    if [[ -n "$custom" ]]; then
      printf "%s\t%s\n" "$name" "$custom"
    fi
  done
done | sort -t $'\t' -k 1
