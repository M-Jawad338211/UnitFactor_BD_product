'use client';
import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import DevelopersTableData from './DevelopersTable';
import AddEmployee from './AddEmployee';

import { Employee } from '../../../constants/types';

const DevelopersIndex: React.FC = () => {
  const [showAddEmployee, setShowAddEmployee] = useState<boolean>(false);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {

      setEmployees(JSON.parse(storedEmployees));
      console.log(storedEmployees)
    }
  }, []);

  const handleAddEmployee = (newEmployee: Omit<Employee, 'ID'>) => {
    const updatedEmployees: Employee[] = [
      ...employees,
      { ...newEmployee, ID: employees.length + 1 },
    ];
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    setShowAddEmployee(false);
  };

  return (
    <Box>
      {!showAddEmployee ? (
        <>
          <Grid container alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs>
              <Typography variant="h4" sx={{ fontFamily: 'serif', fontWeight: 'bold' }}>
                Developers
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowAddEmployee(true)}
              >
                Add New Developers
              </Button>
            </Grid>
          </Grid>
          <DevelopersTableData  />
        </>
      ) : (
        <AddEmployee
          onAddEmployee={handleAddEmployee}
          onCancel={() => setShowAddEmployee(false)}
        />
      )}
    </Box>
  );
};

export default DevelopersIndex;
