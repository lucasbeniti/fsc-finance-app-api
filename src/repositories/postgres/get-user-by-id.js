import { PostgresHelper } from '../../db/postgres/helper.js';

export class PostgresGetUserByIdRepository {
  async execute(id) {
    const user = await PostgresHelper.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );

    return user[0];
  }
}
