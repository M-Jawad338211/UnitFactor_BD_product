'use client';
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Employee } from '../../../constants/types';

const Row: React.FC<{
  row: Employee;
  onDelete: (id: number) => void;
  onView: (employee: Employee) => void;
}> = ({ row, onDelete, onView }) => (
  <TableRow>
    <TableCell align="center">{row.ID}</TableCell>
    <TableCell align="center">{row.Name}</TableCell>
    <TableCell align="center">{row.Job_Title}</TableCell>
    <TableCell align="center">{row.Email}</TableCell>
    <TableCell align="center">{row.Phone}</TableCell>

    <TableCell align="center">
      <IconButton onClick={() => onView(row)} color="primary">
        <VisibilityIcon />
      </IconButton>
      <IconButton onClick={() => onDelete(row.ID)} color="error">
        <DeleteIcon />
      </IconButton>
    </TableCell>
  </TableRow>
);

const DevelopersTableData: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('employees') || '[]');
    setData(storedData);
  }, []);

  const handleDelete = (id: number) => {
    const updatedData = data.filter((row) => row.ID !== id);
    setData(updatedData);
    localStorage.setItem('employees', JSON.stringify(updatedData));
  };

  const handleView = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleClose = () => {
    setSelectedEmployee(null);
  };

  const filteredRows = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Box>
      <TextField
        label="Search"
        variant="outlined"
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
      />
      <TableContainer component={Paper}>
        <Table aria-label="employee table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#eeee' }}>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Job Title</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Phone</TableCell>

              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <Row key={row.ID} row={row} onDelete={handleDelete} onView={handleView} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedEmployee && (
    <Dialog open={!!selectedEmployee} onClose={handleClose} fullWidth>
  <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>
    Employee Details
  </DialogTitle>
  <DialogContent
    sx={{
      p: 4,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,  
      borderRadius: 2,
    }}
  >
    {selectedEmployee && (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="ID"
            value={selectedEmployee.ID}
            InputProps={{ readOnly: true }}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Name"
            value={selectedEmployee.Name}
            InputProps={{ readOnly: true }}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Job Title"
            value={selectedEmployee.Job_Title}
            InputProps={{ readOnly: true }}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Department"
            value={selectedEmployee.Department}
            InputProps={{ readOnly: true }}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        {selectedEmployee.Date_of_Birth && (
          <Grid item xs={6}>
            <TextField
              label="Date of Birth"
              value={selectedEmployee.Date_of_Birth}
              InputProps={{ readOnly: true }}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
        )}
        {selectedEmployee.Email && (
          <Grid item xs={6}>
            <TextField
              label="Email"
              value={selectedEmployee.Email}
              InputProps={{ readOnly: true }}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
        )}
        {selectedEmployee.Phone && (
          <Grid item xs={6}>
            <TextField
              label="Phone"
              value={selectedEmployee.Phone}
              InputProps={{ readOnly: true }}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
        )}
           {selectedEmployee.Gender && (
          <Grid item xs={6}>
            <TextField
              label="Gender"
              value={selectedEmployee.Gender}
              InputProps={{ readOnly: true }}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
        )}
      </Grid>
    )}
  </DialogContent>
  <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
    <Button onClick={handleClose} variant="contained" color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>
      )}
    </Box>
  );
};

export default DevelopersTableData;
