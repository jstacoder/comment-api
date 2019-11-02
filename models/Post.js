import Sequelize, { Model } from 'sequelize'

import { sequelize } from '../db-init'

import Comment from './Comment'

export default class Post extends Model {}

Post.init({
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: { type: Sequelize.STRING, allowNull: false},
    // blogId: {
    //     type: Sequelize.INTEGER,
    //     references: {
    //         key: 'id',
    //         deferrable: Sequelize.Deferrable.INITIALLY_DEFFERRED, 
    //         model: 'Blogs',
    //     }
    // }
}, { sequelize, modelName: 'post'})

// Post.belongsTo(Blog)

Post.hasMany(Comment)
// Comment.belongsTo(Post)