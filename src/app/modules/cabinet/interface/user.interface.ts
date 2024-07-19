export interface IUserInfo {
  chineseAddress: string;
  city: string;
  clientCode: string;
  fullName: string;
  id: number;
  phoneNumber: string;
  email: string;
}

export interface IEditUserInfo {
  city?: string;
  fullName?: string | null;
  phoneNumber?: string | null;
}
