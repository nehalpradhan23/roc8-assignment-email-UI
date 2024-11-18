import { useGlobalContext } from "@/Context/ContextApi";
import { formatDate } from "@/utils/formatDate";
import { saveData } from "@/utils/storageFunction";
import React from "react";

export const EmailItemModal = () => {
  const {
    currentEmailObject: { currentEmailItem, setCurrentEmailItem },
    emailLoadingObject: { emailLoading },
    openEmailModalObject: { openEmailModal },
    allDataObject: { allData, setAllData },
  } = useGlobalContext();

  // ------------------------------------------------------
  const addToFavorite = (id: string) => {
    const updateData = allData?.map((item) => {
      if (item.id === id) {
        // return { ...item, isFavorite: true };
        return { ...item, isFavorite: !item.isFavorite };
      } else {
        return item;
      }
    });
    setAllData(updateData); // to update frontend
    saveData(updateData);

    setCurrentEmailItem((prevEmail) => ({
      ...prevEmail,
      isFavorite: !prevEmail.isFavorite,
    }));
  };

  // loading state -------------------------
  if (emailLoading) {
    return (
      <div
        className={`${
          openEmailModal ? "w-[65%]" : "hidden"
        } p-5 bg-white border border-border flex rounded-lg gap-3 text-text h-[800px] overflow-hidden`}
      >
        <div className="mb-6">
          <div className="rounded-full text-lg h-10 w-10 text-white bg-accent flex items-center justify-center animate-pulse"></div>
        </div>
        <section className="w-full flex flex-col gap-6 *:rounded-full">
          {/* name and button ------------------------ */}
          <div className="flex justify-between *:animate-pulse *:rounded-full">
            <span className="w-[300px] bg-gray-400"></span>
            <button className="bg-accent h-8 w-[100px]"></button>
          </div>
          {/* ----------------------------------- */}
          <span className="w-[150px] h-5 animate-pulse bg-gray-500"></span>
          <div className="h-5 w-[500px] bg-gray-300 animate-pulse"></div>
          <div className="h-5 w-[500px] bg-gray-300 animate-pulse"></div>
          <div className="h-5 w-[500px] bg-gray-300 animate-pulse"></div>
          <div className="h-5 w-[500px] bg-gray-300 animate-pulse"></div>
        </section>
      </div>
    );
  }
  // ============================================================
  return (
    <div
      className={`${
        openEmailModal ? "w-[65%]" : "hidden"
      } p-5 bg-white border border-border flex rounded-lg gap-3 text-text h-screen`}
    >
      <div className="">
        <div className="rounded-full text-lg h-10 w-10 text-white bg-accent flex items-center justify-center">
          {currentEmailItem?.from?.name[0]?.toUpperCase()}
        </div>
      </div>
      <section className="w-full flex flex-col gap-6">
        {/* name and button ------------------------ */}
        <div className="flex justify-between">
          <span className="text-2xl font-bold capitalize">
            {currentEmailItem?.from.name}
          </span>
          <button
            className="rounded-full bg-accent text-white py-1 px-4 text-sm"
            onClick={() => addToFavorite(currentEmailItem?.id!)}
          >
            {/* Mark as favorite */}
            {currentEmailItem?.isFavorite
              ? "Remove from favorite"
              : "Mark as favorite"}
          </button>
        </div>
        {/* ----------------------------------- */}
        <span className="mr-8">{formatDate(currentEmailItem?.date!)}</span>
        {/* {JSON.stringify(currentEmailItem)} */}
        <div dangerouslySetInnerHTML={{ __html: currentEmailItem?.body! }} />
      </section>
    </div>
  );
};
