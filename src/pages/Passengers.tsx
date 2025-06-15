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
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface Passenger {
  id: string;
  name: string;
  passportNumber: string;
  nationality: string;
  flightNumber: string;
  seatNumber: string;
}

const Passengers: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [passengers] = useState<Passenger[]>([
    {
      id: '1',
      name: 'John Doe',
      passportNumber: 'P123456',
      nationality: 'USA',
      flightNumber: 'AA123',
      seatNumber: '12A',
    },
    {
      id: '2',
      name: 'Jane Smith',
      passportNumber: 'P789012',
      nationality: 'UK',
      flightNumber: 'BA456',
      seatNumber: '15B',
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
        <Typography variant="h4">Passengers</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Passenger
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Passport Number</TableCell>
              <TableCell>Nationality</TableCell>
              <TableCell>Flight Number</TableCell>
              <TableCell>Seat Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {passengers.map((passenger) => (
              <TableRow key={passenger.id}>
                <TableCell>{passenger.name}</TableCell>
                <TableCell>{passenger.passportNumber}</TableCell>
                <TableCell>{passenger.nationality}</TableCell>
                <TableCell>{passenger.flightNumber}</TableCell>
                <TableCell>{passenger.seatNumber}</TableCell>
                <TableCell>
                  <IconButton color="primary" size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Passenger</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Passport Number"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Nationality"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Flight Number"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Seat Number"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} variant="contained">
            Add Passenger
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Passengers; 