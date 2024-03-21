import { usersModel } from '../models/usersModel'

export const loginService = {
  async execute(email: string) {

    const user = usersModel.getUserLogin( email )

    return user
  }
}