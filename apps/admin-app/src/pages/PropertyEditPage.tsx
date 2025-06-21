import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { mockProperties } from '../lib/mock-data';

export default function PropertyEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const property = mockProperties.find((p) => p.id === id) || mockProperties[0];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: property?.title || '',
    description: property?.description || '',
    category: property?.category || '',
    price: property?.price || '',
    currency: property?.currency || 'USD',
    isActive: property?.status === 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/properties/${id}`);
    }, 1000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={() => navigate(`/properties/${id}`)}>
          <ArrowLeft size={20} />
        </IconButton>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Edit Property
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Update property information.
          </Typography>
        </Box>
      </Box>

      <Card>
        <Box component="form" onSubmit={handleSubmit}>
          <CardHeader title="Property Information" subheader="Edit the property's details." />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Property Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                fullWidth
              />

              <TextField
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                multiline
                rows={4}
                required
                fullWidth
              />

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    label="Category"
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="sports">Sports</MenuItem>
                    <MenuItem value="tools">Tools</MenuItem>
                    <MenuItem value="vehicles">Vehicles</MenuItem>
                    <MenuItem value="furniture">Furniture</MenuItem>
                  </Select>
                </FormControl>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    label="Price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    sx={{ flex: 2 }}
                  />
                  <FormControl sx={{ flex: 1 }}>
                    <InputLabel>Currency</InputLabel>
                    <Select
                      value={formData.currency}
                      label="Currency"
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    >
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="EUR">EUR</MenuItem>
                      <MenuItem value="GBP">GBP</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                }
                label="Active Property"
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="text" type="button" onClick={() => navigate(`/properties/${id}`)}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
