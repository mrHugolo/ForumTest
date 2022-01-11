import { useEffect, useState } from 'react';
import css from '../styles/index.module.css'




export const Home = () => {

  const [temp, setTemp] = useState("");

  useEffect(async()=>{
    let res = await fetch('rest/test/5')
    setTemp(await res.json())
  },[])

  const createGroup = async () => {
    const obj = {
      name: "Hugos favoritmat",
      description: "En grupp där Hugo delar sin favoritmat."
    }
    let res = await fetch("rest/group", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    })
    res = await res.json()
    console.log(res, 'res')
  }

  return (
    <>
      <h1 onClick={() => createGroup()} className={css.testClass}>Create group</h1>
      <h1 className={css.testClass}>{temp?.length > 0 && temp[0].id}</h1>
    </>
  );
};
