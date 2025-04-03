// tests/testServer.ts
import express from 'express';
import { Router } from 'express';

/**
 * Creates and configures an Express application for testing
 */
export function createTestServer() {
  const app = express();
  
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Create test router
  const testRouter = Router();
  
  // We'll define the routes in the test file
  
  // Use the test router
  app.use('/api/auth', testRouter);
  
  // Simple error handler
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).json({ success: false, message: err.message });
  });
  
  return { app, testRouter };
}
