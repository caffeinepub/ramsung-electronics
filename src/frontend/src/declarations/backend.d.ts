import type { ActorMethod } from '@dfinity/agent';

export interface CarListing {
  id: bigint;
  make: string;
  model: string;
  year: bigint;
  price: bigint;
  mileage: bigint;
  fuelType: string;
  transmission: string;
  color: string;
  imageUrl: string;
  description: string;
  available: boolean;
}

export interface Inquiry {
  id: bigint;
  name: string;
  email: string;
  phone: string;
  message: string;
  carInterest: string;
  timestamp: bigint;
}

export interface _SERVICE {
  getAvailableCars: ActorMethod<[], CarListing[]>;
  getAllCars: ActorMethod<[], CarListing[]>;
  getCarById: ActorMethod<[bigint], [] | [CarListing]>;
  addCar: ActorMethod<[string, string, bigint, bigint, bigint, string, string, string, string, string], bigint>;
  markCarUnavailable: ActorMethod<[bigint], boolean>;
  submitInquiry: ActorMethod<[string, string, string, string, string], bigint>;
  getAllInquiries: ActorMethod<[], Inquiry[]>;
}
