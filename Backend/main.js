import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
import employeeRoutes from './routes/crud.js'
import adminRoutes from './routes/auth.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

app.use('/api/employees', employeeRoutes);
app.use('/api/auth', adminRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
  }
};

startServer();
