import { useContext, useState } from "react"
import { Fetch } from "../utils/fetch"
import css from "../styles/index.module.css"
import { useHistory } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

export const CreateGroup = ({ groups }) => {
  const {currentUser} = useContext(UserContext)
  const history = useHistory()
  const [isHidden, setIsHidden] = useState(true)

  const handleClick = async () => {
    if(isHidden) {
      setIsHidden(false)
      return
    }
    let name = document.getElementById("createGroup-groupName")
    let desc = document.getElementById("createGroup-groupDesc")
  
    const obj = {
      name: name?.value.trim(),
      description: desc?.value
    }
    let res = await Fetch("rest/group", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    })
    if(!res.response){
      name.value = "Name not available"
      return
    }
    if(groups.setGroups){
      let arr = groups.groups.slice()
      arr.push(obj)
      groups.setGroups(arr)
    }
    setIsHidden(true)

    name.value=name.value.trim()
    history.push(`g/${name.value}`)
  }

  return(
    <>
      {currentUser && (
        <div>
          <div className={`${isHidden ? css.hide : css.createGroup}`}>
            <input id="createGroup-groupName" minLength={1} maxLength={25} placeholder="Group Name" />
            <textarea id="createGroup-groupDesc"  minLength={1} maxLength={500} placeholder="Group Description" />
          </div>
          <button onClick={handleClick}>
            + Create Group
          </button>
        </div>
      )}
    </>
  )
}