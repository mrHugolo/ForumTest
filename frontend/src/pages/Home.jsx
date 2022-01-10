import { useEffect, useState } from 'react';
import css from '../styles/index.module.css'




export const Home = () => {

  const [temp, setTemp] = useState("");

  useEffect(async()=>{
    let res = await fetch('rest/test/5')
    setTemp(await res.json())
  },[])

  return (
    <>
      <h1 className={css.testClass}>Home</h1>
      <h1 className={css.testClass}>{temp && temp[0].id}</h1>
    </>
  );
};
