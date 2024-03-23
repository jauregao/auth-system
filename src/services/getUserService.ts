import { usersModel } from './../models/usersModel'

export const getUserService = {
  async execute(id: number) {

    const user = await usersModel.getUser(id);

    return user
  }
}
