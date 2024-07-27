// constants/CustomTable.tsx
'use client';

import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  IconButton,
  Collapse,
  Typography,
  Button
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Header, TableData, CustomTableProps, LeadData } from './types';

const Row = <T extends TableData>({ row }: { row: T }) => {
  const [open, setOpen] = useState(false);

  const isLeadData = (data: any): data is LeadData => {
    return 'description' in data && 'resume' in data;
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {Object.values(row).map((value, index) => (
          <TableCell key={index}>{value.toString()}</TableCell>
        ))}
      </TableRow>
      {isLeadData(row) && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={Object.keys(row).length + 1}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Description
                </Typography>
                <Typography dangerouslySetInnerHTML={{ __html: row.description }}></Typography>
                {row.resume && (
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Download Resume
                  </Button>
                )}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

const CustomTable = <T extends TableData>({
  headers,
  data,
  searchPlaceholder = "Search..."
}: CustomTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Box>
      <TextField
        variant="outlined"
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2 }}
      />
      <TableContainer component={Paper}>
        <Table aria-label="custom table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#eeee' }}>
              <TableCell />
              {headers.map((header, index) => (
                <TableCell key={index} align="center" sx={{ fontWeight: 'bold' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomTable;