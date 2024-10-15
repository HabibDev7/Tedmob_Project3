import { Router, Request, Response } from 'express';
import { AppDataSource } from '../database';
import { Reservation } from '../entities/Reservation';

const router = Router();

router.post('/reservations', async (req: Request, res: Response) => {
  const reservationRepo = AppDataSource.getRepository(Reservation);
  try {
    const reservation = reservationRepo.create(req.body);
    await reservationRepo.save(reservation);
    res.status(201).json(reservation);
  } catch (error: unknown) {
    console.error('Error creating reservation:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error creating reservation', error: error.message });
    } else {
      res.status(500).json({ message: 'Error creating reservation', error: String(error) });
    }
  }
});

router.get('/reservations', async (req: Request, res: Response) => {
  const reservationRepo = AppDataSource.getRepository(Reservation);
  try {
    const reservations = await reservationRepo.find();
    res.status(200).json(reservations);
  } catch (error: unknown) {
    console.error('Error fetching reservations:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error fetching reservations', error: error.message });
    } else {
      res.status(500).json({ message: 'Error fetching reservations', error: String(error) });
    }
  }
});

export default router;