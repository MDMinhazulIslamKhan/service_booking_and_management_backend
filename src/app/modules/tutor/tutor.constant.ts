export type Gender = 'male' | 'female' | 'others';

export const tutorGender: Gender[] = ['male', 'female', 'others'];

export type Medium = 'bangla' | 'english' | 'both';

export const tutorMedium: Medium[] = ['bangla', 'english', 'both'];

export type Group = 'science' | 'commerce' | 'arts';

export const tutorGroup: Group[] = ['science', 'commerce', 'arts'];

export type CurrentStatus = 'available' | 'unavailable';

export const tutorCurrentStatus: CurrentStatus[] = ['available', 'unavailable'];

export type Status = 'request' | 'processing' | 'confirm' | 'disapproved';

export const statusInfo: Status[] = [
  'request',
  'processing',
  'confirm',
  'disapproved',
];
export type PreferredClass =
  | '1-5'
  | '6-8'
  | '9-10'
  | '11-12'
  | 'honours'
  | 'IELTS';

export const tutorPreferredClass: PreferredClass[] = [
  '1-5',
  '6-8',
  '9-10',
  '11-12',
  'honours',
  'IELTS',
];
