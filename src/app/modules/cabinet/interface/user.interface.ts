export interface IUserInfo {
  amountToPay: number;
  bonuses: number;
  cameFrom: {
    bonuses: number;
    fullName: string;
    id: number;
  };
  chineseAddress: string;
  city: string;
  clientCode: string;
  email: string;
  fullName: string;
  id: number;
  phoneNumber: string;
}

export interface IEditUserInfo {
  city?: string;
  fullName?: string | null;
  phoneNumber?: string | null;
}
