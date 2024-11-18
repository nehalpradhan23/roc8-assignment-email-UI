import { initialEmailData, useGlobalContext } from "@/Context/ContextApi";
import { SingleDataType } from "@/types/types";
import { formatDate } from "@/utils/formatDate";
import { saveData } from "@/utils/storageFunction";
import React from "react";

export const Email = ({ item }: { item: SingleDataType }) => {
  const {
    currentEmailObject: { currentEmailItem, setCurrentEmailItem },
    openEmailModalObject: { setOpenEmailModal },
    allDataObject: { allData, setAllData },
    emailLoadingObject: { setEmailLoading },
  } = useGlobalContext();

  // email on click ===================================
  const openEmail = async (id: string) => {
    if (currentEmailItem?.id === id) {
      setCurrentEmailItem(initialEmailData);
      setOpenEmailModal(false);
      return;
    }
    setEmailLoading(true);
    try {
      const response = await fetch(
        `https://flipkart-email-mock.now.sh/?id=${item.id}`
      );
      if (!response.ok) {
        throw new Error("error opening email");
      }
      const data = await response.json();

      setCurrentEmailItem({ ...item, ...data }); // set both data
      // session storage
      const updateData = allData?.map((item) => {
        if (item?.id === id) {
          return { ...item, isRead: true };
        } else {
          return item;
        }
      });
      setAllData(updateData);
      saveData(updateData);
      setOpenEmailModal(true);
    } catch (error) {
      console.log("error fetching email", error);
    } finally {
      setEmailLoading(false);
    }
  };

  // ====================================
  return (
    <div
      className={`flex border text-[14px] gap-5 px-5 py-3 rounded-md cursor-pointer ${
        item?.isRead ? "bg-readBackground" : "bg-white"
      } ${
        currentEmailItem?.id === item?.id ? "border-accent" : "border-border"
      }`}
      onClick={() => openEmail(item?.id)}
    >
      <div className="">
        <span className="rounded-full text-lg h-10 w-10 text-white bg-accent flex items-center justify-center">
          {item?.from.name[0].toUpperCase()}
        </span>
      </div>
      {/* other details -------------------------------- */}
      <div className="*:text-text *:flex *:gap-1">
        <div className="">
          <span>From:</span>
          <span className="font-semibold *:text-sm">
            <span className="capitalize">{item?.from.name}</span>{" "}
            <span className="">{"<"}</span>
            <span>{item?.from.email}</span>
            <span>{">"}</span>
          </span>
        </div>
        <div className="">
          <span>Subject:</span>
          <span className="font-bold">{item?.subject}</span>
        </div>
        <span className="mt-2">{item?.short_description}</span>
        <div className="mt-2">
          <span className="mr-8">{formatDate(item?.date)}</span>
          {/* is favorite ---------------- */}
          {item?.isFavorite && (
            <span className="text-accent font-bold">Favorite</span>
          )}
        </div>
      </div>
    </div>
  );
};
