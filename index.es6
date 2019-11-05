import express from 'express'
import graphqlHTTP from 'express-graphql'
import cors from 'cors'

import { schema } from './schema.js'

const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true,
}))

console.log(`serving at ${process.env.PORT}`)
app.listen(process.env.PORT || 8500)

