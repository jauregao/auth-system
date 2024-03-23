import { knex } from '../connections/connections';
import { User } from '../types';

export const usersModel = {
  create: async function (userData: Omit<User, 'id'>): Promise<User> {

    await knex('users')
        .insert(userData)

    const user = await this.getUserByEmail(userData.email) as User

    return user
  },

  getUser: async function (id: number): Promise<User> {
    
    return await knex('users')
      .where({ id })
      .returning(['id', 'full_name', 'email'])
      .first() as User;
  },

  getUserByEmail: async function (email: string): Promise<User> {
    
    return await knex('users')
      .where({ email })
      .returning('*')
      .first() as User;
  },

  update: async function (id: number, userData: Omit<User, 'id'>): Promise<User> {

    const user = await knex('users')
        .update(userData)
        .where({ id })
        .returning('*') 

    const {pass, ...updatedUserData} = user[0]

    return updatedUserData 
  },

  delete: async function (id: number): Promise<Object> {

    await knex('user')
      .where({ id })
      .del()

    return { message: 'Usuário deletado com sucesso' }
  },

  changePass: async function (id: number, userPass: string) {

    await knex('users').update({ pass: userPass }).where({ id })

    return { message: 'Senha alterada com sucesso' }
  }
}