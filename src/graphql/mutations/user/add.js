import {
    GraphQLNonNull
} from 'graphql'

import {
    userType,
    userInputType
} from '../../types/user'

import UserModel from '../../../models/user'

export default {
    type: userType,
    args: {
        data: {
            name: 'data',
            type: new GraphQLNonNull(userInputType)
        }
    },
    resolve: async (root, params) => {
        const NewUserModel = new UserModel(params.data)

        const newUser = await NewUserModel.save()
        .then((u) => {
            return u
        }, (e) => {
            return e
        })
      
        return newUser
    }
}