// Test bootstrap. Loaded once before any test file runs.
process.env.NODE_ENV = "test";
process.env.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "test-secret-for-tests-only";
process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";
