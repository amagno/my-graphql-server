import {
    GraphQLList
} from 'graphql'

import { userType } from '../../types/user'
import jwt from 'jsonwebtoken'

import UserModel from '../../../models/user'
const verifyToken = (token) => {
    try {
        return jwt.verify(token, 'secret')
    } catch(error) {
        return false
    }
}

export default {
    type: new GraphQLList(userType),
    resolve: (parent, args, context) => {
        const users = UserModel.find().exec()
        const verify = verifyToken(context.token)
        console.log(verify)
        if(!users || !verify) {
            return {
                error: 'Not auth'
            }
        }

        return users
    }
}