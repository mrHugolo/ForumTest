import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import { Fetch } from "../utils/fetch"
import gmcss from "../styles/groupMembers.module.css"
import css from "../styles/index.module.css"
import { FaCrown } from "react-icons/fa"

export const GroupMembers = () => {
  const {groupName} = useParams()
  const {currentUser} = useContext(UserContext)
  const history = useHistory()
  const [role, setRole] = useState('')
  const [members, setMembers] = useState([])

  useEffect( async () => {
    let res = (await Fetch(`rest/members/${groupName}`)).response
    let r = res.find(user => user.username == currentUser.username)?.role
    if(!(r == "GroupAdmin" || r == "Moderator")) history.push(`/g/${groupName}`)
    setRole(r)
    let arr = []
    res.filter(m => m.role == "GroupAdmin")?.forEach(it => {
      arr.push(it)
    })
    res.filter(m => m.role == "Moderator")?.forEach(it => {
      arr.push(it)
    })
    res.filter(m => m.role == "Authorized")?.forEach(it => {
      arr.push(it)
    })
    res.filter(m => m.role == "Unauthorized")?.forEach(it => {
      arr.push(it)
    })
    
    setMembers(arr)
  }, [])

  const isVisible = (r, bool) => {
    let b = false
    if(r == "GroupAdmin") b = true
    else if(r == "Moderator" && role == "Moderator") b = true
    if(b) return gmcss.invisible
  }

  const goToProfile = (e) => {
    history.push(`/${e.target.firstChild.data}`)
  }

  const handleModerator = async (role, username) => {
    if(!(role == "Moderator" || role == "Authorized")) return
    let r = role == "Moderator" ? "Authorized" : "Moderator"
    
    let arr = members.slice()
    members.filter(m => m.username == username)[0].role = r
    setMembers(arr)
    await Fetch(`rest/changeRole/${username}/${r}`, {
      method: "PATCH"
    })
  }

  const handleBan = async (role, username) => {
    if(!(role == "Unauthorized" || role == "Authorized")) return
    let r = role == "Unauthorized" ? "Authorized" : "Unauthorized"
    
    let arr = members.slice()
    members.filter(m => m.username == username)[0].role = r
    setMembers(arr)
    await Fetch(`rest/changeRole/${username}/${r}`, {
      method: "PATCH"
    })
  }

  return(
    <div className={gmcss.container}>
        {members.length && members.map(m => (
          <div key={`member-${m.username}`} className={`${css.borderBottom} ${gmcss.members}`}>
            <div onClick={goToProfile} className={`${gmcss.username} ${gmcss[m.role]} ${css.Cpointer}`}>{m.username}</div>
            <div onClick={() => handleModerator(m.role, m.username)} className={`${isVisible(m.role)} ${gmcss[`crown-${m.role}`]} ${css.Cpointer}`}><FaCrown /></div>
            <div onClick={() => handleBan(m.role, m.username)} className={`${isVisible(m.role, true)} ${gmcss.banBtn}`}><button>{m.role == "Unauthorized" ? `Un` : ``}Ban</button></div>
          </div>
        ))}
    </div>
  )
}