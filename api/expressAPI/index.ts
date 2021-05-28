import express from 'express'
import users from './routes/users'
import test from './routes/test'

const app = express()

app.get('/', (_, res) => res.json('Hello Express'))
app.use(users)
app.use(test)

export default app

// Start standalone server if directly running
// if (require.main === module) {
//   const port = process.env.PORT || 3001
//   app.listen(port, () => {
//     // eslint-disable-next-line no-console
//     console.log(`API server listening on port ${port}`)
//   })
// }
