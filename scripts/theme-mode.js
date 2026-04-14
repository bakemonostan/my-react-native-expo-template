#!/usr/bin/env node
/**
 * Opt in/out of dark mode by updating `userInterfaceStyle` in app.config.ts.
 *
 * Usage:
 *   node scripts/theme-mode.js auto    # Follow system preference (default)
 *   node scripts/theme-mode.js light   # Force light mode — opt out of dark mode
 *   node scripts/theme-mode.js dark    # Force dark mode
 *
 * After running, restart your Expo dev server (npx expo start) for it to take effect.
 * For production builds this change should be committed to version control.
 */

const fs = require("fs");
const path = require("path");

const mode = process.argv[2];
const validModes = ["light", "dark", "auto"];

if (!validModes.includes(mode)) {
  console.error("\nUsage: node scripts/theme-mode.js [light|dark|auto]\n");
  console.error("  auto   — Follow system preference (default)");
  console.error("  light  — Force light mode only (opt out of dark mode)");
  console.error("  dark   — Force dark mode only\n");
  process.exit(1);
}

const configPath = path.join(__dirname, "../app.config.ts");

if (!fs.existsSync(configPath)) {
  console.error("Could not find app.config.ts");
  process.exit(1);
}

let content = fs.readFileSync(configPath, "utf8");

const uiStyleValue = mode === "auto" ? "automatic" : mode;

const updated = content.replace(
  /userInterfaceStyle:\s*["'](automatic|light|dark)["']/,
  `userInterfaceStyle: "${uiStyleValue}"`
);

if (updated === content) {
  console.error(
    'Could not find `userInterfaceStyle` in app.config.ts. Make sure it exists.'
  );
  process.exit(1);
}

fs.writeFileSync(configPath, updated, "utf8");

console.log(`\n✅ Theme mode set to "${mode}"`);
console.log(`   userInterfaceStyle → "${uiStyleValue}" in app.config.ts`);
console.log("\n   Restart your dev server: npx expo start\n");
