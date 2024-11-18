"use client";

import {
  GlobalContextType,
  SingleDataType,
  SingleEmailDataType,
} from "@/types/types";
import { getData, saveData } from "@/utils/storageFunction";
import { createContext, useContext, useEffect, useState } from "react";

export const initialEmailData: SingleEmailDataType = {
  body: "",
  date: 0,
  from: { email: "", name: "" },
  id: "",
  isFavorite: false,
  isRead: false,
  short_description: "",
  subject: "",
};

export const ContextProvider = createContext<GlobalContextType>({
  allDataObject: {
    allData: [],
    setAllData: () => {},
  },
  openEmailModalObject: {
    openEmailModal: false,
    setOpenEmailModal: () => {},
  },
  currentEmailObject: {
    currentEmailItem: initialEmailData,
    setCurrentEmailItem: () => {},
  },
  emailLoadingObject: {
    emailLoading: true,
    setEmailLoading: () => {},
  },
  selectedFilterObject: {
    selectedFilter: 0,
    setSelectedFilter: () => {},
  },
  filteredDataObject: {
    filteredData: [],
    setFilteredData: () => {},
  },
  currentPageObject: {
    currentPage: 1,
    setCurrentPage: () => {},
  },
});

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [allData, setAllData] = useState<SingleDataType[] | []>([]);
  const [currentEmailItem, setCurrentEmailItem] =
    useState<SingleEmailDataType>(initialEmailData);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [emailLoading, setEmailLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [filteredData, setFilteredData] = useState<SingleDataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // fetch initial data ---------------------------------------------------------
  useEffect(() => {
    const getSavedData = getData();

    if (getSavedData.length > 0) {
      setAllData(getSavedData);
      return;
    }

    const fetchData = async () => {
      const response = await fetch("https://flipkart-email-mock.vercel.app/");
      const result = await response.json();
      // add other properties
      const updatedData = result?.list.map((item: SingleDataType) => ({
        ...item,
        isRead: false,
        isFavorite: false,
      }));
      setAllData(updatedData);
    };

    fetchData();
  }, []);

  // filter data --------------------------------
  useEffect(() => {
    if (selectedFilter === 0) {
      setFilteredData(allData);
    } else if (selectedFilter === 1) {
      setFilteredData(allData?.filter((item) => item?.isRead === false));
    } else if (selectedFilter === 2) {
      setFilteredData(allData?.filter((item) => item?.isRead === true));
    } else if (selectedFilter === 3) {
      setFilteredData(allData?.filter((item) => item?.isFavorite === true));
    }
  }, [selectedFilter, allData]);

  // persist in session storage -------------------
  useEffect(() => {
    saveData(allData);
  }, [allData]);

  // ======================================================
  return (
    <ContextProvider.Provider
      value={{
        allDataObject: { allData, setAllData },
        openEmailModalObject: { openEmailModal, setOpenEmailModal },
        currentEmailObject: { currentEmailItem, setCurrentEmailItem },
        emailLoadingObject: { emailLoading, setEmailLoading },
        selectedFilterObject: { selectedFilter, setSelectedFilter },
        filteredDataObject: { filteredData, setFilteredData },
        currentPageObject: { currentPage, setCurrentPage },
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(ContextProvider);
  if (!context) {
    throw new Error("useGlobalContext must be within a GlobalContextProvider");
  }
  return context;
};
