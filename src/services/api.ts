const API_BASE_URL = 'http://ams-java.duckdns.org/api/v1';

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  }

  // Authentication
  async customerLogin(username: string, password: string) {
    return this.request('/customers/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async customerRegister(email: string, username: string, password: string, confirmPassword: string) {
    return this.request('/customers/register', {
      method: 'POST',
      body: JSON.stringify({ email, username, password, confirmPassword }),
    });
  }

  async employeeLogin(username: string, password: string) {
    return this.request('/employees/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  // Customer Profile
  async getCustomerProfile() {
    return this.request('/customers/self');
  }

  async updateCustomerProfile(data: any) {
    return this.request('/customers/self', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Flights & Trips
  async searchFlights(from: string, to: string, date: string) {
    return this.request(`/flights?from=${from}&to=${to}&date=${date}`);
  }

  async filterTrips(data: any) {
    return this.request('/trips/filter', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getFlightMeals(flightId: string) {
    return this.request(`/flights/${flightId}/meals`);
  }

  // Booking
  async calculateTicketPrice(data: any) {
    return this.request('/tickets/calculation', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async processPayment(data: any) {
    return this.request('/tickets/payment', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Airports
  async getAirports(country?: string, region?: string) {
    const params = new URLSearchParams();
    if (country) params.append('country', country);
    if (region) params.append('region', region);
    return this.request(`/airports?${params.toString()}`);
  }

  // Customer Trips
  async getCustomerTrips() {
    return this.request('/customers/self/trips');
  }

  // Check-in
  async searchTripForCheckin(passengerLastName: string, confirmationCode: string) {
    return this.request(`/trips/check-in?passengerLastName=${passengerLastName}&confirmationCode=${confirmationCode}`);
  }
}

export const apiService = new ApiService();