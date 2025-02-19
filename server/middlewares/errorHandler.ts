// import { Request, Response, NextFunction } from "express";

// export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
//   console.error("🔥 Error caught in middleware:", err);

//   let statusCode = 500;
//   let errorMessage = "Server error";

//   // If the error has a custom 'errors' array (e.g., validation errors), handle it separately
//   if (err && err.errors) {
//     // Ensure we don't try to send a response again if one has already been sent
//     if (res.headersSent) {
//       return next(err); // Pass it to the default error handler (if necessary)
//     }
//     res.status(400).json({
//       success: false,
//       errors: err.errors, // Use the errors array passed from validation
//     });
//   }

//   // Handle other errors (e.g., duplicate username, unexpected errors)
//   else if (err instanceof Error) {
//     errorMessage = err.message;

//     if (errorMessage.includes("Username already taken")) {
//       statusCode = 400; // 400 Bad Request for duplicate username
//     } else {
//       statusCode = 500; // Default to 500 for unknown errors
//     }
//   }

//   // Send response with the error message and status code if headers haven't been sent
//   if (!res.headersSent) {
//     res.status(statusCode).json({ success: false, message: errorMessage });
//   }
// };
import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error("🔥 Error caught in middleware:", err);

  if (!res.headersSent) {
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

