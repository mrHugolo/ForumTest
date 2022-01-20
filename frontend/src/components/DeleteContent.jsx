import { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import css from "../styles/index.module.css"
import { Fetch } from "../utils/fetch"

export const DeleteContent = ({content}) => {
  const [isHidden, setIsHidden] = useState(false)
  const [response, setResponse] = useState('')
  const { setCurrentUser } = useContext(UserContext);
  const history = useHistory()

  const handleClick = async () => {
    switch(content.method) {
      case "deleteAccount": {
        let res = (await Fetch("rest/isGroupAdmin")).response
        if(res) {
          setResponse("You can't delete your account because you are a groupadmin for one or more groups." + "Contact us at hiddenforum@service.com if you wish to delete your account.")
          setIsHidden(true)
          return
        } 
        await fetch("rest/deleteAccount", {
          method: "PATCH"
        })
        await fetch("api/logout", {
          method: "DELETE"
        })
        setCurrentUser("")
        return history.push("/")
      }
    }
  }

  return(
    <div>
      <div onClick={handleClick}>
        {!isHidden && content.html}
      </div>
      <div>
        {isHidden && response}
      </div>
    </div>
  )
}