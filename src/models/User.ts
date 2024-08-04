export interface User {
  id: string;
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  gender: string;
  residence: string;
  photo?: string;
}

export interface NewOrUpdateUser {
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  gender: string;
  residence: string;
  photo?: string;
}
