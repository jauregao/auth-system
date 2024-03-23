import { CustomRequest } from './../types'
import { Response } from 'express'
import { updateUserPassService } from '../services/updatePassService'

export const updatePassController = {
  async handle(req: CustomRequest, res: Response) {

    const usuario = req.usuario!
    const { id } = usuario

    const userPass: string = req.body
    
    if(!userPass || userPass.length < 6) return res.status(403).json({message: 'Informe uma senha válida.'})
    
    try {
      await updateUserPassService.execute(id, userPass)

      return res.status(201).json({message: 'Senha alterada com sucesso.'})

    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }
}
