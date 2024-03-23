import { usersModel } from "../models/usersModel"

export const deleteUserService = {
  async execute(id: number) {

    await usersModel.delete(id)

    return
  }
}
