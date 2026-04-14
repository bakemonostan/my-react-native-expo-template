#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");

// Android SDK path
const ANDROID_SDK_PATH = path.join(
  process.env.USERPROFILE,
  "AppData",
  "Local",
  "Android",
  "Sdk"
);
const EMULATOR_PATH = path.join(ANDROID_SDK_PATH, "emulator", "emulator.exe");

// Emulators
const EMULATORS = ["Pixel_4a_API_34", "Pixel_5_API_34"];

console.log("🚀 Starting emulators and building app...\n");

// Start emulators
EMULATORS.forEach((emulator) => {
  console.log(`📱 Starting ${emulator}...`);
  spawn(EMULATOR_PATH, ["-avd", emulator], { detached: true, stdio: "ignore" });
});

// Wait 30 seconds for emulators to boot
console.log("⏳ Waiting for emulators to boot...");
setTimeout(() => {
  console.log("🔨 Building and installing app on both emulators...");

  // Build on all connected emulators
  const build = spawn("npx", ["expo", "run:android"], {
    stdio: "inherit",
    shell: true,
  });

  build.on("error", (error) => {
    console.error("❌ Build failed:", error.message);
  });
}, 30000);
