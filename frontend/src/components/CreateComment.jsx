import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Fetch } from "../utils/fetch";

export const CreateComment = (props) => {
  const [showInput, setShowInput] = useState(false);
  const history=useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(e.target[0].value.trim().length===0){
      e.target[0].value=""
      return
    }
    e.target[0].value =e.target[0].value.trim()
    let obj = {
      postId: props.postId,
      userId: props.currentUser.id,
      text: e.target[0].value,
    };

    let res = await Fetch("rest/comment", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    });
    if (!res) {
      console.log("POST comment failed");
      return;
    } else {
      let tempComment = props.test.comments;
      let tempObj = {
        postId: res.postId,
        text: res.text,
        commentUsername: props.currentUser.username,
      };
      tempComment.push(tempObj);
      props.post((p) => ({ ...p, comments: tempComment }));
      props.render(p=>!p)

      //check later alligator to-do
      // props.post((p) => ({ ...p, comments: [...p.comments,{...p, text:res.text , commentUsername:props.currentUser.username}]}))
    }
    setShowInput(false);
  };

  const handleBold = () => {
    let textArea = document.getElementById("commentInput");
    if (textArea.selectionStart == textArea.selectionEnd) return;
    while (textArea.value.substr(textArea.selectionEnd - 1, 1) == " ") {
      textArea.selectionEnd = textArea.selectionEnd - 1;
    }
    let selected = textArea.value.slice(
      textArea.selectionStart,
      textArea.selectionEnd
    );

    textArea.setRangeText(`*${selected}*`);
  };
  const handleItalic = () => {
    let textArea = document.getElementById("commentInput");
    if (textArea.selectionStart == textArea.selectionEnd) return;
    while (textArea.value.substr(textArea.selectionEnd - 1, 1) == " ") {
      textArea.selectionEnd = textArea.selectionEnd - 1;
    }
    let selected = textArea.value.slice(
      textArea.selectionStart,
      textArea.selectionEnd
    );

    textArea.setRangeText(`**${selected}**`);
  };

  const handleCode = () => {
    let textArea = document.getElementById("commentInput");
    if (textArea.selectionStart == textArea.selectionEnd) return;
    while (textArea.value.substr(textArea.selectionEnd - 1, 1) == " ") {
      textArea.selectionEnd = textArea.selectionEnd - 1;
    }
    let selected = textArea.value.slice(
      textArea.selectionStart,
      textArea.selectionEnd
    );
    let g = selected.split(/\W+/g);

    textArea.setRangeText(`\`\`\`${selected}\`\`\``);
  };

  return (
    <div>
      {showInput && props.currentUser.id ? (
        <div>
          <form onSubmit={handleSubmit}>
            {/* <textarea/> is temporary */}
            <textarea
              placeholder="WRITE COMMENT HERE"
              id="commentInput"
              type="text"
              required
            />

            <button type="submit">Send</button>
          </form>
          <div>
            <button onClick={handleBold} type="text">
              <b>B</b>
            </button>
            <button onClick={handleItalic} type="text">
              <i>T</i>
            </button>
            <button onClick={handleCode} type="text">{`< >`}</button>
          </div>
        </div>
      ) : props.currentUser.id ? (
        <button onClick={() => setShowInput(true)}>Comment</button>
      ) : (
        <button onClick={()=>history.push("/login")}>Log in to comment on this post</button>
      )}
    </div>
  );
};
