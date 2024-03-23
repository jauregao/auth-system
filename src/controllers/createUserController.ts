import { Request, Response } from 'express'
import { OmitedUserId, User } from '../types'
import { createUserService } from '../services/createUserService'

export const createUserController = {
  async handle(req: Request, res: Response) {

    const userData: OmitedUserId = req.body
    
    if(!userData) return {message: 'Todos os dados precisam ser informados.'}
    
    try {
      const newUser = await createUserService.execute(userData)

      return res.status(201).json(newUser)

    } catch (error) {
      console.log(error);
      
        return res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }
}