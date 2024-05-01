
//mongodb
require('./config/db');
const mongoose = require('mongoose');
const app = require('express')();
const port = process.env.PORT || 3000;
const UserRouter = require('./api/user');



const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/user',UserRouter)

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start your Express server
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(port, () => {   
    console.log(`Server is running on http://localhost:${port}`);
});
