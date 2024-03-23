import { usersModel } from '../models/usersModel'

export const updateUserPassService = {
  async execute(id: number, pass: string) {

    const updatedUserPass = await usersModel.changePass(id, pass)
    
    return updatedUserPass
  }
}
