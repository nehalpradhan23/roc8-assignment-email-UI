export interface DataFrom {
  email: string;
  name: string;
}
export interface SingleDataType {
  date: number;
  from: DataFrom;
  id: string;
  short_description: string;
  subject: string;
  isRead: boolean;
  isFavorite: boolean;
}

export interface SingleEmailDataType extends SingleDataType {
  // date: number;
  // from: DataFrom;
  // id: string;
  // short_description: string;
  // subject: string;
  // isFavorite: boolean;
  // isRead: boolean;
  body: string;
}

export interface GlobalContextType {
  allDataObject: {
    allData: SingleDataType[] | [];
    setAllData: React.Dispatch<React.SetStateAction<SingleDataType[] | []>>;
  };
  openEmailModalObject: {
    openEmailModal: boolean;
    setOpenEmailModal: React.Dispatch<React.SetStateAction<boolean>>;
  };
  currentEmailObject: {
    currentEmailItem: SingleEmailDataType;
    setCurrentEmailItem: React.Dispatch<
      React.SetStateAction<SingleEmailDataType>
    >;
  };
  emailLoadingObject: {
    emailLoading: boolean;
    setEmailLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };
  selectedFilterObject: {
    selectedFilter: number;
    setSelectedFilter: React.Dispatch<React.SetStateAction<number>>;
  };
  filteredDataObject: {
    filteredData: SingleDataType[];
    setFilteredData: React.Dispatch<React.SetStateAction<SingleDataType[]>>;
  };
  currentPageObject: {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  };
}
