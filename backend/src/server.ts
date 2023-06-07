import mongoose from 'mongoose';
import config from './config/config';
import authRouter from './routes/auth';
import taskRouter from './routes/tasks'
const express=require('express')
const app = express();
import { User } from './models/User';
const cors = require('cors');



const connect = async () => {
  try {
    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      bufferCommands: false,
      sslValidate: false, // Disable SSL certificate verification

    };
    await mongoose.connect(config.mongoURI, );
    console.log('Connected to MongoDB');
    const connect = () => {
      return mongoose.connect(config.mongoURI,mongooseOptions );

    };
    // Listen for the 'open' event to make sure the initial connection is complete
    mongoose.connection.once('open', () => {
      console.log('MongoDB connection is ready');
      // Create indexes
      User.createIndexes();
    }); 

    
  }
   catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
};

connect();
app.use(cors());

app.use(express.json());

app.use('/api/auth', authRouter);

app.use('/api/task', taskRouter)


app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
