import Sequelize, { Model } from 'sequelize'

import { sequelize } from '../db-init'

export default class Comment extends Model {}

Comment.init({
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
    text: {type: Sequelize.TEXT, allowNull: false},
    authorEmail: { type: Sequelize.STRING, allowNull: false },
    date: { type: Sequelize.DATEONLY, default: Sequelize.NOW},
    // postId: {
    //     type: Sequelize.INTEGER,
    //     references: {
    //         model: 'Posts',
    //         key: 'id',
    //         deferrable: Sequelize.Deferrable.INITIALLY_DEFFERRED, 
    //     }
    // },
}, {sequelize, modelName: 'comment' })


