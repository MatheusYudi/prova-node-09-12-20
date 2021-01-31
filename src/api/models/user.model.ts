const crypto = require('crypto');
const mongoose = require('../../database/connection');

import { Schema } from 'mongoose';

export interface IUserDataModel {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
}

const UserModel: Schema<IUserDataModel> = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        }
    },
    {
        timestamp: true,
    },
)

const User: Schema<IUserDataModel> = mongoose.model('User', UserModel);

module.exports = User;