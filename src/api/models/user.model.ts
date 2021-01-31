import { Schema } from 'mongoose';
import { IUserDataModel } from '../../common/interfaces/user.interface';

const mongoose = require('../../database/connection');

const UserModel: Schema<IUserDataModel> = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        }
    },
    {
        timestamp: true,
    },
)

const User: Schema<IUserDataModel> = mongoose.model('User', UserModel);

module.exports = User;