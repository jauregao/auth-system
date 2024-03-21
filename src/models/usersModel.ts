import { knex } from '../connections/connections';
import { User } from '../types';

export const usersModel = {
  create: async function (userData: User): Promise<User> {

    const createdUser = await knex('users').insert(userData).returning('id');

    const user = await this.getUser(createdUser) as User

    return user
  },

  getUser: async function (id: number): Promise<User> {
    
    return await knex('users')
      .select('full_name', 'email', 'registration_date')
      .where({ id })
      .first() as User;
  },

  update: async function (id: number, userData: User): Promise<User> {

    const user = await knex('users')
        .update(userData)
        .where({ id })
        .returning('*')
        .first() as User

    const {pass, ...updatedUserData} = user

    return updatedUserData as User
  },

  delete: async function (id: number): Promise<Object> {

    await knex('user')
      .where({ id })
      .del()

    return { message: 'Usuário deletado com sucesso' }
  },

  changePass: async function (id: number, userPass: User) {

    await knex('users').update({ pass: userPass }).where({ id })

    return { message: 'Senha alterada com sucesso' }
  }
}