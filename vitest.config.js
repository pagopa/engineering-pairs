module.exports = {
    // Directory where your tests are located
    testDir: "src/**/*/__tests__",
  
    // File extensions to look for when running tests
    testMatch: ["**/*.spec.ts"],
  
    // File extensions to look for when importing modules
    moduleFileExtensions: ["ts", "js"],
  
    // Compiler options for TypeScript
    tsConfig: "tsconfig.json",
  
    // Whether to collect coverage information
    collectCoverage: true,
  
    // Directory where coverage reports are saved
    coverageDirectory: "coverage",
  
    // File extensions to include in coverage reports
    coverageReporters: ["lcov", "text"],
  };
  