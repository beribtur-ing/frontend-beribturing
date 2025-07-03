import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ColumnConfig, TableList } from '~/components/shared/TableList';
import { CustomPagination } from '~/components/shared/CustomPagination';
import { Title } from '~/components/shared/Title';
import { Filter } from '~/components/shared/Filter';
import { SearchBar } from '~/components/shared/SearchBar';
import { DeleteModal } from '~/components/shared/DeleteModal';
import { useRentalRecordsPaginated } from '~/hooks/rental/useRentalRecordsPaginated';

export default function DashboardRentalsPage() {
  //
  const {
    rentalRecords,
    rentalRecordsAreLoading,
    offset,
    total,
    limit,
    searchQuery,
    changePageLimit,
    changeCurrentPage,
    changeSearchProperties,
    fetchByNewQuery,
  } = useRentalRecordsPaginated();


  const columns: ColumnConfig<any>[] = [
    {
      field: 'name', title: 'Customer',
      cell: (item) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold">{item.lendee.name}</span>
          <span className="text-gray-500 text-sm">({item.lendee.phoneNumber})</span>
        </div>
      ),
    },
    {
      title: 'Product',
      cell: item => (
        <div>
          <span className="font-semibold">{item.productRentalRecordRdo.title}</span>
          <span className="text-gray-500 text-sm">(Category: {item.productRentalRecordRdo.name})</span>
        </div>
      ),
    },
    {
      title: 'Product Variant',
      cell: item => (
        <div>
          <span className="font-semibold">{item.productRentalRecordRdo.model}</span>
          <span
            className="text-gray-500 text-sm">({item.productRentalRecordRdo.amount} {item.productRentalRecordRdo.currency})</span>
        </div>
      ),
    },
    {
      field: 'status',
      title: 'Status',
      cell: (item) => {
        const statusColors: Record<string, string> = {
          Cancelled: 'bg-yellow-100 text-yellow-800',
          Overdue: 'bg-blue-100 text-blue-800',
          Active: 'bg-green-100 text-green-800',
          Completed: 'bg-gray-100 text-gray-800',
        };
        return <span className={`px-2 py-1 rounded-[4px] ${statusColors[item.status]}`}>{item.status}</span>;
      },
    },
    {
      'title': 'Actions',
      cell: (item) => {
        //eye button
        return (
          <div className="flex gap-2">
            <Link
              to={`/dashboard/rentals/${item.id}`}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
            >
              View
            </Link>
          </div>
        );
      },
    },
  ];

  const statusOptions = [
    { id: 'All', name: 'All' },
    { id: 'Active', name: 'Active' },
    { id: 'Completed', name: 'Completed' },
    { id: 'Cancelled', name: 'Cancelled' },
    { id: 'Overdue', name: 'Overdue' },
  ];

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (rentalRecordsAreLoading) {
      return (
          <div className="animate-pulse">
              <div className="bg-white rounded-lg shadow h-96"></div>
          </div>
      );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-4 sm:gap-0">
        <Title title="Rental"/>
        <Link
          to={`/dashboard/rentals/calendar`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center sm:text-left"
        >
          Calendar View
        </Link>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          <Filter label="Status" value={searchQuery.status} values={statusOptions} onChange={(value) => {
            const statusValue = value === 'All' ? undefined : value;
            changeSearchProperties('status', statusValue);
          }}/>
          <SearchBar placeholder="Search..." onSearch={(value) => {
            fetchByNewQuery('searchKeyword', value);
          }}/>
        </div>
      </div>

      <TableList
        data={rentalRecords}
        columns={columns}
        // onEdit={(item) => alert(`Edit: ${item.name}`)}
        // onDelete={(item) => setShowDeleteModal(true)}
      />
      <CustomPagination
        offset={offset}
        limit={limit}
        total={total}
        onChange={changeCurrentPage}
        onLimitChange={changePageLimit}
      />

      <DeleteModal
        title="Are you sure you want to delete this item?"
        showModal={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={() => {
        }}
        deleteIsLoading={false}
      />
    </div>
  );
}
