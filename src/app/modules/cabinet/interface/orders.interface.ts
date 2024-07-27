export interface IOrdersStatusButton {
  name: string;
  key: string;
  active: boolean;
}

export interface ISavedProductsList {
  id: number;
  trackNumber: string;
  productName: string;
}

export interface IOrders {
  content: IRegisterTrackNumber[];
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

export interface IRegisterTrackNumber {
  adminUserId: number;
  id: number;
  insertDate: string;
  productName: string;
  status: string;
  statusEn: string;
  trackNumber: string;
  updatedDate: string | null;
  user: {
    amountToPay: number;
    bonuses: number;
    cameFromId: number;
    city: string;
    clientCode: string;
    fullName: string;
    id: number;
    insertDate: string;
    password: string;
    phoneNumber: string;
    roles: [
      {
        id: number;
        name: string;
      },
    ];
    userReferralClients: [
      {
        id: number;
        insertDate: string;
        referralClientId: number;
      },
    ];
    userTrackProducts: [];
    username: string;
  };
}

export interface IOrdersParams {
  page: number;
  size: number;
  filter?: string;
  searchByTrack?: string;
}

export interface IRegisteredTrackNumber {
  productName: string;
  trackNumber: string;
}

export interface IRegisteredTrackNumberReq {
  existedTrackNumber: IRegisteredTrackNumber[];
  registeredTrackNumber: IRegisterTrackNumber[];
}
