import { getRepository, ILike, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder("games")
      .where("games.title ilike :title", { title: `%${param}%` })
      .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query(`SELECT count(id) FROM games`);
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    /*
    return await getRepository(User)
      .query(`SELECT usr.* FROM users as usr JOIN users_games_games as gme ON usr.id = gme."usersId" WHERE gme."gamesId"='${id}'`);
    */
    // /*
    return await getRepository(User)
      .createQueryBuilder("users")
      .innerJoin("users.games", "games")
      .where("games.id = :id", { id })
      .select("users")
      .getMany();
    // */
  }
}
