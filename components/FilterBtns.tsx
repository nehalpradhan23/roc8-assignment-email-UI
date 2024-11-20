import { useGlobalContext } from "@/Context/ContextApi";
import React from "react";

const btns = [
  {
    id: 0,
    name: "all",
  },
  {
    id: 1,
    name: "unread",
  },
  {
    id: 2,
    name: "read",
  },
  {
    id: 3,
    name: "favorites",
  },
];

export const FilterBtns = () => {
  const {
    selectedFilterObject: { selectedFilter, setSelectedFilter },
    currentPageObject: { setCurrentPage },
  } = useGlobalContext();
  // console.log("filter: ", selectedFilter);

  const handleFilterSelect = (btn: number) => {
    setCurrentPage(1);
    // console.log(btn);
    if (selectedFilter === btn) {
      setSelectedFilter(0);
      return;
    }
    setSelectedFilter(btn);
  };
  // =========================================================
  return (
    <div className="text-lg flex gap-2">
      <span className="mr-4">Filter By: </span>
      {btns.slice(1).map((btn) => (
        <button
          className={`flex capitalize px-4 rounded-full ${
            selectedFilter === btn?.id
              ? "bg-filterBtn border border-border"
              : ""
          }`}
          key={btn?.id}
          onClick={() => handleFilterSelect(btn?.id)}
        >
          {btn?.name}
        </button>
      ))}
    </div>
  );
};
