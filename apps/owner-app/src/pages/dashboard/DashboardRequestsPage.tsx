import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReservationsPaginated } from '~/hooks';
import { ReservationStatus } from '@beribturing/api-stub';

export default function DashboardRequestsPage() {
  //

  const { reservations, refetchReservations, searchQuery, isLoading, fetchByNewQuery } = useReservationsPaginated();
  const handleApprove = async (id: string) => {
    // try {
    //   const response = await fetch(`/api/reservations/${id}/approve`, {
    //     method: 'POST',
    //   });
    //
    //   if (response.ok) {
    //     setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: 'CONFIRMED' as const } : req)));
    //   }
    // } catch (error) {
    //   alert('Failed to approve request');
    // }
  };

  // const handleReject = async (id: string) => {
  //   try {
  //     const response = await fetch(`/api/reservations/${id}/reject`, {
  //       method: 'POST',
  //     });
  //
  //     if (response.ok) {
  //       setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: 'CANCELLED' as const } : req)));
  //     }
  //   } catch (error) {
  //     alert('Failed to reject request');
  //   }
  // };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="bg-white rounded-lg shadow h-96"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Reservation Requests</h1>
        <p className="text-sm md:text-base text-gray-600">Manage incoming reservation requests</p>
      </div>

      <div className="mb-6 overflow-x-auto">
        <div className="flex flex-wrap gap-2">
          {(['all', ...Object.values(ReservationStatus)] as const).map((status) => (
            <button
              key={String(status)}
              onClick={() => fetchByNewQuery('status', status === 'all' ? undefined : (status as string))}
              className={`px-3 py-2 text-xs md:text-sm font-medium rounded-lg capitalize ${
                searchQuery.status === status ||searchQuery.status === undefined && status === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {String(status)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.requester.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                      {request.requester.phoneNumber}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {request.productVariant.brand} {request.productVariant.model}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                      {request.productVariant.color} • {request.productVariant.size}
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(request.period.startDate)} - {formatDate(request.period.endDate)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        request.status,
                      )}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs md:text-sm font-medium">
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <Link to={`/dashboard/requests/${request.id}`} className="text-blue-600 hover:text-blue-900">
                        View
                      </Link>
                      {request.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                          <button onClick={()=>{}} className="text-red-600 hover:text-red-900">
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {reservations.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
          <p className="text-gray-600">
            {searchQuery.status === 'all' ? "You don't have any requests yet." : `No ${searchQuery.status} requests at the moment.`}
          </p>
        </div>
      )}
    </div>
  );
}
