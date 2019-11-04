import Sequelize, { Model } from 'sequelize'

import { sequelize } from '../db-init'

export default class Comment extends Model {}

Comment.init({
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
    text: {type: Sequelize.TEXT, allowNull: false},
    authorEmail: { type: Sequelize.STRING, allowNull: false },
    date: { type: Sequelize.DATEONLY, default: Sequelize.NOW},   
}, {sequelize, modelName: 'comment' })


