import { Card, CardContent, CardMedia, Typography, Button, Box, Chip } from '@mui/material';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ProductRdo, ProductVariantRdo } from '@beribturing/api-stub';

interface PropertyCardProps {
  product: ProductRdo & { variantRdos: ProductVariantRdo[] };
  onEdit: () => void;
  onDelete: () => void;
}

export function PropertyCard({ product, onEdit, onDelete }: PropertyCardProps) {
  const mainVariant = product.variantRdos[0];
  const mainImage = mainVariant?.images?.[0]?.url || '/placeholder.jpg';
  const price = mainVariant?.variant.price?.daily || 0;
  const isActive = mainVariant?.variant.isActive !== false;

  return (
        <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardMedia
                component="img"
                height="200"
                image={mainImage}
                alt={product.title}
                className="h-48 object-cover"
            />
            <CardContent className="p-4">
                <Box className="flex justify-between items-start mb-2">
                    <Typography variant="h6" className="font-semibold text-gray-900 line-clamp-1">
                        {product.product.title}
                    </Typography>
                    <Chip
                        label={isActive ? 'Active' : 'Inactive'}
                        size="small"
                        color={isActive ? 'success' : 'default'}
                        variant="outlined"
                    />
                </Box>

                <Typography variant="body2" className="text-gray-600 mb-3 line-clamp-2">
                    {product.product.description}
                </Typography>

                <Box className="flex justify-between items-center mb-3">
                    <Typography variant="body2" className="text-gray-500">
                        Category: {product.category?.name || 'Uncategorized'}
                    </Typography>
                    <Typography variant="h6" className="font-bold text-blue-600">
                        ${price}/day
                    </Typography>
                </Box>

                <Box className="flex space-x-2">
                    <Button
                        size="small"
                        startIcon={<PencilIcon className="w-4 h-4" />}
                        onClick={onEdit}
                        variant="outlined"
                        className="flex-1"
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        startIcon={<TrashIcon className="w-4 h-4" />}
                        onClick={onDelete}
                        variant="outlined"
                        color="error"
                        className="flex-1"
                    >
                        Delete
                    </Button>
                </Box>
            </CardContent>
        </Card>
  );
}