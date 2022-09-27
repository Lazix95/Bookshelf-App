import express from 'express';
import path from 'path';

const app = express();

// Import Plugins
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Import Routes
import authRoutes from './routes/authRoutes';
import bookRoutes from './routes/booksRoutes';

// log only 4xx and 5xx responses to console
app.use(
  morgan('dev', {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

// parse application/json
// app.use(bodyParser.urlencoded())
app.use(bodyParser.json());

//CORS Settings
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Serve static files;
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api', authRoutes);
app.use('/api', bookRoutes);

// Error handling middleware
// Every next(error) will end up here
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;
  const validationMessages = error.validationMessages;
  const data = error.data;
  const payload = {
    ...(message && { msg: message }),
    ...(validationMessages && { validationMessages }),
    data: data,
  };
  res.status(status).json(payload);
});

const port = process.env.port || 3333;
console.log(process.env.MONGO_DB_URI)
mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(() => {
    const server = app.listen(port, () => {
      console.log(
        `Listening at http://localhost:${port}/api`,
        'Mongo DB Connected'
      );
    });
    server.on('error', console.error);
  }).catch((err) => console.log('MongoDB Error => ', err));
