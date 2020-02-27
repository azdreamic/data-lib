module.exports = {
  // The transform config just tells jest to use ts-jest for ts / tsx files
  transform: {
      "^.+\\.tsx?$": "ts-jest",
  },
  // The testRegex tells Jest to look for tests in any __tests__ folder AND also 
  // any files anywhere that use the (.test|.spec).(js|jsx|ts|tsx) extension e.g. abc.spec.ts etc.
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testPathIgnorePatterns: ["/lib/", "/node_modules/"],
  // The moduleFileExtensions tells jest to recognize our file extensions.
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: false,
  //mapCoverage: true,
};