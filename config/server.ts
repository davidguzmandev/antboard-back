/* import dotenv from 'dotenv'; */
import app from '../app';
import connectDB from './db';

/* dotenv.config(); */

const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'http://localhost';

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${URL}${PORT}`);
    });
}).catch((err) => {
    console.error('❌ Failed to connect to the database:', err);
    process.exit(1);
})