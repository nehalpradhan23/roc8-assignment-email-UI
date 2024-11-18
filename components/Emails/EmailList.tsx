import React, { useEffect, useState } from "react";
import { Email } from "./Email";
import { useGlobalContext } from "@/Context/ContextApi";
import { SingleDataType } from "@/types/types";

export const EmailList = () => {
  const {
    allDataObject: { allData, setAllData },
    openEmailModalObject: { openEmailModal, setOpenEmailModal },
    selectedFilterObject: { selectedFilter },
    filteredDataObject: { filteredData },
    currentPageObject: { currentPage, setCurrentPage },
  } = useGlobalContext();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [currentData, setCurrentData] = useState<SingleDataType[]>([]);

  // for pagination -----------------------------------------
  const objectsPerPage = 8;
  const indexOfLastObject = currentPage * objectsPerPage;
  const indexOfFirstObject = indexOfLastObject - objectsPerPage;
  const currentData = filteredData.slice(indexOfFirstObject, indexOfLastObject);
  console.log("current data: ", currentData);

  // setCurrentData(allData.slice(indexOfFirstObject, indexOfLastObject));

  const totalDataNumber = filteredData.length;
  const numberOfPages = Math.ceil(totalDataNumber / objectsPerPage);

  // =================================================
  return (
    <div
      className={` ${
        openEmailModal ? "w-[35%] overflow-y-scroll" : "w-full"
      } min-h-screen`}
    >
      <div className="flex flex-col gap-6">
        {/* if no mails */}
        {selectedFilter !== 0 &&
          currentData.length === 0 &&
          selectedFilter === 1 && <div className="">No unread mails</div>}
        {selectedFilter !== 0 &&
          currentData.length === 0 &&
          selectedFilter === 2 && <div className="">No read mails</div>}
        {selectedFilter !== 0 &&
          currentData.length === 0 &&
          selectedFilter === 3 && <div className="">No favorites</div>}
        {/* show all -------------------- */}
        {currentData?.map((item) => (
          <Email item={item} key={item.id} />
        ))}
      </div>
      {/* pagination ================================================ */}
      <div className="text-center flex gap-2 items-center justify-center py-4">
        {[...Array(numberOfPages)].map((x, i) => (
          <button
            onClick={() => setCurrentPage(i + 1)}
            // onClick={() => handlePageChange(i)}
            key={i}
            className={`h-10 w-10 flex items-center justify-center rounded-full cursor-pointer ${
              currentPage === i + 1
                ? "bg-accent text-white"
                : "bg-white text-black border border-border"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
