const { existsSync } = require("fs");
const { join } = require("path");
const { spawn } = require("child_process");

const ca = join(__dirname, "..", ".ca", "zs.pem");
if (existsSync(ca)) process.env.NODE_EXTRA_CA_CERTS = ca;

const args = process.argv.slice(2);
const bin = join(__dirname, "..", "node_modules", "next", "dist", "bin", "next");
const child = spawn(process.execPath, [bin, ...args], {
  stdio: "inherit",
  env: process.env,
});
child.on("exit", (code) => process.exit(code ?? 0));
