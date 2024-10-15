import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  @IsString()
  firstName: string;

  @Column({ length: 50 })
  @IsString()
  lastName: string;

  @Column('date')
  @IsDate()
  dob: Date;

  @Column({ unique: true, length: 150 })
  @IsEmail()
  email: string;

  @Column({ length: 15, nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Column('date')
  @IsDate()
  arrivalDate: Date;

  @Column('date')
  @IsDate()
  departureDate: Date;

  @Column({ length: 50 })
  @IsString()
  roomType: string;

  @Column()
  @IsNumber()
  adults: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsNumber()
  children?: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @IsNumber()
  price: number;

  constructor(
    firstName: string,
    lastName: string,
    dob: Date,
    email: string,
    arrivalDate: Date,
    departureDate: Date,
    roomType: string,
    adults: number,
    price: number,
    phone?: string,
    children?: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
    this.email = email;
    this.phone = phone;
    this.arrivalDate = arrivalDate;
    this.departureDate = departureDate;
    this.roomType = roomType;
    this.adults = adults;
    this.children = children;
    this.price = price;
  }  
}