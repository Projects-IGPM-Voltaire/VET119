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
