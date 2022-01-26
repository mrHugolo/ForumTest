import { useMemo, useState } from "react";
import { Fetch } from "../utils/fetch";
import { BsFillPencilFill } from "react-icons/bs";
import etcss from "../styles/editText.module.css"




export const EditText = ({editText, setEditText, componentType, elementId, render}) => {
  const[isEdit, setIsEdit]=useState(false)

  const handleEdit = async (e) => {

    if (e.key != "Enter" || e.shiftKey) return;
    let trimmedText = e.target.value;
    setIsEdit(p=>!p)
   

    switch (componentType) {
      case "profile description": {
        let res = (
          await Fetch(`rest/editDescription`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ description: trimmedText }),
          })
        ).response;
        if (res.status == 200) {
          setEditText((p) => ({ ...p, description: trimmedText }));
        }
      }
      case "comment": {
        let res = (
          await Fetch(`rest/editComment`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id: elementId, text: trimmedText }),
          })
        ).response;

        if (res.status == 200) {
          setEditText((p) => ({ ...p, text: trimmedText }));
          render(p => !p)
        }
      }
    }
  };

  /*   document.onselectionchange = function() {
    let selection = document.getSelection().toString();
    console.log(selection);
   } */

  const handleBold = () => {
    let textArea = document.getElementById("textArea");
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
    let textArea = document.getElementById("textArea");
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
    let textArea = document.getElementById("textArea");
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

  const memoIcon = useMemo(() => {
    return <BsFillPencilFill />;
  }, []);

  return (
    <>
      <div className={etcss.editPen} onClick={() => {
        setIsEdit((p) => !p)
      }}>{memoIcon}</div>
      {isEdit && (
        <div className={etcss.tAreaWrapper}>
          <textarea
            className={etcss.tArea}
            id="textArea"
            onKeyPress={handleEdit}
            defaultValue={editText}
          ></textarea>
          <div>
            <button onClick={handleBold} type="text">
              <b>B</b>
            </button>
            <button onClick={handleItalic} type="text">
              <i>I</i>
            </button>
            <button onClick={handleCode} type="text">{`< >`}</button>
          </div>
        </div>
      )}
    </>
  );
}