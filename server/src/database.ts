import Knex from 'knex'


export default class Database {

    public static knex: Knex

    public static async connect() {
        const knexfile = require('../knexfile.js')
        this.knex = Knex(knexfile)
    }

}
