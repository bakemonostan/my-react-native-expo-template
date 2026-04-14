#!/usr/bin/env node

/**
 * Build staging debug APK, install via adb, then start Metro.
 * Use this when expo run:android fails with "No development build" due to package name mismatch.
 * No config changes required.
 */

const { spawn } = require("child_process");
const path = require("path");

const projectRoot = path.join(__dirname, "..");
const androidDir = path.join(projectRoot, "android");
const apkPath = path.join(
  androidDir,
  "app/build/outputs/apk/staging/debug/app-staging-debug.apk"
);

async function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, {
      stdio: "inherit",
      cwd: opts.cwd || projectRoot,
      shell: true,
      ...opts,
    });
    proc.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`Exit ${code}`))));
    proc.on("error", reject);
  });
}

async function main() {
  console.log("🔨 Building staging debug APK...\n");
  await run("./gradlew", ["app:assembleStagingDebug", "-x", "lint", "-x", "test"], {
    cwd: androidDir,
  });

  console.log("\n📱 Installing APK on device...\n");
  await run("adb", ["install", "-r", apkPath]);

  console.log("\n✅ App installed! Starting Metro...\n");
  console.log("👉 Open the app on your device to connect.\n");
  await run("npx", ["expo", "start", "--dev-client"]);
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
