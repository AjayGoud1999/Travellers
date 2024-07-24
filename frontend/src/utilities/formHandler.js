export const handleFormSubmit = async (url, event, data, method) => {
  event.preventDefault();
  try {
    const response = await fetch(url, {
      method: method,
      //   mode: "cors",
      //   cache: "no-cache",
      //   credentials: "cross-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      //   referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
