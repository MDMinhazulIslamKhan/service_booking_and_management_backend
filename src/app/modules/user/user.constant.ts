export type Role = 'super_admin' | 'admin' | 'user';

export const userRoles: Role[] = ['super_admin', 'admin', 'user'];

export type Department = 'manage_tutor' | 'manage_user' | 'both';

export const adminDepartment: Department[] = [
  'manage_tutor',
  'manage_user',
  'both',
];

export type Status = 'request' | 'processing' | 'confirm' | 'disapproved';

export const statusInfo: Status[] = [
  'request',
  'processing',
  'confirm',
  'disapproved',
];
