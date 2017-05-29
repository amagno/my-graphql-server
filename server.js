import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'
const typeDefs = [`
type Query {
  hello: String
}

schema {
  query: Query
}`]

const resolvers = {
  Query: {
    hello(root) {
      return 'world'
    }
  }
}
const mySchema = makeExecutableSchema({ typeDefs, resolvers })
const port = process.env.PORT || 80

let app = express()


app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: mySchema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(port, () => {
    console.log('Testing.....')
})