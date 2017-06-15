import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLBoolean
} from 'graphql'



export const userType = new GraphQLObjectType({
    name: 'User',
    description: 'User Type',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
})
export const userAuthType = new GraphQLObjectType({
    name: 'UserAuth',
    description: 'User auth return token',
    fields: () => ({
        token: {
            type: GraphQLString
        },
        error: {
            type: GraphQLBoolean
        },
        message: {
            type: GraphQLString
        }
    })
})
export const userInputType = new GraphQLInputObjectType({
    name: 'Userinput',
    description: 'Insert user',
    fields: () => ({
        email: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        }
    })
})
export const userAuthInputType = new GraphQLInputObjectType({
    name: 'UserLogininput',
    description: 'Login user',
    fields: () => ({
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        }
    })
})