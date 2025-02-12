export const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      weekday: 'long', // 'short' for abbreviated weekday
      year: 'numeric',
      month: 'long', // 'short' for abbreviated month
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true, // 12-hour clock (true) or 24-hour (false)
    });
  };