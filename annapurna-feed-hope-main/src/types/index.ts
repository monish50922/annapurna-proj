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
  donor_id: number;
  donor_name?: string;
  food_type: string;
  quantity: string;
  pickup_time: string;
  location: string;
  status: 'available' | 'claimed' | 'completed';
  claimed_by?: number;
  created_at?: string;
  updated_at?: string;
}

export interface DonationFormData {
  food_type: string;
  quantity: string;
  pickup_time: string;
  location: string;
}

export interface AdminReport {
  totalUsers: number;
  totalDonations: number;
  claimedDonations: number;
}
