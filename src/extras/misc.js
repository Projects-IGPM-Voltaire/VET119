export const toPublicImage = (path) => {
  const apiURL = import.meta.env.VITE_BASE_API_URL;
  return `${apiURL}/storage/${path}`;
};
export const toAddress = ({ house_number, street, barangay }) => {
  return `${house_number} ${street} ${barangay.name}`;
};

export const debounce = (fn, delay) => {
  let timeout;

  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const convertTo12HourFormat = (time24hr) => {
  const [hours, minutes] = time24hr.split(':');
  let period = 'AM';

  let hours12 = parseInt(hours, 10);
  if (hours12 >= 12) {
    period = 'PM';
    if (hours12 > 12) {
      hours12 -= 12;
    }
  }

  return `${hours12}:${minutes} ${period}`;
};

export const convertToDateReadable = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  return date.toLocaleDateString('en-US', options);
};
