import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Reservation, RentalRecord } from '../../../lib/types';
import { ColumnConfig, TableList } from '../../../components/shared/TableList';
import { CustomPagination } from '../../../components/shared/CustomPagination';
import { Title } from '../../../components/shared/Title';
import { Filter } from '../../../components/shared/Filter';
import { SearchBar } from '../../../components/shared/SearchBar';
import { DeleteModal } from '../../../components/shared/DeleteModal';

// type BookingItem = (Reservation | RentalRecord) & { type: 'reservation' | 'rental' };

interface BookingItem {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Pending' | 'Confirmed' | 'Active' | 'Completed';
}

export default function DashboardRentalsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'active' | 'completed'>('all');

  // useEffect(() => {
  //   fetch('/api/bookings')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setBookings(data);
  //       setLoading(false);
  //     });
  // }, []);

  // const filteredBookings = bookings.filter((booking) => {
  //   if (filter === 'all') return true;
  //   return booking.status.toLowerCase() === filter;
  // });

  const initialData: BookingItem[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Pending' },
    { id: 3, name: 'Carol Lee', email: 'carol@example.com', role: 'Viewer', status: 'Confirmed' },
    { id: 4, name: 'David Kim', email: 'david@example.com', role: 'Editor', status: 'Completed' },
    { id: 5, name: 'Eve Adams', email: 'eve@example.com', role: 'Viewer', status: 'Active' },
  ];

  // 2. Column config
  const columns: ColumnConfig<BookingItem>[] = [
    { field: 'name', title: 'Full Name' },
    { field: 'email', title: 'Email Address' },
    { field: 'role', title: 'Role' },
    {
      field: 'status',
      title: 'Status',
      cell: (item) => {
        const statusColors: Record<string, string> = {
          Pending: 'bg-yellow-100 text-yellow-800',
          Confirmed: 'bg-blue-100 text-blue-800',
          Active: 'bg-green-100 text-green-800',
          Completed: 'bg-gray-100 text-gray-800',
        };
        return <span className={`px-2 py-1 rounded-[4px] ${statusColors[item.status]}`}>{item.status}</span>;
      },
    },
  ];

  const statusOptions = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Active' },
    { id: 3, name: 'Completed' },
    { id: 4, name: 'Cancelled' },
    { id: 5, name: 'Overdue' },
  ];

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="bg-white rounded-lg shadow h-96"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-4 sm:gap-0">
        <Title title="Rental" />
        <Link
          to={`/dashboard/rentals/calendar`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center sm:text-left"
        >
          Calendar View
        </Link>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          <Filter label="Status" values={statusOptions} onChange={(value) => {}} />
          <SearchBar placeholder="Search..." onSearch={(value) => console.log('Searching for:', value)} />
        </div>
      </div>

      <TableList
        data={initialData}
        columns={columns}
        onEdit={(item) => alert(`Edit: ${item.name}`)}
        onDelete={(item) => setShowDeleteModal(true)}
      />
      <CustomPagination
        offset={0}
        limit={10}
        total={300}
        onChange={(newOffset) => {}}
        onLimitChange={(newLimit) => {}}
      />

      <DeleteModal
        title="Are you sure you want to delete this item?"
        showModal={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={() => {}}
        deleteIsLoading={false}
      />
    </div>
  );
}
