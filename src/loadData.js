async function doFakeFetch(data) {
  // wait 1 second so that we can see the loading state
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return "loaded - " + data;
}

const cache = new Map();
export function loadData(data) {
  if (!cache.has(data)) {
    cache.set(data, doFakeFetch(data));
  }
  return cache.get(data);
}
