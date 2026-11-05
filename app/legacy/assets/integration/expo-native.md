# Expo / React Native 原生落地说明 v2.0

## 不可直接复用的东西
`tokens.css`、`aesthetic.css`、`interactions.css`、DOM/React DOM 的 JSX、`document/window`、`createPortal`、`pointerdown`、CSS `:hover` 等都不是 iOS/Android 原生 UI API。**不要声称这两个包提供现成 Expo Native 组件。**

可复用：产品 Brief、DESIGN.md 的视觉语义、tokens.json 里的颜色/间距/字号（需解析为 RN 数值）、状态机与业务逻辑、测试用例、图标路径资源（需要 svg 或 icon 库适配）。

## 推荐技术栈
- Expo Router + React Native + TypeScript；交互按需使用 `react-native-gesture-handler` 与 `react-native-reanimated`，安装时优先 `npx expo install` 以保持 SDK 匹配。
- Web 端可使用 React Native Web，若要复用现有 DOM 组件，在平台边界使用 `*.web.tsx`，原生使用 `*.native.tsx`；否则不要混用 React DOM 与 RN。
- 桌面 Tauri/Electron 使用 Expo Web 导出时需检查浏览器组件、静态资源和各端权限差异；桌面 API 通过适配器封装。

## 最小 Pressable 示例（原生可用）
```tsx
import { Pressable, Text, StyleSheet, View } from 'react-native';
export function TaskAction({ done, onPress }: { done: boolean; onPress: () => void }) {
  return <Pressable role="checkbox" accessibilityState={{ checked: done }}
    accessibilityLabel={done ? '标记为未完成' : '标记为完成'}
    onPress={onPress}
    style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Text style={styles.text}>{done ? '已完成' : '完成任务'}</Text>
    </Pressable>;
}
const styles = StyleSheet.create({
  button: { minHeight: 48, minWidth: 48, paddingHorizontal: 16, justifyContent: 'center', borderRadius: 12, backgroundColor: '#0F766E' },
  pressed: { opacity: 0.85 },
  text: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
```

## 数值 token 转换
CSS 值的 `16px` 不能直接作为 RN StyleSheet 中的间距；需用解析器转换成数值 `16`，色值保留字符串，阴影另做 iOS / Android 映射；字体族需按平台是否可用进行降级。

## 验收
测试触控目标、VoiceOver / TalkBack 标签、系统字体缩放、减少动态效果、屏幕尺寸与安全区域、Android 返回行为、离线与重启恢复。不要把 Web 通过当作真机通过。
