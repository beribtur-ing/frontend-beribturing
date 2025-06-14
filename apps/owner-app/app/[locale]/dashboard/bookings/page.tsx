'use client';

import { useEffect, useState } from 'react';
import type { Reservation, RentalRecord } from '@/lib/types';
import Link from 'next/link';
import { TableList } from '@/components/shared/TableList';
import { CustomPagination } from '@/components/shared/CustomPagination';
import { Title } from '@/components/shared/Title';
import { Filter } from '@/components/shared/Filter';
import { SearchBar } from '@/components/shared/SearchBar';

type BookingItem = (Reservation | RentalRecord) & { type: 'reservation' | 'rental' };

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'active' | 'completed'>('all');

  useEffect(() => {
    fetch('/api/bookings')
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      });
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    return booking.status.toLowerCase() === filter;
  });

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="bg-white rounded-lg shadow h-96"></div>
      </div>
    );
  }

  const initialData = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
    { id: 3, name: 'Carol Lee', email: 'carol@example.com', role: 'Viewer' },
    { id: 4, name: 'David Kim', email: 'david@example.com', role: 'Editor' },
    { id: 5, name: 'Eve Adams', email: 'eve@example.com', role: 'Viewer' },
  ];

  // 2. Column config
  const columns = [
    { field: 'name', title: 'Full Name' },
    { field: 'email', title: 'Email Address' },
    { field: 'role', title: 'Role' },
  ];

  const statusOptions = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Pending' },
    { id: 3, name: 'Confirmed' },
    { id: 4, name: 'Active' },
    { id: 5, name: 'Completed' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 md:mb-8 gap-4 sm:gap-0">
        <div>
          <Title title="Bookings" />
          <p className="text-sm md:text-base text-gray-600">Manage your rental bookings and reservations</p>
        </div>
        <Link
          href="/dashboard/bookings/calendar"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center sm:text-left"
        >
          Calendar View
        </Link>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {/*{['all', 'pending', 'confirmed', 'active', 'completed'].map((status) => (*/}
          {/*  <button*/}
          {/*    key={status}*/}
          {/*    onClick={() => setFilter(status as any)}*/}
          {/*    className={`px-3 py-2 text-xs md:text-sm font-medium rounded-lg capitalize ${*/}
          {/*      filter === status*/}
          {/*        ? 'bg-blue-600 text-white'*/}
          {/*        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'*/}
          {/*    }`}*/}
          {/*  >*/}
          {/*    {status}*/}
          {/*  </button>*/}
          {/*))}*/}
          <Filter label="Status" values={statusOptions} onChange={(value) => {}} />
          <SearchBar placeholder="Search..." onSearch={(value) => console.log('Searching for:', value)} />
        </div>
      </div>

      {/*<BookingTable bookings={filteredBookings} />*/}

      <TableList
        data={initialData}
        columns={columns as any}
        onEdit={(item) => alert(`Edit: ${item.name}`)}
        onDelete={(item) => alert(`Delete: ${item.name}`)}
      />
      <CustomPagination
        offset={0}
        limit={10}
        total={300}
        onChange={(newOffset) => {}}
        onLimitChange={(newLimit) => {}}
      />
    </div>
  );
}
