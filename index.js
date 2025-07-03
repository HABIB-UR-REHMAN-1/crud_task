const express = require('express');
const app = express();

const connection = require('./connections/connection');
connection.connectToDatabase();



app.use(express.json());

const userRoutes = require('./routes/userRoute');
app.use('/api/users', userRoutes);

const productRoutes = require('./routes/productRoute');
app.use('/api/products', productRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});