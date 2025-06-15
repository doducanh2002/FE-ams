export interface BaseResponse<T = any> {
  code: string;
  timestamp: number;
  data: T;
  message?: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE';
  address?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenLifetime: number;
  refreshTokenLifetime: number;
}

export interface Flight {
  id: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  aircraft: string;
  availableSeats: number;
  status: string;
}

export interface Trip {
  id: string;
  confirmationCode: string;
  tripType: 'ONE_WAY' | 'ROUND_TRIP';
  status: string;
  totalPrice: number;
  departure: string;
  arrival: string;
  departureDate: string;
  flights: Flight[];
  travelClasses: TravelClass[];
}

export interface TravelClass {
  class: 'ECONOMY' | 'BUSINESS' | 'FIRST';
  price: number;
  availableSeats: number;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  dietary: string[];
}

export interface Airport {
  id: string;
  code: string;
  name: string;
  country: string;
  region: string;
  city: string;
  timezone: string;
}

export interface Passenger {
  num: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE';
  country: string;
  dob: string;
}

export interface BookingRequest {
  ticketId: string;
  totalPrice: number;
  tripType: 'ONE_WAY' | 'ROUND_TRIP';
  trips: any[];
  passengerInfo: Passenger[];
  tripContact: {
    primaryEmail: string;
    phoneNumber: string;
  };
  specialAssistances?: string[];
}