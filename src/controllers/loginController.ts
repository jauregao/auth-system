import { User, UserLogin } from './../types';
import { loginService } from "../services/loginService"
import jwt, { Secret } from 'jsonwebtoken'
import { Request, Response } from 'express'
import { comparePasswords } from './comparePass'

const secretKey: Secret = process.env.JWT_SECRET_KEY!
const expires = process.env.JWT_EXPIRED

export const loginController = {

  async handle(req: Request, res: Response) {

    const userLoginData: UserLogin = req.body

    try {

      const userData = await loginService.execute(userLoginData.email)

      if (!userData) return res.status(403).json({ message: 'Usuário e/ou senha inválido(s)' })
      
      const validPass = await comparePasswords(userLoginData.pass, userData.pass)
      
      if (!validPass) return res.status(403).json({ message: 'Usuário e/ou senha inválido(s)' })

      const token = generateAuthToken(userData.id)

      return res.status(200).json({
      usuario: {
        id: userData.id,
        nome: userData.full_name,
        email: userData.email
      },
      token: token,
    })
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }
}

function generateAuthToken(userId: number): string {
  return jwt.sign({ id: userId }, secretKey, { expiresIn: expires })
}

