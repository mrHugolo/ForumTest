import { useParams } from "react-router-dom";

export const Group = () => {
  const {groupName} = useParams();

  const joinGroup = async () => {
    const obj = {
      userId: 2
    }
    let res = await fetch("rest/joinGroup/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    })
    res = await res.json()
    if(res.response){
    } 
    else{
      console.log("Group with that name already exists")
    }
  }
  return (
    <>
      <h1>GROUP</h1>
      <h1 onClick={() => joinGroup()}>Join group</h1>
    </>
  );
};
