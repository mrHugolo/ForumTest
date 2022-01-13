import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Fetch} from "../utils/fetch.js"
import css from "../styles/index.module.css"

export const Group = () => {
  const {groupName} = useParams();
  const [isJoined, setIsJoined] = useState('')
  const [members, setMembers] = useState([])

  useEffect(async () => {
    setIsJoined((await Fetch(`rest/isJoined/${groupName}`)).response)
    setMembers((await Fetch(`rest/members/${groupName}`)).response)
  }, [])

  useEffect(()=> {  
    console.log(members)
  }, [members])

  const joinGroup = async () => {
    const obj = {
      name: groupName
    }
    let res = await Fetch("rest/joinGroup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    })
    console.log(res)
  }

  const leaveGroup = async () => {
    const obj = {
      name: groupName
    }
    let res = await Fetch("rest/leaveGroup", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    })
    console.log(res)

  }
  return (
    <>
      <h1>GROUP</h1>
      <h1 className={isJoined?.length ? css.hide : ``} onClick={() => joinGroup()}>Join group</h1>
      <h1 className={!isJoined?.length ? css.hide : ``} onClick={() => leaveGroup()}>Leave group</h1>
      <h1>{isJoined}</h1>
      <h1>{members.length}</h1>

    </>
  );
};
