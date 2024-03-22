export default {
  "testEnvironment": "jsdom",
  "roots": [
    "<rootDir>"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
 "setupFilesAfterEnv": [
   "<rootDir>/setupTests.ts"
],
}