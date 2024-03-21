import { usersModel } from '../models/usersModel'

export const loginService = {
  async execute(email: string) {

    const user = usersModel.getUserByEmail( email )

    return user
  }
}