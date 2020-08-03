// format a date as a string that matches the designs for
// the latest update time
export const formatDate = (date) => {
  let dateObject = new Date(date);
  let dateString = dateObject.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  let timeString = dateObject.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  });

  return `${dateString} ${timeString}`;
};
