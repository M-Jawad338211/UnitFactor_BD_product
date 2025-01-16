import React, { useState } from 'react';
import {
  Button,
  TextField,
  Box,
  Grid,
  IconButton,
  Avatar,
  Paper,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs, { Dayjs } from 'dayjs';
import { Employee } from '../../../constants/types';

interface AddEmployeeProps {
  onAddEmployee: (employee: Omit<Employee, 'ID'>) => void;
  onCancel: () => void;
}

const AddEmployee: React.FC<AddEmployeeProps> = ({ onAddEmployee, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Employee, 'ID'>>({
    Name: '',
    Job_Title: '',
    Department: '',
    Email: '',
    Phone: '',
    Profile_Picture: null,
    Date_of_Birth: '',
    Gender: '',
  });

  const [errors, setErrors] = useState({
    Name: false,
    Job_Title: false,
    Email: false,
    Phone: false,
    Department: false,
    Date_of_Birth: false,
    Gender: false,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name!]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name!]: false,
    }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFormData((prev) => ({
      ...prev,
      Date_of_Birth: date ? date.format('YYYY-MM-DD') : '',
    }));
    setErrors((prev) => ({
      ...prev,
      Date_of_Birth: false,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        Profile_Picture: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setFormData((prev) => ({
      ...prev,
      Profile_Picture: null,
    }));
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {
      Name: !formData.Name.trim(),
      Job_Title: !formData.Job_Title.trim(),
      Email: !formData.Email.trim(),
      Phone: !formData.Phone.trim(),
      Department: !formData.Department.trim(),
      Date_of_Birth: !formData.Date_of_Birth.trim(),
      Gender: !formData.Gender.trim(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    onAddEmployee(formData);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={onCancel} variant="contained">
          Back
        </Button>
      </Box>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, width: '100%', minHeight: 700, mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Add New Developer
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <label htmlFor="image-upload">
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Avatar
                    src={imagePreview || undefined}
                    alt="Profile Picture"
                    sx={{
                      width: 100,
                      height: 100,
                      backgroundColor: !imagePreview ? 'gray' : undefined,
                      cursor: 'pointer',
                    }}
                  >
                    {!imagePreview && <AccountCircleIcon sx={{ fontSize: 50, color: 'white' }} />}
                  </Avatar>
                  {imagePreview && (
                    <IconButton
                      onClick={handleImageRemove}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              </label>
              <input
                accept="image/*"
                id="image-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                error={errors.Name}
                helperText={errors.Name && 'This field is required'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={errors.Job_Title}>
                <InputLabel id="job-title-label">Job Title</InputLabel>
                <Select
                  labelId="job-title-label"
                  name="Job_Title"
                  value={formData.Job_Title}
                  onChange={handleChange}
                >
                  <MenuItem value="Front End Developer">Front End Developer</MenuItem>
                  <MenuItem value="Back End Developer">Back End Developer</MenuItem>
                  <MenuItem value="Full Stack Developer">Full Stack Developer</MenuItem>
                  <MenuItem value="UI/UX Designer">UI/UX Designer</MenuItem>
                </Select>
                {errors.Job_Title && <FormHelperText>This field is required</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Department"
                name="Department"
                value={formData.Department}
                onChange={handleChange}
                error={errors.Department}
                helperText={errors.Department && 'This field is required'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={errors.Gender}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {errors.Gender && <FormHelperText>This field is required</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
  <DatePicker
    label="Date of Birth"
    sx={{width:'100%'}}
    value={formData.Date_of_Birth ? dayjs(formData.Date_of_Birth) : null}
    onChange={handleDateChange}
    renderInput={(params : any) => (
      <TextField
        {...params}
        fullWidth
        error={errors.Date_of_Birth}
        helperText={errors.Date_of_Birth && 'This field is required'}
      />
      
    )}
  />
</Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                error={errors.Email}
                helperText={errors.Email && 'This field is required'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                name="Phone"
                value={formData.Phone}
                onChange={handleChange}
                error={errors.Phone}
                helperText={errors.Phone && 'This field is required'}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 10, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default AddEmployee;
