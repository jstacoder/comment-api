import express from 'express'
import graphqlHTTP from 'express-graphql'

import { schema } from './schema.es6'

const app = express()

app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true,
}))

console.log(`serving at ${process.env.PORT}`)
app.listen(process.env.PORT || 8500)

