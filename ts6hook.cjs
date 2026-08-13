// ESLint가 require("typescript")할 때 7 대신 6 래퍼 API를 쓰게 한다.
const Module = require("module");

const orig = Module._resolveFilename;
Module._resolveFilename = function resolveTs6(request, parent, isMain, options) {
  if (request === "typescript") {
    return orig.call(this, "@typescript/typescript6", parent, isMain, options);
  }
  return orig.call(this, request, parent, isMain, options);
};
