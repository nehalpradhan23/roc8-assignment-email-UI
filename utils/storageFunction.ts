import { SingleDataType } from "@/types/types";

export const saveData = (data: SingleDataType[] | null) => {
  sessionStorage.setItem("allEmails", JSON.stringify(data));
  return;
};

export const getData = () => {
  const savedData = sessionStorage.getItem("allEmails");
  return savedData ? JSON.parse(savedData) : [];
};
