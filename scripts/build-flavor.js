#!/usr/bin/env node

/**
 * Build script for different Android flavors
 * Usage: node scripts/build-flavor.cjs [flavor] [buildType]
 *
 * Examples:
 *   node scripts/build-flavor.cjs staging release
 *   node scripts/build-flavor.cjs production debug
 */

const { spawn } = require('child_process');
const path = require('path');

const validFlavors = ['production', 'staging'];
const validBuildTypes = ['debug', 'release'];

function printUsage() {
  console.log('Usage: node scripts/build-flavor.cjs [flavor] [buildType]');
  console.log('');
  console.log('Flavors:', validFlavors.join(', '));
  console.log('Build Types:', validBuildTypes.join(', '));
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/build-flavor.cjs staging release');
  console.log('  node scripts/build-flavor.cjs production debug');
}

async function runBuild(flavor, buildType) {
  console.log(`🚀 Building ${flavor} ${buildType}...`);

  // Set environment variables based on flavor
  const envVars = getEnvironmentVariables(flavor);

  console.log(`📋 Using environment: ${envVars.APP_ENV}`);
  console.log(`🔗 API URL: ${envVars.API_BASE_URL}`);

  // Check if running in CI environment
  const isCI = process.env.CI === 'true';

  if (isCI) {
    console.log(
      `⏭️  Skipping expo prebuild in CI (using committed android folder)`,
    );
  } else {
    // Run expo prebuild first to apply config plugins (local development only)
    console.log(`🔧 Running expo prebuild to apply config plugins...`);

    await runCommand(
      'npx',
      [
        'expo',
        'prebuild',
        '--platform',
        'android',
        '--clean',
        '--no-install',
      ],
      envVars,
    );
  }

  const isWindows = process.platform === 'win32';
  const gradlewPath = path.join(
    __dirname,
    '..',
    'android',
    isWindows ? 'gradlew.bat' : 'gradlew',
  );

  // Capitalize flavor and buildType for Gradle task names
  const flavorCapitalized = flavor.charAt(0).toUpperCase() + flavor.slice(1);
  const buildTypeCapitalized =
    buildType.charAt(0).toUpperCase() + buildType.slice(1);

  const keystoreFile =
    process.env.MYAPP_UPLOAD_STORE_FILE || 'my-upload-key.keystore';
  const keystorePassword =
    process.env.KEYSTORE_PASSWORD || process.env.MYAPP_UPLOAD_STORE_PASSWORD;
  const keyAlias =
    process.env.KEY_ALIAS || process.env.MYAPP_UPLOAD_KEY_ALIAS;
  const keyPassword =
    process.env.KEY_PASSWORD || process.env.MYAPP_UPLOAD_KEY_PASSWORD;

  const buildAAB = process.env.BUILD_AAB === 'true';
  const gradleTask = buildAAB ? 'bundle' : 'assemble';
  const args = [`${gradleTask}${flavorCapitalized}${buildTypeCapitalized}`];

  if (keystorePassword && keyAlias && keyPassword) {
    args.push(
      `-PMYAPP_UPLOAD_STORE_FILE=${keystoreFile}`,
      `-PMYAPP_UPLOAD_STORE_PASSWORD=${keystorePassword}`,
      `-PMYAPP_UPLOAD_KEY_ALIAS=${keyAlias}`,
      `-PMYAPP_UPLOAD_KEY_PASSWORD=${keyPassword}`,
    );
  }

  // Only exclude lint tasks for release builds (they don't exist for debug builds)
  if (buildType === 'release') {
    const analyzeTask = `lintVitalAnalyze${flavorCapitalized}${buildTypeCapitalized}`;
    const reportTask = `lintVitalReport${flavorCapitalized}${buildTypeCapitalized}`;
    const lintTask = `lintVital${flavorCapitalized}${buildTypeCapitalized}`;
    //
    args.push('-x', analyzeTask, '-x', reportTask, '-x', lintTask);
  }

  const buildProcess = spawn(gradlewPath, args, {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..', 'android'),
    env: { ...process.env, ...envVars },
    shell: isWindows,
  });

  buildProcess.on('close', (code) => {
    if (code === 0) {
      console.log(`✅ Build successful!`);
      console.log(
        `📱 APK location: android/app/build/outputs/apk/${flavor}/${buildType}/app-${flavor}-${buildType}.apk`,
      );
    } else {
      console.error(`❌ Build failed with code ${code}`);
      process.exit(code);
    }
  });

  buildProcess.on('error', (error) => {
    console.error('❌ Failed to start build process:', error);
    process.exit(1);
  });
}

function runCommand(command, args, env = {}) {
  return new Promise((resolve, reject) => {
    const isWindows = process.platform === 'win32';
    const proc = spawn(command, args, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
      shell: isWindows,
      env: { ...process.env, ...env },
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    proc.on('error', reject);
  });
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
        API_BASE_URL_STAGING:
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
        API_BASE_URL_PRODUCTION:
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
    console.error('Valid flavors:', validFlavors.join(', '));
    process.exit(1);
  }

  if (!validBuildTypes.includes(buildType)) {
    console.error(`❌ Invalid build type: ${buildType}`);
    console.error('Valid build types:', validBuildTypes.join(', '));
    process.exit(1);
  }

  runBuild(flavor, buildType).catch((error) => {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  });
}

if (require.main === module) {
  main();
}

module.exports = { runBuild };
