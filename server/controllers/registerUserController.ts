import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { registerUserService } from '../services/userService'

/* API Request body example:
Method: POST

{
  "username": STRING, // required
  "firstName": STRING, // required
  "lastName": "STRING, // required
  "password": STRING, // required
  "securityQuestion": STRING, // required
  "securityAnsware": "STRING, // required
  "active": BOOLEAN // not required
}

Positive Response Body
{
    "success": true,
    "message": "User ${USERNAME} registered successfully",
    "statusCode": 201,
    "data": {
        "userName": ${USERNAME},
        "userActive": BOOLEAN,
        "masterToken": "XXXXX-XXXXX-XXXXX-XXXXX",
        "sessionToken": "XXXXX-XXXXX-XXXXX-XXXXX"
    }
}

Negative Response Body Messages
Message('Username must contain only letters and numbers')
Message('Username must be between 5 and 15 characters')
Message('Username is required'),
Message('First name must contain only letters')
Message('First name is required'),
Message('Last name must contain only letters')
Message('Last name is required'),
Message('Password must be at least 8 characters long')
Message('Password must contain at least one uppercase letter')
Message('Password must contain at least one lowercase letter')
Message('Password must contain at least one number')
Message('Password must contain at least one special character')
Message('Password is required'),
Message('Security question must contain only letters')
Message('Security question is required'),
Message('Security answer must contain only letters')
Message('Security answer is required'),
Message('Active must be a boolean value'),
*/

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  // Handle validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({ message: err.msg }))
    });
  }

  try {
    const userData = req.body;
    const user = await registerUserService(userData)
    res.status(201).json({
      success: true,
      message: `User ${user.userName} registered successfully`,
      statusCode: 201,
      data: user,
    })
  } catch (err) {
    const error =  err as Error;
    if (error.message === "Username already taken") {
      return res.status(400).json({
        success: false,
        message: "Username already taken",
      });
    }
    next(err); // Pass unexpected errors to middleware
  }
}
