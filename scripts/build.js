const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const distDirName = process.env.NEXT_DIST_DIR || ".next-build";
const buildDir = path.join(rootDir, distDirName);
const generatedConfigPaths = ["next-env.d.ts", "tsconfig.json"];
const generatedConfigSnapshots = new Map(
  generatedConfigPaths.map((relativePath) => {
    const absolutePath = path.join(rootDir, relativePath);
    return [
      absolutePath,
      fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath) : null,
    ];
  })
);

let configRestored = false;
function restoreGeneratedConfig() {
  if (configRestored) return;
  configRestored = true;

  for (const [absolutePath, content] of generatedConfigSnapshots) {
    if (content === null) {
      fs.rmSync(absolutePath, { force: true });
    } else {
      fs.writeFileSync(absolutePath, content);
    }
  }
}

function validateBuildOutput() {
  const requiredPaths = [
    "BUILD_ID",
    "build-manifest.json",
    "server",
    "static",
  ];

  const missing = requiredPaths.filter(
    (relativePath) => !fs.existsSync(path.join(buildDir, relativePath))
  );

  if (missing.length > 0) {
    console.error(
      `[build] Incomplete Next build output in ${distDirName}. Missing: ${missing.join(
        ", "
      )}`
    );
    return false;
  }

  return true;
}

const nextBin = path.join(
  __dirname,
  "..",
  "node_modules",
  "next",
  "dist",
  "bin",
  "next"
);

fs.rmSync(buildDir, { recursive: true, force: true });

const child = spawn(process.execPath, ["--max-old-space-size=4096", nextBin, "build", "--webpack"], {
  cwd: rootDir,
  env: {
    ...process.env,
    NEXT_DIST_DIR: distDirName,
  },
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  restoreGeneratedConfig();

  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  if (code !== 0) {
    process.exit(code ?? 1);
    return;
  }

  process.exit(validateBuildOutput() ? 0 : 1);
});

child.on("error", (error) => {
  restoreGeneratedConfig();
  console.error(`[build] Unable to start Next.js build: ${error.message}`);
  process.exit(1);
});
