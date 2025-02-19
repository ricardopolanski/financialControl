import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import SessionToken from '../models/sessionTokenModel';
import { generateToken } from '../utils/tokenGenerator';

export const registerUserService = async (userData: any) => {
  const {
    username,
    firstName,
    lastName,
    password,
    active = true,
    created_ts,
    updated_ts,
    last_login,
    last_frustated_login,
    frustated_login_count,
    securityQuestion,
    securityAnsware
  } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) throw new Error('Username already taken');

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    username,
    firstName,
    lastName,
    password: hashedPassword,
    active,
    created_ts,
    updated_ts,
    last_login,
    last_frustated_login,
    frustated_login_count,
    securityQuestion,
    securityAnsware
  });

  // Generate session tokens
  const master_token = generateToken();
  const session_token = generateToken();

  await SessionToken.create({
    user_id: user.id,
    master_token,
    session_token,
    active,
    created_ts: new Date(),
    updated_ts,
  });

  return {
    userName: username,
    userActive: active,
    masterToken: master_token,
    sessionToken: session_token,
  };
};
