import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  status: string;
}

const Flights: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [flights] = useState<Flight[]>([
    {
      id: '1',
      flightNumber: 'AA123',
      origin: 'New York',
      destination: 'London',
      departureTime: '2024-02-20 10:00',
      arrivalTime: '2024-02-20 22:00',
      status: 'On Time',
    },
    {
      id: '2',
      flightNumber: 'BA456',
      origin: 'London',
      destination: 'Paris',
      departureTime: '2024-02-20 14:30',
      arrivalTime: '2024-02-20 16:30',
      status: 'Delayed',
    },
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Flights</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Flight
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flight Number</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Arrival Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flights.map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>{flight.flightNumber}</TableCell>
                <TableCell>{flight.origin}</TableCell>
                <TableCell>{flight.destination}</TableCell>
                <TableCell>{flight.departureTime}</TableCell>
                <TableCell>{flight.arrivalTime}</TableCell>
                <TableCell>{flight.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Flight</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Flight Number"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Origin"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Destination"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Departure Time"
            type="datetime-local"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Arrival Time"
            type="datetime-local"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} variant="contained">
            Add Flight
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Flights; 