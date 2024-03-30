const searchParams = new URLSearchParams({
  query: "iashdiuashduiashduiashida",
  // Pexels API uses snake_case
  // eslint-disable-next-line camelcase
  per_page: "1",
});

const res = await fetch(
  `https://api.pexels.com/v1/search?${searchParams.toString()}`,
  { headers: { Authorization: `${import.meta.env.VITE_PEXELS_API_KEY}` } }
);

const json = await res.json();

console.log(json);
