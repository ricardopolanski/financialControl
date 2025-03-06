import User from '../models/userModel';
import SessionToken from '../models/sessionTokenModel';

export const findUserByUsername = async (username: string) => {
  return await User.findOne({ where: { username } });
};

export const createUser = async (userData: any) => {
  return await User.create(userData);
};

export const updateUser = async (username: string, updates: any) => {
  return await User.update(updates, { where: { username } });
};

export const incrementFrustratedLogin = async (username: string) => {
  return await User.increment('frustated_login_count', { by: 1, where: { username } });
};

export const createSessionToken = async (userId: string, tokens: any) => {
  return await SessionToken.create({ user_id: userId, ...tokens });
};
