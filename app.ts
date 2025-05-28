import express from 'express';
import authRoutes from './auth/authRoutes';
/* import loadRoutes from './loads/loadRoutes';
import truckRoutes from './trucks/truckRoutes'; */

const app = express();
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Ant LoadBoard');
})

app.use("/auth", authRoutes);

export default app;


