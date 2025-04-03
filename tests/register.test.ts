// tests/register.test.ts
import request from 'supertest';
import { createTestServer } from './testServer';
import * as userCompanyService from '../server/services/userCompanyService';

// Import your controller function directly
import { registerController } from '../server/controllers/registerUserController'; // Adjust the path as needed

// Mock the userCompanyService module
jest.mock('../server/services/userCompanyService', () => ({
  registerUserWithCompany: jest.fn()
}));

describe('Register Endpoint', () => {
  let app: any;
  let testRouter: any;
  
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Create a fresh app for each test
    const server = createTestServer();
    app = server.app;
    testRouter = server.testRouter;
    
    // Define the route with your actual controller function
    // This avoids TypeScript issues with middleware
    testRouter.post('/register', (req: any, res: any, next: any) => {
      // Call your controller function manually
      return registerController(req, res, next);
    });
  });

  it('should successfully register a user', async () => {
    // Setup mock response data for the service
    const mockServiceResponse = {
      user: {
        userName: "tom9818",
        userActive: true,
        masterToken: "027b7-01466-0ddd7-025f9",
        sessionToken: "0a6e8-0af33-0b0f8-0cd3c",
        userRole: {
          roleId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
          roleName: "admin",
          notes: "With great powers comes great resposabilites. Admin user can do everything."
        },
        company: {
          companyId: "dccf206b-a1cb-46ec-819e-fa0b25d7054e",
          companyName: null,
          active: true,
          created_ts: "2025-03-23T22:01:05.727Z",
          updated_ts: null
        }
      },
      company: {
        companyName: null,
        companyId: "dccf206b-a1cb-46ec-819e-fa0b25d7054e",
        companyIsActive: true
      }
    };

    // Configure the mock to return our mock data
    (userCompanyService.registerUserWithCompany as jest.Mock).mockResolvedValue(mockServiceResponse);

    // Test data to send in request
    const userData = {
      username: "tom9818",
      firstName: "Ricardo",
      lastName: "Polanski",
      password: "Ricochete1$",
      securityQuestion: "who is my love?",
      securityAnsware: "Paty"
    };

    // Make the request to the register endpoint
    const response = await request(app)
      .post('/api/auth/register')
      .send(userData);

    // Check status code
    expect(response.status).toBe(200);
    
    // Parse the response text to JSON if needed
    const responseBody = response.body || JSON.parse(response.text);
    
    console.log('Response body:', responseBody);
    
    // Now verify the parsed response
    expect(responseBody.success).toBe(true);
    
    // Verify user data
    expect(responseBody.data.user.userName).toBe("tom9818");
    expect(responseBody.message).toBe("User tom9818 registered successfully");
    
    // IMPORTANT: Verify the service was called with the right parameters
    expect(userCompanyService.registerUserWithCompany).toHaveBeenCalledWith(userData);
  });
});
