'use client';

import React from 'react';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

interface DeleteModalProps {
  title?: string;
  onDelete: () => void;
  children?: React.ReactNode;
  showModal: boolean;
  onClose: () => void;
  deleteIsLoading?: boolean;
}

export const DeleteModal = ({
  title = 'Are you sure you want to delete this?',
  onDelete,
  children,
  showModal,
  onClose,
  deleteIsLoading = false,
}: DeleteModalProps) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <>
      <Dialog open={showModal} onClose={onClose} maxWidth="sm">
        <DialogContent className="p-0">
          <div className="relative p-6">
            {/* Warning icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <WarningIcon className="w-8 h-8 text-red-600" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">{title}</h3>

            {/* Buttons */}
            <div className="flex gap-3 w-full">
              <button
                type="button"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={onClose}
                disabled={deleteIsLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 px-4 py-2 border border-red-600 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                onClick={handleDelete}
                disabled={deleteIsLoading}
              >
                {deleteIsLoading ? (
                  <>
                    <CircularProgress size="14px" sx={{ color: 'white' }} className="mr-1.5" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Trigger element */}
      {children && <div className="inline-block">{children}</div>}
    </>
  );
};
