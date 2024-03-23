import { deleteUserService } from '../services/deleteUserService'
import { getUserService } from '../services/getUserService'
import { comparePasswords } from '../controllers/comparePass'
import { Response } from 'express'
import { CustomRequest } from '../types'

export const deleteUserController = {
  async handle(req: CustomRequest, res: Response) {

    const usuario = req.usuario!
    const { id } = usuario

    const pass: string = req.body

    try {
      const user = await getUserService.execute(id)

      const validPass = comparePasswords(pass, user.pass)

      if(!validPass) return res.status(403).json({message: 'Senha incorreta.'})

      await deleteUserService.execute(id);

      return res.status(204).json({ message: 'Usuario excluído com sucesso.' });

    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }
}
