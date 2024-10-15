// src/database.ts
import { DataSource } from 'typeorm';
import { Reservation } from './entities/Reservation';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.DB_HOST, process.env.DB_USERNAME, process.env.DB_PASSWORD);

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
    entities: [Reservation],
    synchronize: process.env.NODE_ENV !== 'production', // Set to false in production
});

export const connectDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log('PostgreSQL connected');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;  // Throw the error to handle it in the index.ts
    }
};