import mongoose from 'mongoose'
import Agenda from 'agenda'
import debug from 'debug'


const { MONGO_CONNECTION_URI, MONGO_DBNAME, MONGO_AUTHSOURCE='', MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTS, MONGO_PORT, ENV } = process.env
const log = debug('app')

mongoose.Promise = Promise

mongoose.connection.on('connected', () => {
  console.log('Mongo Connection Established')
  log('Mongo Connection Established')
})

mongoose.connection.on('reconnected', () => {
  console.log('Connection Reestablished')
})

mongoose.connection.on('disconnected', () => {
  console.log('Connection Disconnected')
  setTimeout(() => {
    console.log(' #### RECALL SINCE DISCONNECTED #### ')
    connectMongo()
  }, 5000);
})

mongoose.connection.on('close', () => {
  console.log('Connection Closed')
})

mongoose.connection.on('error', error => {
  console.log('ERROR: ' + error)
  process.exit(1)
})
// Enable Debug Mode: Set mongoose.set('debug', true) to enable debug mode. This will log the executed MongoDB operations to the console.
// mongoose.set('debug', true)

/**
 * @memberof Router-Index.js
 */
let connectionuri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTS}:${MONGO_PORT}/${MONGO_DBNAME}`
if(ENV === 'localhost'){
  connectionuri += `?authSource=${MONGO_AUTHSOURCE}`
}
if(MONGO_HOSTS === 'MONGOATLAS'){
  connectionuri = MONGO_CONNECTION_URI;
}
/**
 * @agendaJs - for CronJobs
 */
const initAgendaJs = async() => {
  const agenda = new Agenda({ db: { address: connectionuri } })

  //DEFINE AJENDA JOBS
  agenda.define('dailyJob', async job => {
    try {
      console.log('Running the daily job at 10 AM')
      //CRON Funtions here
    }catch(error){
      console.log('ERROR IN dailyJob>>> ',error)
    }
  })

  await agenda.start()
  //SCHEDULE DEFINED JOBS
  await agenda.every('0 10 * * *', 'dailyJob'); // Schedules the job to run every day at 10 AM 

  // Graceful shutdown
  async function graceful() {
    await agenda.stop();
    process.exit(0);
  }

  process.on('SIGTERM', graceful);
  process.on('SIGINT', graceful);
  return 
}

const connectMongo = async () => {
  const options = {
    // autoReconnect: true,
    connectTimeoutMS: 5000,
    // useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true
  }
  log(connectionuri)
  await mongoose.connect(connectionuri, options)

  await initAgendaJs()

}

export { connectMongo, connectionuri }
