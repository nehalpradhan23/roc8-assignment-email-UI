import { format } from "date-fns";
export const formatDate = (timeStamp: number) => {
  // const date = new Date(timeStamp);
  const date = format(new Date(timeStamp), "dd/MM/yyyy hh:mm a");
  return date.toLocaleString().replace(",", "").toLowerCase();
};
