export default {
  "testEnvironment": "jsdom",
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
 "setupFilesAfterEnv": [
   "<rootDir>/src/setupTests.ts"
],
}