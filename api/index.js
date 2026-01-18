import express from 'express'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/user.route.js';
import listingRouter from './routes/list-property.route.js';
import cookieParser from 'cookie-parser';
import myPropertiesRouter from './routes/my-properties.route.js';
import savedPropertiesRouter from './routes/saved-properties.route.js';

mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/listing-property', listingRouter);
app.use('/api/list-property', listingRouter);
app.use('/api/my-properties', myPropertiesRouter);
app.use('/api/saved-properties', savedPropertiesRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({ 
    success:false, 
    statusCode,
    message,
   });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
