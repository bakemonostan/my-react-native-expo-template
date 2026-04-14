#!/usr/bin/env node

/**
 * Build script for iOS flavors (staging / production)
 * Usage: node scripts/build-ios-flavor.js [flavor] [buildType]
 *
 * Examples:
 *   node scripts/build-ios-flavor.js staging release
 *   node scripts/build-ios-flavor.js production release
 *
 * After build: Open Xcode → Product → Archive → Distribute to TestFlight
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const validFlavors = ['production', 'staging'];
const validBuildTypes = ['debug', 'release'];

function printUsage() {
  console.log('Usage: node scripts/build-ios-flavor.js [flavor] [buildType]');
  console.log('');
  console.log('Flavors:', validFlavors.join(', '));
  console.log('Build Types:', validBuildTypes.join(', '));
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/build-ios-flavor.js staging release');
  console.log('  node scripts/build-ios-flavor.js production release');
}

function getEnvironmentVariables(flavor) {
  const baseEnv = {
    EXPO_PUBLIC_GOOGLE_PLACES_API_KEY:
      process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY ??
      'AIzaSyBVkwt2XaXmfFW4CR6e5iRdE-XL89VKhY8',
    EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME ?? 'dlbfvoylr',
    EXPO_PUBLIC_CLOUDINARY_API_KEY:
      process.env.EXPO_PUBLIC_CLOUDINARY_API_KEY ?? '965313618946945',
    EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET:
      process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? 'take_photos',
    EXPO_PUBLIC_CLOUDINARY_API_SECRET:
      process.env.EXPO_PUBLIC_CLOUDINARY_API_SECRET ??
      'ilSeDZIY6vYRhKXlTubADnLkT04',
    EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID:
      process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ??
      '727549625016-sv68egors0qk3mmu1kdkim4deu72cdnf.apps.googleusercontent.com',
    EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID:
      process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ??
      '727549625016-4gmt4r548tcpspo4feqgkiaa7f5uf6pi.apps.googleusercontent.com',
    DOJAH_BASE_URL: process.env.DOJAH_BASE_URL ?? 'https://identity.dojah.io',
  };

  switch (flavor) {
    case 'staging':
      return {
        ...baseEnv,
        APP_ENV: 'staging',
        ENV: 'staging',
        API_BASE_URL:
          'https://takers-backend-staging-49e681dbf00d.herokuapp.com/api/v1/',
        APP_NAME: 'TakersDev',
        DEBUG_MODE: 'true',
        LOG_LEVEL: 'debug',
        DOJAH_WIDGET_ID:
          process.env.DOJAH_WIDGET_ID ?? '678634af16c040c124bd5d87',
        EXPO_PUBLIC_PUSHER_API_KEY:
          process.env.EXPO_PUBLIC_PUSHER_API_KEY ?? 'd6ad39be30fa51cc94e7',
        EXPO_PUBLIC_PUSHER_CLUSTER:
          process.env.EXPO_PUBLIC_PUSHER_CLUSTER ?? 'mt1',
        EXPO_PUBLIC_APP_VERSION: '1.0.0-dev',
        EXPO_PUBLIC_LOG_LEVEL: 'debug',
      };

    case 'production':
      return {
        ...baseEnv,
        APP_ENV: 'production',
        ENV: 'production',
        API_BASE_URL:
          'https://takers-backend-production-92681ce09907.herokuapp.com/api/v1/',
        APP_NAME: 'Takers',
        DEBUG_MODE: 'false',
        LOG_LEVEL: 'error',
        DOJAH_WIDGET_ID:
          process.env.DOJAH_WIDGET_ID ?? '68949ee033a2091c256a695e',
        EXPO_PUBLIC_PUSHER_API_KEY:
          process.env.EXPO_PUBLIC_PUSHER_API_KEY ?? '579dfa7f7b1c06988fc3',
        EXPO_PUBLIC_PUSHER_CLUSTER:
          process.env.EXPO_PUBLIC_PUSHER_CLUSTER ?? 'mt1',
        EXPO_PUBLIC_APP_VERSION: '1.0.0',
        EXPO_PUBLIC_LOG_LEVEL: 'error',
      };

    default:
      return baseEnv;
  }
}

function copyGoogleServiceInfo(projectRoot, flavor) {
  const destFile = path.join(projectRoot, 'GoogleService-Info.plist');
  const stagingFile = path.join(projectRoot, 'GoogleService-Info-staging.plist');
  const productionFile = path.join(
    projectRoot,
    'GoogleService-Info-production.plist',
  );
  const defaultFile = path.join(projectRoot, 'GoogleService-Info.plist');

  const srcFile =
    flavor === 'staging'
      ? stagingFile
      : fs.existsSync(productionFile)
        ? productionFile
        : defaultFile;

  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
    console.log(`✅ Using GoogleService-Info for ${flavor}`);
  } else {
    console.log(
      `⚠️  GoogleService-Info for ${flavor} not found. Add GoogleService-Info-staging.plist and GoogleService-Info.plist (or GoogleService-Info-production.plist) at project root.`,
    );
  }
}

function runCommand(command, args, options = {}) {
  const { env = process.env, cwd } = options;
  return new Promise((resolve, reject) => {
    const isWindows = process.platform === 'win32';
    const proc = spawn(command, args, {
      stdio: 'inherit',
      cwd: cwd || path.join(__dirname, '..'),
      env: { ...process.env, ...env },
      shell: isWindows,
    });

    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command failed with code ${code}`));
    });
    proc.on('error', reject);
  });
}

async function runBuild(flavor, buildType) {
  console.log(`🚀 Building iOS ${flavor} ${buildType}...`);

  const envVars = getEnvironmentVariables(flavor);
  console.log(`📋 Environment: ${envVars.APP_ENV}`);
  console.log(`🔗 API URL: ${envVars.API_BASE_URL}`);

  const projectRoot = path.join(__dirname, '..');
  const isCI = process.env.CI === 'true';

  // 1. Copy correct GoogleService-Info.plist for flavor
  copyGoogleServiceInfo(projectRoot, flavor);

  // 2. Expo prebuild (unless CI - use committed ios folder)
  if (isCI) {
    console.log(`⏭️  Skipping expo prebuild in CI`);
  } else {
    console.log(`🔧 Running expo prebuild for iOS...`);
    await runCommand(
      'npx',
      [
        'expo',
        'prebuild',
        '--platform',
        'ios',
        '--clean',
        '--no-install',
      ],
      { env: { ...process.env, ...envVars } },
    );
  }

  // 3. Install pods (must run from ios directory)
  console.log(`📦 Installing CocoaPods...`);
  await runCommand('pod', ['install'], {
    env: { ...process.env, ...envVars },
    cwd: path.join(projectRoot, 'ios'),
  });

  // 4. Build or Archive
  const config = buildType === 'release' ? 'Release' : 'Debug';
  const workspacePath = path.join(projectRoot, 'ios', 'Takers.xcworkspace');
  const scheme = 'Takers';

  if (buildType === 'release') {
    const archivePath = path.join(
      projectRoot,
      'build',
      `Takers-${flavor}.xcarchive`,
    );
    fs.mkdirSync(path.join(projectRoot, 'build'), { recursive: true });

    console.log(`📦 Creating archive for TestFlight...`);
    await runCommand(
      'xcodebuild',
      [
        '-workspace', workspacePath,
        '-scheme', scheme,
        '-configuration', config,
        '-archivePath', archivePath,
        'archive',
      ],
      { env: { ...process.env, ...envVars } },
    );

    console.log(`✅ Archive created: ${archivePath}`);
    console.log('');
    console.log('Next steps:');
    console.log('  1. Open Xcode');
    console.log('  2. Window → Organizer');
    console.log('  3. Select the archive → Distribute App → App Store Connect');
  } else {
    console.log(`🔨 Building ${config}...`);
    await runCommand(
      'xcodebuild',
      [
        '-workspace', workspacePath,
        '-scheme', scheme,
        '-configuration', config,
        '-sdk', 'iphoneos',
        '-derivedDataPath', path.join(projectRoot, 'ios', 'build'),
      ],
      { env: { ...process.env, ...envVars } },
    );
    console.log(`✅ Build successful`);
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('❌ Missing required arguments');
    printUsage();
    process.exit(1);
  }

  const [flavor, buildType] = args;

  if (!validFlavors.includes(flavor)) {
    console.error(`❌ Invalid flavor: ${flavor}`);
    process.exit(1);
  }

  if (!validBuildTypes.includes(buildType)) {
    console.error(`❌ Invalid build type: ${buildType}`);
    process.exit(1);
  }

  runBuild(flavor, buildType).catch((err) => {
    console.error('❌ Build failed:', err.message);
    process.exit(1);
  });
}

if (require.main === module) {
  main();
}

module.exports = { runBuild, getEnvironmentVariables };
