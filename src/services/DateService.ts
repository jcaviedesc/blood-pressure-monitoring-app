const stringToDate = (date: string) => {
  if (date) {
    return new Date(date);
  }
  return new Date();
};

export default stringToDate;
