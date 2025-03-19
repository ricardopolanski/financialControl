import jwt from "jsonwebtoken";

export const generateJWT = async (userData: any) => {
  const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
  return jwt.sign({ id: userData.id, username: userData.username }, JWT_SECRET, {
          expiresIn: "1h",
        });    
}

export const verifyToken = async (userData: any) => {
  return jwt.verify(userData.token, userData.SECRET_KEY) as {
    id: string;
    username?: string;
    companyId?: string;
    roleId?: string;
  };
}