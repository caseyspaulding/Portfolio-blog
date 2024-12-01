
// Function to format dates
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return dateFormatter.format(dateObj);
};


// Function to format times
export const formatTime = (time: Date | string): string => {
  const timeObj = typeof time === 'string' ? new Date(`1970-01-01T${time}`) : time;
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // for 12-hour format, set to false for 24-hour format
  });

  return timeFormatter.format(timeObj);
};