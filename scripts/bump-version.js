#!/usr/bin/env node

/**
 * Bump app version + build numbers (package.json, iOS plist + pbxproj, Android build.gradle).
 *
 * After cloning the template, set IOS_APP_FOLDER and XCODEPROJ below to match your native project
 * (folder under ios/ that contains Info.plist, and the .xcodeproj name).
 *
 * Usage:
 *   npm run bump-version
 *   npm run bump-version -- minor
 *   npm run bump-version -- major
 *
 * Or: node scripts/bump-version.js [patch|minor|major]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

/** Folder under ios/ that contains Info.plist (e.g. myrntemplate) */
const IOS_APP_FOLDER =
  process.env.TEMPLATE_IOS_APP_FOLDER || "myrntemplate";

/** Xcode project directory name (e.g. myrntemplate.xcodeproj) */
const XCODEPROJ =
  process.env.TEMPLATE_XCODEPROJ || "myrntemplate.xcodeproj";

const FILES = {
  packageJson: path.join(ROOT, "package.json"),
  infoPlist: path.join(ROOT, "ios", IOS_APP_FOLDER, "Info.plist"),
  pbxproj: path.join(ROOT, "ios", XCODEPROJ, "project.pbxproj"),
  androidGradle: path.join(ROOT, "android", "app", "build.gradle"),
};

const VALID_KINDS = new Set(["patch", "minor", "major"]);

function bumpSemver(version, kind) {
  const parts = version.trim().split(".").map((p) => parseInt(p, 10));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) {
    throw new Error(`Invalid semver in package.json: "${version}" (expected x.y.z)`);
  }
  let [maj, min, pat] = parts;
  if (kind === "major") {
    maj += 1;
    min = 0;
    pat = 0;
  } else if (kind === "minor") {
    min += 1;
    pat = 0;
  } else {
    pat += 1;
  }
  return `${maj}.${min}.${pat}`;
}

function readPackageVersion() {
  const raw = fs.readFileSync(FILES.packageJson, "utf8");
  const pkg = JSON.parse(raw);
  if (!pkg.version || typeof pkg.version !== "string") {
    throw new Error('package.json missing "version"');
  }
  return pkg.version;
}

function readIosBuild() {
  if (!fs.existsSync(FILES.infoPlist)) {
    throw new Error(
      `Missing ${FILES.infoPlist}. Set TEMPLATE_IOS_APP_FOLDER or edit scripts/bump-version.js (IOS_APP_FOLDER).`,
    );
  }
  const plist = fs.readFileSync(FILES.infoPlist, "utf8");
  const m = plist.match(
    /<key>CFBundleVersion<\/key>\s*<string>(\d+)<\/string>/,
  );
  if (!m) {
    throw new Error("Could not parse CFBundleVersion from Info.plist");
  }
  return parseInt(m[1], 10);
}

function main() {
  const kindArg = process.argv[2] || "patch";
  if (!VALID_KINDS.has(kindArg)) {
    console.error("Usage: node scripts/bump-version.js [patch|minor|major]");
    process.exit(1);
  }

  const prevVersion = readPackageVersion();
  const nextVersion = bumpSemver(prevVersion, kindArg);
  const prevBuild = readIosBuild();
  const nextBuild = prevBuild + 1;

  const pkgRaw = fs.readFileSync(FILES.packageJson, "utf8");
  const pkg = JSON.parse(pkgRaw);
  pkg.version = nextVersion;
  fs.writeFileSync(
    FILES.packageJson,
    `${JSON.stringify(pkg, null, 2)}\n`,
    "utf8",
  );

  let plist = fs.readFileSync(FILES.infoPlist, "utf8");
  plist = plist.replace(
    /(<key>CFBundleShortVersionString<\/key>\s*<string>)[^<]+(<\/string>)/,
    `$1${nextVersion}$2`,
  );
  plist = plist.replace(
    /(<key>CFBundleVersion<\/key>\s*<string>)\d+(<\/string>)/,
    `$1${nextBuild}$2`,
  );
  fs.writeFileSync(FILES.infoPlist, plist, "utf8");

  if (fs.existsSync(FILES.pbxproj)) {
    let pbx = fs.readFileSync(FILES.pbxproj, "utf8");
    pbx = pbx.replace(/MARKETING_VERSION = [\d.]+;/g, `MARKETING_VERSION = ${nextVersion};`);
    pbx = pbx.replace(
      /CURRENT_PROJECT_VERSION = \d+;/g,
      `CURRENT_PROJECT_VERSION = ${nextBuild};`,
    );
    fs.writeFileSync(FILES.pbxproj, pbx, "utf8");
  }

  if (fs.existsSync(FILES.androidGradle)) {
    let gradle = fs.readFileSync(FILES.androidGradle, "utf8");
    gradle = gradle.replace(/versionCode \d+/g, `versionCode ${nextBuild}`);
    gradle = gradle.replace(
      /versionName "[\d.]+"/g,
      `versionName "${nextVersion}"`,
    );
    gradle = gradle.replace(
      /versionName "[\d.]+-staging"/g,
      `versionName "${nextVersion}-staging"`,
    );
    fs.writeFileSync(FILES.androidGradle, gradle, "utf8");
  }

  console.log(`Bumped (${kindArg}): ${prevVersion} → ${nextVersion}`);
  console.log(`Build number: ${prevBuild} → ${nextBuild}`);
  console.log(
    "Updated: package.json, ios Info.plist, project.pbxproj (if present), android/app/build.gradle (if present)",
  );
}

main();
