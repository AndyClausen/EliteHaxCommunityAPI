import * as Knex from 'knex';
import config from './knexfile';

export default class DbHandler {
  private static _knex: Knex;

  static config() {
    this._knex = Knex(config);
  }

  static get knex(): Knex {
    return this._knex;
  }
}
