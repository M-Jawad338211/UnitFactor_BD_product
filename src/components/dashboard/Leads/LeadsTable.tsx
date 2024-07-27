'use client'
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, Box, IconButton, Typography, Button, TextField } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Lead, LeadsTableDataProps } from '../../../constants/types';

function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'green';
    case 'in progress':
      return 'orange';
    case 'rejected':
      return 'red';
    default:
      return 'black';
  }
}

const Row: React.FC<{ row: Lead }> = ({ row }) => {
  const [open, setOpen] = useState(false);

  const getResumeUrl = (resume: string | null): string | null => {
    if (resume) {
      return `/path/to/resumes/${resume}`;
    }
    return null;
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.ID}</TableCell>
        <TableCell align="center">{row.Job_Title}</TableCell>
        <TableCell align="center">{row.Lead}</TableCell>
        <TableCell align="center">{row.BD}</TableCell>
        <TableCell align="center">{row.Dev}</TableCell>
        <TableCell align="center" style={{
          color: getStatusColor(row.Status),
          borderRadius: '4px',
          textAlign: 'center',
          fontWeight: 'bold',
          padding: '4px',
          fontSize: '12px',
          width: '100px',
        }}>{row.Status}</TableCell>
        <TableCell align="center">{row.InterviewStage.join(', ')}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 3 }}>
              {row.resume && (
                <Box mt={2}>
                  <Typography variant="h6" gutterBottom component="div">Resume:</Typography>
                  <Button 
                    color="primary" 
                    href={getResumeUrl(row.resume) || '#'}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    disabled={!getResumeUrl(row.resume)}
                  >
                    View Resume
                  </Button>
                </Box>
              )}
              <Typography variant="h6" gutterBottom component="div">Description:</Typography>
              <Typography paragraph dangerouslySetInnerHTML={{ __html: row.description }}></Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const LeadsTableData: React.FC<LeadsTableDataProps> = ({ rows }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRows = rows.filter((row) =>
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
      />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#eeee' }}>
              <TableCell />
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Job Title</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Lead</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>BD</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Dev</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Interview Stage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <Row key={row.ID} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LeadsTableData;