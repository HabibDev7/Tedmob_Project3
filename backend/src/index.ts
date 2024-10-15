import express from 'express';
import { connectDatabase } from './database';
import reservationRoutes from './routes/reservationRoutes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Hotel Reservation API!');
});

app.use('/api', reservationRoutes);

connectDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
    });