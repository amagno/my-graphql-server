import mongoose from 'mongoose'
import connectMongo from 'connect-mongo'

let connection = undefined;

const MongoStore = (session, options) => {
    const Instance = connectMongo(session)
    return new Instance(options)
}

const init = () => {
    mongoose.connect('mongodb://testing:testing@ds157571.mlab.com:57571/testing')
    connection = mongoose.connection
    connection.on('error', () => {
        throw new Error('Error on connect data base')
    })
    .once('open', () => {
        console.log('Connected to database Success!')
    })
    return connection
}

export default {
    init: init,
    mongoSession: MongoStore,
    connection
}