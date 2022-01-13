export const Fetch = async (url, obj) => {
  let res = await fetch(`http://localhost:3000/${url}`, obj)
  try {
    res = await res.json()
  } catch(ignore){}
  return res
}
