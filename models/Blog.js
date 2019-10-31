import { Model, Sequelize } from 'sequelize'

import { sequelize } from '../db-init'

import Post from  './Post'


export default class Blog extends Model {}

Blog.init({
    id: {type: Sequelize.INTEGER, primaryKey: true},
    name: { type: Sequelize.STRING, allowNull: false},  
}, {sequelize, modelName: 'blog'})

Blog.hasMany(Post)
