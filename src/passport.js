import passport from 'passport'
import passportGithub from 'passport-github2'

const GithubStrategy = passportGithub.Strategy
const GITHUB_CLIENT_ID = '37b7f18f970f2b8bb52e'
const GITHUB_CLIENT_SECRET = 'd7e8184f691a7e99d8b7598742b7186377e5b0f2'
const GITHUB_CALLBACK_URL = 'http://localhost:3000/auth/github/callback'

export const githubPassportInit = () => {
    passport.serializeUser((user, done) => {
        done(undefined, user)
    })

    passport.deserializeUser((obj, done) => {
        done(undefined, obj)
    })
    passport.use(new GithubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            return done(undefined, profile)
        })
    }))
}

