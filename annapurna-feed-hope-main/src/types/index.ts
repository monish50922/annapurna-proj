export type UserRole = 'DONOR' | 'NGO' | 'ADMIN';

export interface User {
  id: number;
  name: string;
  role: UserRole;
  email?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Donation {

  id: number;

  food_type: string;
  quantity: string;
  pickup_time: string;
  location: string;

  event_type?: string;

  status: 'AVAILABLE' | 'CLAIMED' | 'PICKED' | 'DELIVERED';

  donor?: {
    name: string;
  };

  ngo?: {
    name: string;
  };

  createdAt?: string;
  updatedAt?: string;

}

export interface DonationFormData {

  food_type: string;
  quantity: string;
  pickup_time: string;
  location: string;
  event_type: string;

}

export interface AdminReport {

  totalUsers: number;
  totalDonations: number;
  claimedDonations: number;

}