import {
    GraphQLNonNull
} from 'graphql'

import {
    userAuthType,
    userAuthInputType
} from '../../types/user'

import jwt from 'jsonwebtoken'

import UserModel from '../../../models/user'

const authJwt = (data) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ email: data.email }, (error, user )  => {
            if(error) {
                return reject(error)
            }
            if(!user) {
                return reject('User invalid')
            }
            if(data.password != user.password) {
                return reject('Password invalid')
            }
            return resolve(user)
        })
    })
}

export default {
    type: userAuthType,
    args: {
        data: {
            name: 'data',
            type: new GraphQLNonNull(userAuthInputType)
        }
    },
    resolve: (root, params) => {
       
       return authJwt(params.data).then(user => {
        if(user) {
            return {
               token: jwt.sign({ authUserId: user._id }, 'secret', { expiresIn: '1h' }),
               error: false,
               message: 'Authentication Success'
            }
        }
       }, error => {
           return {
               token: undefined,
               error: true,
               message: error
           }
       })
    }
}