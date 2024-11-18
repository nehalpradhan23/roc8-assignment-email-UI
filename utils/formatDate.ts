export const formatDate = (timeStamp: number) => {
  const date = new Date(timeStamp);
  return date.toLocaleString().replace(",", "").toLowerCase();
};
