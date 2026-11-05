#!/usr/bin/env bash
# v2: install two skills together without file-name collisions or destructive token overwrites.
set -euo pipefail
KIT="$(cd "$(dirname "$0")/.." && pwd)"
NAME="$(basename "$KIT")"
TARGET="${1:-}"; [ -z "$TARGET" ] && { echo "用法: bash scripts/scaffold.sh <项目目录> [--react] [--tailwind]"; exit 2; }
shift; REACT=0; TW=0
for a in "$@"; do case "$a" in --react) REACT=1;; --tailwind) TW=1;; *) echo "未知参数: $a"; exit 2;; esac; done
SHARED="$TARGET/ui-kit"; MOD="$SHARED/$NAME"
mkdir -p "$MOD/components" "$SHARED"
# shared tokens: first install wins, but a mismatched copy is reported.
for name in tokens.css tokens.json; do
 src="$KIT/assets/$name"; dst="$SHARED/$name"
 if [ -f "$dst" ]; then
   if ! cmp -s "$src" "$dst"; then echo "[WARN] 共享 $name 已存在且不同：未覆盖 $dst。以 ai-ui 的设计规范为主源，手动同步。" >&2; fi
 else cp "$src" "$dst"; fi
done
for d in icons themes prompts integration; do
 if [ -d "$KIT/assets/$d" ]; then cp -R "$KIT/assets/$d" "$MOD/"; fi
done
[ ! -f "$KIT/assets/DESIGN.template.md" ] || cp "$KIT/assets/DESIGN.template.md" "$MOD/"
cp "$KIT/scripts/lint-ui.mjs" "$MOD/"
# Do not silently overwrite individual components when upgrading.
cp "$KIT"/components/*.css "$KIT"/components/*.js "$MOD/components/"
if [ "$REACT" -eq 1 ] && [ -d "$KIT/components/react" ]; then
 rm -rf "$MOD/components/react"
 cp -R "$KIT/components/react" "$MOD/components/react"
fi
if [ "$TW" -eq 1 ]; then node "$KIT/scripts/tokens-to-tailwind.mjs" "$SHARED/tokens.json" "$TARGET/tailwind.tokens.cjs"; fi
cat > "$MOD/USAGE.md" <<EOF
# $NAME v2 — Web/React DOM only
引入共享 ui-kit/tokens.css，再引入 ui-kit/$NAME/components/ 下的样式与脚本。
在 React DOM 中导入组件时使用 ui-kit/$NAME/components/react，而不是 ui-kit/components/react。
Expo iOS/Android 不可直接导入这些 Web 组件；阅读 ui-kit/$NAME/integration/expo-native.md。
EOF
echo "Installed $NAME into $MOD; shared tokens at $SHARED/tokens.json"
