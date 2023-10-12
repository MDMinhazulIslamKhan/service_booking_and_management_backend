export const paginationFields = ['page', 'limit', 'sortBy', 'sortOrder'];

export type Status = 'request' | 'processing' | 'confirm' | 'disapproved';

export const statusInfo: Status[] = [
  'request',
  'processing',
  'confirm',
  'disapproved',
];
