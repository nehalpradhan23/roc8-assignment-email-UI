"use client";
import { EmailItemModal } from "@/components/Emails/EmailItemModal";
import { EmailList } from "@/components/Emails/EmailList";
import { FilterBtns } from "@/components/FilterBtns";
import { useGlobalContext } from "@/Context/ContextApi";

export default function Home() {
  const {
    allDataObject: { allData },
  } = useGlobalContext();

  // const {
  //   allDataObject: { allData, setAllData },
  // } = useContext(ContextProvider);

  if (!allData) {
    return <div className="">Loading</div>;
  }

  return (
    <div className="bg-background px-12 py-6 pb-5 overflow-auto">
      <FilterBtns />
      <div className="flex mt-5 gap-5">
        <EmailList />
        <EmailItemModal />
      </div>
    </div>
  );
}
