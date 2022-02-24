/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "./",
  modulePaths: ["<rootDir>"],
  testRegex: "spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      compiler: "ttypescript",
    },
  },
  setupFiles: ["<rootDir>jest-config.ts"],
};
