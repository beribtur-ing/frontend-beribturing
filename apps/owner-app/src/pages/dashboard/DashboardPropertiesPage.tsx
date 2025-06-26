import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { PropertyCard } from '~/components/dashboard/PropertyCard';
import { useProductRdos, useProductMutation } from '~/hooks';
import { ProductRdo } from '@beribturing/api-stub';
import { DeleteModal } from '~/components/shared/DeleteModal';

export default function DashboardPropertiesPage() {
  const { productRdos, refetch }: { productRdos: ProductRdo[]; refetch } = useProductRdos({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState('');
  const {
    mutation: { removeProduct },
  } = useProductMutation();

  const handleEdit = (productId: string) => {
    navigate(`/dashboard/properties/edit/${productId}`);
  };

  const handleDelete = (productId: string) => {
    removeProduct.mutateAsync(
      { productId },
      {
        onSuccess: () => {
          setShowDeleteModal(false);
          refetch();
        },
        onError: (err) => {
          console.error(err);
        },
      },
    );
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow h-64 md:h-80"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 md:mb-8 gap-4 sm:gap-0">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-sm md:text-base text-gray-600">Manage your rental listings</p>
        </div>
        <Link
          to={'/dashboard/properties/add'}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Property
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {productRdos.map((property) => (
          <PropertyCard
            key={property.product.id}
            product={property}
            onEdit={() => handleEdit(property.product.id)}
            onDelete={() => {
              setProductIdToDelete(property.product.id);
              setShowDeleteModal(true);
            }}
          />
        ))}
      </div>

      {productRdos.length === 0 && (
        <div className="text-center py-12">
          <BuildingOfficeIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties yet</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first rental property.</p>
          <Link
            to={'/dashboard/properties/add'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
          >
            Add Your First Property
          </Link>
        </div>
      )}
      {
        <DeleteModal
          onDelete={() => handleDelete(productIdToDelete)}
          showModal={showDeleteModal}
          onClose={handleCancelDelete}
        />
      }
    </div>
  );
}
