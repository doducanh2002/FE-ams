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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface Staff {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: string;
}

interface StaffFormData {
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: string;
}

const initialFormData: StaffFormData = {
  name: '',
  position: '',
  department: '',
  email: '',
  phone: '',
  status: '',
};

const Staff: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [staff, setStaff] = useState<Staff[]>([
    {
      id: '1',
      name: 'Robert Johnson',
      position: 'Pilot',
      department: 'Flight Operations',
      email: 'robert.j@airport.com',
      phone: '+1 234-567-8901',
      status: 'On Duty',
    },
    {
      id: '2',
      name: 'Sarah Williams',
      position: 'Ground Staff',
      department: 'Customer Service',
      email: 'sarah.w@airport.com',
      phone: '+1 234-567-8902',
      status: 'On Leave',
    },
  ]);
  const [formData, setFormData] = useState<StaffFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
    setFormData(initialFormData);
    setEditingId(null);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialFormData);
    setEditingId(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (editingId) {
      setStaff(prev => prev.map(member => 
        member.id === editingId ? { ...member, ...formData } : member
      ));
    } else {
      const newStaff: Staff = {
        id: Date.now().toString(),
        ...formData
      };
      setStaff(prev => [...prev, newStaff]);
    }
    handleClose();
  };

  const handleEdit = (id: string) => {
    const staffToEdit = staff.find(member => member.id === id);
    if (staffToEdit) {
      setFormData({
        name: staffToEdit.name,
        position: staffToEdit.position,
        department: staffToEdit.department,
        email: staffToEdit.email,
        phone: staffToEdit.phone,
        status: staffToEdit.status,
      });
      setEditingId(id);
      setOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    setStaff(prev => prev.filter(member => member.id !== id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Staff</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Staff
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staff.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.position}</TableCell>
                <TableCell>{member.department}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>{member.status}</TableCell>
                <TableCell>
                  <IconButton color="primary" size="small" onClick={() => handleEdit(member.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" size="small" onClick={() => handleDelete(member.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingId ? 'Edit Staff Member' : 'Add New Staff Member'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="position"
            label="Position"
            fullWidth
            variant="outlined"
            value={formData.position}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              label="Department"
              value={formData.department}
              onChange={handleSelectChange}
            >
              <MenuItem value="Flight Operations">Flight Operations</MenuItem>
              <MenuItem value="Customer Service">Customer Service</MenuItem>
              <MenuItem value="Maintenance">Maintenance</MenuItem>
              <MenuItem value="Security">Security</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            fullWidth
            variant="outlined"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              label="Status"
              value={formData.status}
              onChange={handleSelectChange}
            >
              <MenuItem value="On Duty">On Duty</MenuItem>
              <MenuItem value="Off Duty">Off Duty</MenuItem>
              <MenuItem value="On Leave">On Leave</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingId ? 'Save Changes' : 'Add Staff'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Staff; 