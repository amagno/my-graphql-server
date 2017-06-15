import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
//import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import graphqlHTTP from 'express-graphql'
import schema from './graphql'
import db from './db'
import passport from 'passport'
import { githubPassportInit } from './passport'
import cors from 'cors'
import mongoose from 'mongoose'



const app = express()
const port = process.env.PORT || 3002

db.init()
githubPassportInit()

const throttle = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

app.use(session({ 
    secret: 'keyboard cat', 
    saveUninitialized: true,
    resave: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/graphql', cors(), (req, res) => {
    const token = req.query.token || req.headers['x-access-token']
    
    graphqlHTTP({
        schema,
        graphiql: true,
        context: {
            token: token
        }
    })(req, res)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.get('/auth/github', passport.authenticate('github', { scope: ['user:mail'] }), (req, res) => {
    res.send('hello')
})
app.get('/login', (req, res) => {
    res.send('<a href="/auth/github">login</a>')
})
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/protected')
})
app.get('/protected', throttle, (req, res) => {
    res.json(req.user)
})
app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`)
})

