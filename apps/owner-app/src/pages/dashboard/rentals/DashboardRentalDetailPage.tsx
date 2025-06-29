import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRentalRecord } from '../../../hooks/rental/useRentalRecord';
import { PlaceholderImage } from '~/assets';

export default function DashboardRentalDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { rentalRecord, isLoading } = useRentalRecord(id || '');

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateDays = (start: string | Date, end: string | Date) => {
    const diffTime = Math.abs(new Date(end).getTime() - new Date(start).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="bg-white rounded-lg shadow p-6 h-96"></div>
      </div>
    );
  }

  if (!rentalRecord) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Rental not found</h1>
        <p className="text-gray-600">The rental record could not be loaded or does not exist.</p>
        <Link to={`/dashboard/rentals`} className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-4">
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back to Rentals
        </Link>
      </div>
    );
  }

  const days = rentalRecord.period?.startDateTime && rentalRecord.period?.endDateTime
    ? calculateDays(rentalRecord.period.startDateTime, rentalRecord.period.endDateTime)
    : 0;
  const totalCost = rentalRecord.fee?.amount || 0;

  return (
    <div>
      <div className="mb-8">
        <Link
          to={`/dashboard/rentals`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back to Rentals
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rental Details</h1>
            <p className="text-gray-600">Rental ID: {rentalRecord.id}</p>
          </div>
          <span
            className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(rentalRecord.status)}`}
          >
            {rentalRecord.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="text-gray-900">{rentalRecord.lendee?.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone Number</label>
              <p className="text-gray-900">{rentalRecord.lendee?.phoneNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Start Date</label>
              <p className="text-gray-900">
                {rentalRecord.period?.startDateTime ? formatDate(rentalRecord.period.startDateTime) : 'Not specified'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">End Date</label>
              <p className="text-gray-900">
                {rentalRecord.period?.endDateTime ? formatDate(rentalRecord.period.endDateTime) : 'Not specified'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h2>
          <div className="flex space-x-4 mb-4">
            <img
              src={PlaceholderImage}
              alt={rentalRecord.productRentalRecordRdo?.title || 'Product'}
              width={100}
              height={100}
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                {rentalRecord.productRentalRecordRdo?.title}
              </h3>
              <p className="text-gray-600">
                Category: {rentalRecord.productRentalRecordRdo?.name}
              </p>
              <p className="text-gray-600">
                Variant: {rentalRecord.productRentalRecordRdo?.model}
              </p>
              <p className="text-gray-600">
                Price: {rentalRecord.productRentalRecordRdo?.amount} {rentalRecord.productRentalRecordRdo?.currency}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Rental Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500">Duration</label>
            <p className="text-gray-900">{days} days</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Total Cost</label>
            <p className="text-gray-900 font-semibold">{totalCost.toFixed(2)} {rentalRecord.fee?.currency}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Status</label>
            <p className="text-gray-900">{rentalRecord.status}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Rented At</label>
            <p className="text-gray-900">
              {rentalRecord.rentedAt ? formatDate(rentalRecord.rentedAt) : 'Not available'}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Pricing Information</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Daily rate:</span>
              <span>{rentalRecord.productRentalRecordRdo?.amount || 0} {rentalRecord.productRentalRecordRdo?.currency}/day</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span>{days} days</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>{totalCost.toFixed(2)} {rentalRecord.fee?.currency}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}