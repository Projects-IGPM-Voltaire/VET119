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

export const convertTo12HourFormat = (dateString) => {
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  return date.toLocaleTimeString('en-US', options);
};

export const convertToDateReadable = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  return date.toLocaleDateString('en-US', options);
};
