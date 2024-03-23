import { CustomRequest } from './../types'
import { Response } from 'express'
import { OmitedUserId } from '../types'
import { updateUserService } from '../services/updateUserService'

export const updateUserController = {
  async handle(req: CustomRequest, res: Response) {

    const usuario = req.usuario!
    const { id } = usuario

    const userData: OmitedUserId = req.body
    
    if(!userData.email || !userData.full_name || !userData.pass ) return res.status(403).json({message: 'Todos os dados precisam ser informados.'})
    
    try {
      const updatedUser = await updateUserService.execute(id, userData)

      const {pass, ...user} = updatedUser

      return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }
}
