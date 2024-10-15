import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Reservation } from '../entities/Reservation';

class ReservationController {
    async createReservation(req: Request, res: Response) {
        const reservationData = req.body;
        
        const reservationRepository = getRepository(Reservation);

        const reservation = reservationRepository.create(reservationData);

        try {
            const savedReservation = await reservationRepository.save(reservation);
            return res.status(201).json(savedReservation);
        } catch (error) {
            console.error('Error creating reservation:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default new ReservationController();