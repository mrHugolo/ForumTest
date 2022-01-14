import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import pcss from "../styles/profile.module.css"
import { Fetch } from "../utils/fetch";

export const Profile = () => {
  const {currentUser} = useContext(UserContext)
  const {userName} = useParams()
  const [user, setUser] = useState({})

  useEffect( async () => {
    let info = (await Fetch(`rest/profile/${userName}`)).response
    let u = {
      name: info[0].username,
      description: info[0].description,
      groups: info[0].names.split('ᴥ'),
      isMyProfile: false,
      comments: []
    }
    for(let i = 0; i < info.length; i++) {
      u.comments.push({
        text: info[i].text,
        postId: info[i].postId
        //time: info[i].time    //Then sort by time
      })
    }
    setUser(u)
  }, [])

  useEffect(()=> {
    if(currentUser?.id) {
      let bol = currentUser.username == userName
      setUser(p => ({ ...p, isMyProfile: bol}))
    } 
  }, [currentUser])

  return (
    <div className={pcss.container}>
      <h1 onClick={() => console.log(user)}>{userName}</h1>
    </div>
  );
};
