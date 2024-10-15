import express from 'express';
import { connectDatabase } from './database'; // Adjust the import according to your project structure
import reservationRoutes from './routes/reservationRoutes'; // Ensure the path is correct
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000; // Set to port 5000

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// Define the root route
app.get('/', (req, res) => {
    res.send('Welcome to the Hotel Reservation API!');
});

// Use reservation routes under a base path, e.g., /api
app.use('/api', reservationRoutes); // Adjust '/api' to your preference

// Connect to the database and start the server
connectDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
    });