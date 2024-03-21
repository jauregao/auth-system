import { User } from './../types';
import { usersModel } from '../models/usersModel'
import bcrypt from 'bcrypt'

export const createUserService = {
  async execute(userData: Omit<User, 'id'>) {

    const newPass = await bcrypt.hash(userData.pass, 10)
    userData.pass = newPass

    const newUser = await usersModel.create(userData)

    const {pass, ...user} = newUser

    return user
  }
}