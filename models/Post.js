import { Model, Sequelize } from 'sequelize'

import { sequelize } from '../db-init'


import Comment from './Comment'

export default class Post extends Model {}

Post.init({
    id: { type: Sequelize.INTEGER, primaryKey: true},
    name: { type: Sequelize.STRING, allowNull: false},
    blogId: {
        type: Sequelize.INTEGER,
        references: {
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_DEFFERRED, 
            model: 'Blog',
        }
    }
}, { sequelize, modelName: 'post'})


Post.hasMany(Comment)
Comment.belongsTo(Post)