export interface IClient {
  amountToPay: number;
  bonuses: number;
  cameFrom: {
    bonuses: number;
    fullName: string;
    id: number;
  };
  chineseAddress: string;
  registerDate: string;
  city: string;
  clientCode: string;
  email: string;
  fullName: string;
  id: number;
  phoneNumber: string;
}

export interface IClients {
  content: IClient[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}
