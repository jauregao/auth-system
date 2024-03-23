import { Router } from 'express'
import { loginController, createUserController, getUserController } from '../controllers'
import { verifyEmailAlredyExists } from '../middlewares/verifyEmailExists'
import { verifyUserIsLogged } from '../middlewares/verifyUserIsLogged'

const userRoutes = Router()


userRoutes.post('/usuario',
  verifyEmailAlredyExists,
  createUserController.handle
  )

userRoutes.post('/login', 
  loginController.handle
  )

userRoutes.get('/usuario',
  verifyUserIsLogged,
  getUserController.handle
  )

userRoutes.put('/usuario',
verifyUserIsLogged
  )

userRoutes.put('/usuario/recuperar-senha',
  verifyUserIsLogged
  )

userRoutes.delete('/usuario',
  verifyUserIsLogged
  )

export default userRoutes
