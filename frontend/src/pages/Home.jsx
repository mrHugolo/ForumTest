import { useEffect, useState } from 'react';
import css from '../styles/index.module.css';
import {useHistory} from 'react-router-dom';




export const Home = () => {
  const history = useHistory();
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
    if(res.response){
    history.push(`/g/${obj.name}`)
    } 
    else{
      console.log("Group with that name already exists")
    }
  }

  return (
    <>
      <h1 onClick={() => createGroup()} className={css.testClass}>Create group</h1>
    </>
  );
};
