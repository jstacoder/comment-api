import { sequelize } from './db-init'

sequelize.sync({force: true})