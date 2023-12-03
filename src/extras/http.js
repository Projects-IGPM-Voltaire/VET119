export const toURLSearchParams = (payload) => {
  let queries = [];
  Object.keys(payload).forEach((key) => {
    const value = payload[key];
    if (Array.isArray(value)) {
      if (value) {
        value.forEach((value, index) =>
          queries.push(
            `${key}[${index}]=${encodeURIComponent(value.toString()).replace(
              /%20/g,
              "+"
            )}`
          )
        );
      }
    } else {
      if (value) {
        queries.push(
          `${key}=${encodeURIComponent(value.toString()).replace(/%20/g, "+")}`
        );
      }
    }
  });
  return queries.join("&");
};

export const checkHttpPayload = (payload) => {
  const _payload = Object.assign({}, payload);
  Object.keys(payload).forEach((key) => {
    if (!payload[key]) {
      delete _payload[key];
    }
  });

  return _payload;
};

export const isHttpPayloadHasProperty = (payload, property) => {
  try {
    return !!payload[property];
  } catch (e) {
    return false;
  }
};
