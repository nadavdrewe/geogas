const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const distDirName = process.env.NEXT_DIST_DIR || ".next-build";
const buildDir = path.join(rootDir, distDirName);

function validateBuildOutput() {
  const requiredPaths = [
    "BUILD_ID",
    "app-build-manifest.json",
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

const child = spawn(process.execPath, ["--max-old-space-size=4096", nextBin, "build"], {
  cwd: rootDir,
  env: {
    ...process.env,
    NEXT_DIST_DIR: distDirName,
  },
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
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
