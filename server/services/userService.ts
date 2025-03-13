import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { generateToken } from '../utils/tokenGenerator';
import * as userRepository from '../repositories/userRepository';
import * as userRolesRepository from '../repositories/userRolesRepository';

export const registerUserService = async (userData: any, options: any = {}) => {
  // const option = options;

  const existingUser = await userRepository.findUserByUsername(userData.username);
  if (existingUser) throw new Error('Username already taken');
  userData.password = await bcrypt.hash(userData.password, 10);
  
  const user = await userRepository.createUser(userData, options);
  const userRole = await userRolesRepository.findRoleById(userData.roleId);

  if (!user) throw new Error('Failed to create user');

  const master_token = generateToken();
  const session_token = generateToken();

  await userRepository.createSessionToken(user.dataValues.id, {
    master_token,
    session_token,
    active: userData.active,
    created_ts: new Date(),
    updated_ts: new Date(),
  }, options
);

  return {
    userName: user.dataValues.username,
    userActive: user.dataValues.active,
    masterToken: master_token,
    sessionToken: session_token,
    userRole: userRole
  };
};

export const updateUserService = async (userData: any) => {
  if (userData.frustated_login) {
    await userRepository.incrementFrustratedLogin(userData.username);
    await userRepository.updateUser(userData.username, { last_frustated_login: new Date() });
  }

  if (userData.blockUser) {
    await userRepository.updateUser(userData.username, { active: false });
  }

  if (userData.setUserStatus !== undefined) {
    await userRepository.updateUser(userData.username, { active: userData.active });
  }
};

export const findUserService = async (userData: any, transaction?: any) => {
  const user = await userRepository.findUserByUsername(userData.username);
  return user
};

export const generateJWT = async (userData: any) => {
  const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
  return jwt.sign({ id: userData.id, username: userData.username }, JWT_SECRET, {
          expiresIn: "1h",
        });    
}

