import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { Reservation } from "../../../lib/types";
import { PlaceholderImage } from "~/assets";

export default function DashboardRequestDetailsPage() {
  const navigate = useNavigate();
  const { id, locale } = useParams();
  const [request, setRequest] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/reservations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRequest(data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load request");
        navigate(`/${locale}/dashboard/requests`);
      });
  }, [id, navigate, locale]);

  const handleApprove = async () => {
    try {
      const response = await fetch(`/api/reservations/${id}/approve`, {
        method: "POST",
      });

      if (response.ok && request) {
        setRequest({ ...request, status: "CONFIRMED" });
      }
    } catch (error) {
      alert("Failed to approve request");
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch(`/api/reservations/${id}/reject`, {
        method: "POST",
      });

      if (response.ok && request) {
        setRequest({ ...request, status: "CANCELLED" });
      }
    } catch (error) {
      alert("Failed to reject request");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateDays = (start: Date, end: Date) => {
    const diffTime = Math.abs(new Date(end).getTime() - new Date(start).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="bg-white rounded-lg shadow p-6 h-96"></div>
      </div>
    );
  }

  if (!request) {
    return <div>Request not found</div>;
  }

  const days = calculateDays(request.period.startDate, request.period.endDate);
  const totalCost = days * request.productVariant.price.daily;

  return (
    <div>
      <div className="mb-8">
        <Link
          to={`/${locale}/dashboard/requests`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back to Requests
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reservation Request</h1>
            <p className="text-gray-600">Request ID: {request.id}</p>
          </div>
          <span
            className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(request.status)}`}
          >
            {request.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="text-gray-900">{request.requester.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone Number</label>
              <p className="text-gray-900">{request.requester.phoneNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Request Date</label>
              <p className="text-gray-900">{formatDate(request.createdAt)}</p>
            </div>
            {request.note && (
              <div>
                <label className="text-sm font-medium text-gray-500">Customer Note</label>
                <p className="text-gray-900">{request.note}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Item Details</h2>
          <div className="flex space-x-4 mb-4">
            <img
              src={request.productVariant.images[0]?.url || PlaceholderImage}
              alt={`${request.productVariant.brand} ${request.productVariant.model}`}
              width={100}
              height={100}
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                {request.productVariant.brand} {request.productVariant.model}
              </h3>
              <p className="text-gray-600">
                {request.productVariant.color} • {request.productVariant.size}
              </p>
              <p className="text-gray-600">Material: {request.productVariant.material}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Rental Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500">Start Date</label>
            <p className="text-gray-900">{formatDate(request.period.startDate)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">End Date</label>
            <p className="text-gray-900">{formatDate(request.period.endDate)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Duration</label>
            <p className="text-gray-900">{days} days</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Total Cost</label>
            <p className="text-gray-900 font-semibold">${totalCost.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Pricing Breakdown</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Daily rate:</span>
              <span>${request.productVariant.price.daily}/day</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span>{days} days</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {request.status === "PENDING" && (
          <div className="mt-6 pt-6 border-t border-gray-200 flex space-x-4">
            <button onClick={handleApprove} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Approve Request
            </button>
            <button onClick={handleReject} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Reject Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
}