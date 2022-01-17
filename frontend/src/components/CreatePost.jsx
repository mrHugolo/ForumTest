import { useContext, useState } from "react";
import { Fetch } from "../utils/fetch.js"
import css from "../styles/index.module.css"
import { useHistory } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

export const CreatePost = ({ group }) => {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const [isHidden, setIsHidden] = useState(true)

  const handleClick = async () => {
    if (isHidden) {
      setIsHidden(false)
      return
    }
    let title = document.getElementById("createPost-postTitle")
    let cont = document.getElementById("createPost-postCont")

    const obj = {
      title: title?.value,
      content: cont?.value,
      groupId: group.group.id,
      userId: currentUser.id
    }

    let res = (await Fetch("rest/post", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    })).response
    

    setIsHidden(true)
     history.push(`/g/${group.group.name}/p/${res}`)
  }


  return (
    <>
      {currentUser && (
        <div>
          <div className={`${isHidden ? css.hide : css.createGroup}`}>
          {/* <div> */}
            <input id="createPost-postTitle" placeholder="Post Title" />
            <textarea id="createPost-postCont" placeholder="Post Content" />
          </div>
          <button onClick={handleClick}>
            + Create Post
          </button>
        </div>
      )}
    </>
  )
}