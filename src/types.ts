import { Request } from "express"

export type User = {
  id: number
  email: string
  pass: string
  full_name: string
}

export type UserLogin = {
  email: string
  pass: string
}

export interface CustomRequest extends Request {
  usuario?: User
}

export type OmitedUserId = Omit<User, 'id'>
