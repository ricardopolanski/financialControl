import crypto from 'crypto';

// Function to generate tokens in xxxx-xxxx-xxxx-xxxx-xxxx format
export const generateToken = (): string => {
  return Array(4)
    .fill(null)
    .map(() => crypto.randomBytes(2).toString('hex')) // 2 bytes = 4 hex characters
    .map((segment) => segment.padStart(5, '0')) // Ensure each segment is 5 characters long
    .join('-');
};