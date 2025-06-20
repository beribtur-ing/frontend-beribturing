import { PropertyTable } from "../components/admin/property-table";
import { PropertyFilters } from "../components/admin/property-filters";
import { Button, Typography, Box } from "@mui/material";
import { Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function PropertiesPage() {
  const { locale } = useParams();

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, justifyContent: 'space-between', gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            Property Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Review, approve, and manage property listings.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          component={Link} 
          to={`/${locale}/properties/create`}
          startIcon={<Plus size={16} />}
        >
          Add Property
        </Button>
      </Box>

      <PropertyFilters />
      <PropertyTable />
    </Box>
  );
}
