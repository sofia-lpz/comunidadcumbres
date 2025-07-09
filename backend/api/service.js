import * as repository from './repository.js';
import bcrypt from 'bcrypt';

export const login = async (username, password) => {
  const user = await repository.findUserByUsername(username);
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  return user;
}

export const register = async (username, password) => {
  const existingUser = await repository.findUserByUsername(username);
  if (existingUser) {
    throw new Error('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await repository.register({ username, password: hashedPassword });
  
  return newUser;
}

export const getUser = async (userId) => {
  const user = await repository.findUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
}