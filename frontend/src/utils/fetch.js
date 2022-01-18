export const Fetch = async (url, obj) => {
  let res = await fetch(`/${url}`, obj)
  try {
    res = await res.json()
  } catch (ignore) { }
  return res
}
