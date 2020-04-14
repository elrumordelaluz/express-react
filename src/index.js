import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'
import logger from 'morgan'
import cors from 'cors'
import errorhandler from 'errorhandler'
import pkg from '../package.json'

const app = express()
const port = process.env.PORT || 5200
const isDev = process.env.NODE_ENV === 'development'

app.use(helmet())
if (!isDev) app.set('trust proxy', 1)
app.use(logger(isDev ? 'dev' : 'combined'))
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '16mb' }))
if (isDev) app.use(errorhandler())
app.use(cors())

app.get('/test', (req, res, next) => {
  res.send('Response from server')
})

if (!isDev) {
  // Serve any static files
  app.use(auth, express.static(resolve(__dirname, '..', 'client/build')))

  // Handle React routing, return all requests to React app
  app.get('/*', (req, res) => {
    res.sendFile(resolve(__dirname, '..', 'client/build', 'index.html'))
  })
}

app.get('*', (req, res, next) => {
  res.status(200).json({ ok: true })
})

app.use((err, req, res, next) => {
  if (err.isBoom) {
    res.status(err.output.statusCode).json(err.output.payload)
  } else {
    res.status(400).send('Something went wrong')
  }
})

app.listen(port, (err) => {
  if (err) throw err

  console.log(
    isDev
      ? require('boxen')(
          `>>> ${pkg.name} <<<  
server running in ${app.get('env')}

Visit: http://localhost:${port}`,
          {
            padding: 1,
            borderColor: 'cyan',
            margin: 1,
            borderStyle: 'round',
          }
        )
      : `>>> ${pkg.name} running <<<`
  )
})
