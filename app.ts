import express from 'express';
/* import loadRoutes from './loads/loadRoutes';
import truckRoutes from './trucks/truckRoutes'; */

const app = express();
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Ant LoadBoard');
})

export default app;


