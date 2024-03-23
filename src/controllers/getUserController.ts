import { getUserService } from '../services/getUserService'
import { Response } from 'express'
import { CustomRequest } from '../types'

export const getUserController = {
  async handle(req: CustomRequest, res: Response) {

    const usuario = req.usuario!
    const { id } = usuario

    try {
      const user = await getUserService.execute(id)

      const {pass, ...userData} = user

      return res.status(200).json(userData);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }
}