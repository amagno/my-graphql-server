import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'

const app = express()
const port = process.env.PORT || 3000

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

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: mySchema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))


app.use('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`)
})