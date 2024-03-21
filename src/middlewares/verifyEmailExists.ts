import { usersModel } from '../models/usersModel'
import { NextFunction, Request, Response } from 'express'

export async function verifyEmailAlredyExists ( req: Request, res: Response, next: NextFunction ) {

  const { email } = req.body

  try {
    const user = await usersModel.getUserByEmail( email )

    if(user) return res.status(400).json({message: 'Endereçon de email já existe.'})

    next()
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  }
}