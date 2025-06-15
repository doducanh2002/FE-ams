import React, { useState } from 'react';
import { apiService } from '../../services/api';
import { useToast } from '../../components/ui/toast';
import { 
  SearchIcon, 
  PlaneIcon, 
  UserIcon, 
  CalendarIcon,
  MapPinIcon,
  CheckCircleIcon
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

interface CheckInTrip {
  id: string;
  confirmationCode: string;
  passengers: Array<{
    firstName: string;
    lastName: string;
    seatNumber: string;
    checkedIn: boolean;
  }>;
  flights: Array<{
    id: string;
    flightNumber: string;
    departure: string;
    arrival: string;
    departureTime: string;
    gate: string;
    status: string;
  }>;
}

export const CheckIn: React.FC = () => {
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useState({
    lastName: '',
    confirmationCode: ''
  });
  const [trips, setTrips] = useState<CheckInTrip[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchParams.lastName || !searchParams.confirmationCode) {
      showToast('Please enter both last name and confirmation code', 'warning');
      return;
    }

    setLoading(true);
    try {
      const data = await apiService.searchTripForCheckin(
        searchParams.lastName,
        searchParams.confirmationCode
      );
      setTrips(data || []);
      if (data?.length === 0) {
        showToast('No trips found with the provided information', 'info');
      }
    } catch (error) {
      showToast('Failed to find trip. Please check your information.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  };

  const handleCheckIn = (tripId: string, passengerId: string) => {
    showToast('Check-in successful!', 'success');
    // Update the trip state to mark passenger as checked in
    setTrips(prev => prev.map(trip => 
      trip.id === tripId 
        ? {
            ...trip,
            passengers: trip.passengers.map(passenger => 
              passenger.firstName + passenger.lastName === passengerId
                ? { ...passenger, checkedIn: true }
                : passenger
            )
          }
        : trip
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Online Check-In</h1>
          <p className="text-gray-600">Check in for your flight and get your boarding pass</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <SearchIcon className="w-5 h-5" />
              Find Your Trip
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passenger Last Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Enter last name"
                    value={searchParams.lastName}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, lastName: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmation Code
                </label>
                <Input
                  placeholder="Enter confirmation code"
                  value={searchParams.confirmationCode}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, confirmationCode: e.target.value.toUpperCase() }))}
                  className="uppercase"
                />
              </div>
            </div>
            
            <Button 
              onClick={handleSearch}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              {loading ? 'Searching...' : 'Find My Trip'}
            </Button>
          </CardContent>
        </Card>

        {/* Trip Results */}
        {trips.length > 0 && (
          <div className="space-y-6">
            {trips.map((trip) => (
              <Card key={trip.id} className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlaneIcon className="w-5 h-5" />
                    Trip Details - {trip.confirmationCode}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Flight Information */}
                  {trip.flights.map((flight) => {
                    const { date, time } = formatDateTime(flight.departureTime);
                    return (
                      <div key={flight.id} className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              Flight {flight.flightNumber}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                              <span className="flex items-center gap-1">
                                <MapPinIcon className="w-4 h-4" />
                                {flight.departure} → {flight.arrival}
                              </span>
                              <span className="flex items-center gap-1">
                                <CalendarIcon className="w-4 h-4" />
                                {date} at {time}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              flight.status === 'ON_TIME' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {flight.status.replace('_', ' ')}
                            </span>
                            {flight.gate && (
                              <p className="text-sm text-gray-600 mt-1">Gate: {flight.gate}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Passengers */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Passengers</h4>
                    <div className="space-y-3">
                      {trip.passengers.map((passenger, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-4 border rounded-lg bg-white"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <UserIcon className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {passenger.firstName} {passenger.lastName}
                              </p>
                              <p className="text-sm text-gray-600">
                                Seat: {passenger.seatNumber}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {passenger.checkedIn ? (
                              <div className="flex items-center gap-2 text-green-600">
                                <CheckCircleIcon className="w-5 h-5" />
                                <span className="font-medium">Checked In</span>
                              </div>
                            ) : (
                              <Button
                                onClick={() => handleCheckIn(trip.id, passenger.firstName + passenger.lastName)}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                              >
                                Check In
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && trips.length === 0 && searchParams.lastName && searchParams.confirmationCode && (
          <Card className="shadow-lg">
            <CardContent className="text-center py-12">
              <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No trips found</h3>
              <p className="text-gray-600 mb-4">
                Please check your last name and confirmation code and try again
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSearchParams({ lastName: '', confirmationCode: '' })}
              >
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};