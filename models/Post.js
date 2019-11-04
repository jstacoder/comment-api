import Sequelize, { Model } from 'sequelize'

import { sequelize } from '../db-init'

import Comment from './Comment'

export default class Post extends Model {}

Post.init({
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: { type: Sequelize.STRING, allowNull: false},
   
}, { sequelize, modelName: 'post'})

Post.hasMany(Comment)
