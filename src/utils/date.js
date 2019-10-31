const formatDateNumber = number => (number > 9 ? String(number) : `0${number}`);

export const formatDateToDMY = (type = 'date') => (dateString) => {
  if (!dateString && !dateString.length) {
    return '';
  }
  const TYPES = {
    date: (date) => {
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      // month needs a compensation, since his count starts at zero (0 === january, for instance)
      return `${formatDateNumber(day)}/${formatDateNumber(month + 1)}/${year}`;
    },
    dateAndHour: (date) => {
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return `${formatDateNumber(day)}/${formatDateNumber(
        month + 1,
      )}/${year} ${formatDateNumber(hours)}:${formatDateNumber(
        minutes,
      )}:${formatDateNumber(seconds)}`;
    },
  };

  const date = new Date(dateString);

  if (!dateString && !date.getDate) {
    return new Error('Pass date on ISOString format');
  }

  return TYPES[type]
    ? TYPES[type](date)
    : new Error(`Unknown date type ${type}`);
};
