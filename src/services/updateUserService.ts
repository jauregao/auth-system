import { usersModel } from '../models/usersModel'
import { User } from '../types';

export const updateUserService = {
  async execute(id: number, userData: Omit<User, 'id'>) {
    const updatedUser = await usersModel.update(id, userData)

    return updatedUser
  }
}
