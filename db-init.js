import { Sequelize } from 'sequelize'

import { dbConfig } from './config.js'

const { 
    database,
    username,
    password,
    config,
} = dbConfig

export const sequelize = new Sequelize(database, username, password, config)