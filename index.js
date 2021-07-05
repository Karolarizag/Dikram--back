process.stdout.write('\x1Bc')

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const { router } = require('./api/routes')
const api = express()

api
  .use(cors())
  .use(morgan('dev'))
  .use(express.json())
  .use('/api', router)
  .listen(process.env.PORT || 3000, err => {
    if (err) { throw new Error(err) }

    mongoose.connect(process.env.MONGO_URL,
      {
        dbName: process.env.MONGO_DB || 'dikram',
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      }, err => {
        if (err) { throw new Error(err) }
        console.info('Connected to Mongo Database \n')
        console.info('>'.repeat(40))
        console.info('   Dikram Server Live')
        console.info(`   PORT: ${process.env.SERVER_URL}${process.env.PORT}`)
        console.info('>'.repeat(40) + '\n')
      })
  })
