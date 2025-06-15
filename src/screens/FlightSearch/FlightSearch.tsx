import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { useToast } from '../../components/ui/toast';
import { 
  SearchIcon, 
  PlaneIcon, 
  CalendarIcon, 
  ClockIcon,
  MapPinIcon,
  ArrowRightIcon,
  FilterIcon
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

interface Flight {
  id: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  aircraft: string;
  availableSeats: number;
  status: string;
  price?: number;
}

interface Airport {
  id: string;
  code: string;
  name: string;
  city: string;
}

export const FlightSearch: React.FC = () => {
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1,
    class: 'ECONOMY'
  });
  const [flights, setFlights] = useState<Flight[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    loadAirports();
  }, []);

  const loadAirports = async () => {
    try {
      const data = await apiService.getAirports();
      setAirports(data || []);
    } catch (error) {
      showToast('Failed to load airports', 'error');
    }
  };

  const handleSearch = async () => {
    if (!searchParams.from || !searchParams.to || !searchParams.date) {
      showToast('Please fill in all required fields', 'warning');
      return;
    }

    setSearching(true);
    try {
      const data = await apiService.searchFlights(
        searchParams.from,
        searchParams.to,
        searchParams.date
      );
      setFlights(data || []);
      if (data?.length === 0) {
        showToast('No flights found for your search criteria', 'info');
      }
    } catch (error) {
      showToast('Failed to search flights', 'error');
    } finally {
      setSearching(false);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const calculateDuration = (departure: string, arrival: string) => {
    const diff = new Date(arrival).getTime() - new Date(departure).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Flights</h1>
          <p className="text-gray-600">Find and book your perfect flight</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <SearchIcon className="w-5 h-5" />
              Flight Search
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <Select value={searchParams.from} onValueChange={(value) => 
                  setSearchParams(prev => ({ ...prev, from: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select departure" />
                  </SelectTrigger>
                  <SelectContent>
                    {airports.map((airport) => (
                      <SelectItem key={airport.id} value={airport.id}>
                        {airport.code} - {airport.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <Select value={searchParams.to} onValueChange={(value) => 
                  setSearchParams(prev => ({ ...prev, to: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {airports.map((airport) => (
                      <SelectItem key={airport.id} value={airport.id}>
                        {airport.code} - {airport.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <Input
                  type="date"
                  value={searchParams.date}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                <Select value={searchParams.passengers.toString()} onValueChange={(value) => 
                  setSearchParams(prev => ({ ...prev, passengers: parseInt(value) }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  disabled={searching}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  {searching ? 'Searching...' : 'Search Flights'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Flight Results */}
        {flights.length > 0 && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <PlaneIcon className="w-5 h-5" />
                  Available Flights ({flights.length})
                </span>
                <Button variant="outline" size="sm">
                  <FilterIcon className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flights.map((flight) => (
                  <div
                    key={flight.id}
                    className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-6 mb-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">
                              {formatTime(flight.departureTime)}
                            </p>
                            <p className="text-sm text-gray-600">{flight.departure}</p>
                            <p className="text-xs text-gray-500">{formatDate(flight.departureTime)}</p>
                          </div>
                          
                          <div className="flex-1 flex items-center justify-center">
                            <div className="flex items-center gap-2 text-gray-500">
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              <div className="flex-1 h-px bg-gray-300"></div>
                              <PlaneIcon className="w-4 h-4" />
                              <div className="flex-1 h-px bg-gray-300"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">
                              {formatTime(flight.arrivalTime)}
                            </p>
                            <p className="text-sm text-gray-600">{flight.arrival}</p>
                            <p className="text-xs text-gray-500">{formatDate(flight.arrivalTime)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            {calculateDuration(flight.departureTime, flight.arrivalTime)}
                          </span>
                          <span>Flight {flight.flightNumber}</span>
                          <span>{flight.aircraft}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            flight.status === 'SCHEDULED' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {flight.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right ml-6">
                        <p className="text-2xl font-bold text-blue-600 mb-2">
                          ${flight.price || 299}
                        </p>
                        <p className="text-sm text-gray-600 mb-3">
                          {flight.availableSeats} seats left
                        </p>
                        <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                          Select Flight
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Results */}
        {!searching && flights.length === 0 && searchParams.from && (
          <Card className="shadow-lg">
            <CardContent className="text-center py-12">
              <PlaneIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No flights found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or selecting different dates
              </p>
              <Button variant="outline" onClick={() => setSearchParams({
                from: '', to: '', date: '', passengers: 1, class: 'ECONOMY'
              })}>
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};