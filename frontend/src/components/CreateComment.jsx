import { useEffect, useState } from "react"
import { Fetch } from "../utils/fetch"

export const CreateComment = (props) => {

    const [showInput, setShowInput] = useState(false)


    const handleSubmit = async (e) => {

        e.preventDefault()

        let obj = {
            postId: props.postId,
            userId: props.currentUser.id,
            text: e.target[0].value
        }

        let res = await Fetch("rest/comment", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(obj),
        })
        if (!res) {
            console.log("POST comment failed")
            return
        } else {
            let tempComment = props.test.comments
            let tempObj = {
                postId: res.postId, 
                text: res.text, 
                commentUsername: props.currentUser.username
            }
            tempComment.push(tempObj)
            props.post((p) => ({ ...p, comments: tempComment }))

            //check later alligator to-do
           // props.post((p) => ({ ...p, comments: [...p.comments,{...p, text:res.text , commentUsername:props.currentUser.username}]}))
        }
        setShowInput(false)
    }


    return (
        <div>
            {showInput && props.currentUser.id ?
                <form onSubmit={handleSubmit}>
                    {/* <textarea/> is temporary */}
                    <textarea
                        placeholder="WRITE COMMENT HERE"
                        id="commentInput"
                        type="text"
                    />
                    <button type="submit">Send</button>
                </form>
                :
                <button onClick={props.currentUser.id ? () => setShowInput(true) : () => console.log("<Insert Login Alert>")}>Comment+</button>
            }
        </div>
    )
}