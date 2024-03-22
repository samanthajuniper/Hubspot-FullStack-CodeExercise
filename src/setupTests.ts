import '@testing-library/jest-dom'

const originalEnv = process.env

beforeAll(() => {
  jest.resetModules()
  process.env = {
    ...originalEnv,
    REACT_APP_API_BASE_URL: 'http://localhost:3001/',
  }
})
