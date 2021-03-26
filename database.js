const mongoose = require('mongoose');
const colors = require('colors');

const monogoUrl = process.env.MONGO_URL;

mongoose.Promise = Promise;
mongoose.set('debug', true);
mongoose.connection
  .once('open', () => {
    console.log(`✔ MongoDB ready at ${colors.blue.bold(process.env.MONGO_URL)}`);
  })
  .on('connected', () => {
    console.log('✔ MongoDB Connection Established');
  })
  .on('reconnected', () => {
    console.log('✔ MongoDB Connection Reestablished');
  })
  .on('disconnected', () => {
    console.log('✔ MongoDB Connection Disconnected');
  })
  .on('close', () => {
    console.log('✔ MongoDB Connection Closed');
  })
  .on('error', (error) => {
    console.log('✔ MongoDB Connection Failed');
    console.error(error);
  });

let _db; // database client

exports.connectDB = async () => {
  if (!monogoUrl) {
    throw new Error('Invalid MongoDB URL');
  }
  const mongooseObject = await mongoose.connect(monogoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  return (_db = mongooseObject);
};

exports.getDatabaseClient = () => _db;
