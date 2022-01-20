import { useEffect, useState } from "react";
import ftcss from "../styles/formatText.module.css";

export const FormatText = ({ textToFormat }) => {
  const [text, setText] = useState([]);

  let array = [];
  let array2 = [];
  let array3 = [];

  useEffect(() => {
    let l = textToFormat;

    //let test2 = l?.match(/#/g || [])?.length;
    //let checkItalic = l?.match(/§/g || [])?.length;

    l?.split(/(\*+\w+\*+)/g)
      .filter((x) => x.length > 0)
      .map((x) => {
        const a = /\*+(\w+)\*+/.exec(x);
        if (!a) {
          const spliNotCode = x.split(/(?=\`\`\`).*(?<=\`\`\`)/gs);
          if (spliNotCode[0]) {
            console.log("cero", spliNotCode[0]);

            array.push(spliNotCode[0]);
          }
          const matchCode = x.match(/(?=\`\`\`).*(?<=\`\`\`)/gs);
          if (matchCode) {
            array.push(matchCode);
          }
          if (spliNotCode[1]) {
            console.log("cero", spliNotCode[1]);
            array.push(spliNotCode[1]);
          }
        } else {
          const b = /\*\*\*(\w+)\*\*\*/.exec(x);
          if (b) {
            x = x.replace(/\*/g, "");
            array.push(
              <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                {x}
              </span>
            );
          } else {
            const c = /\*\*(\w+)\*\*/.exec(x);
            if (c) {
              x = x.replace(/\*/g, "");

              array.push(<span style={{ fontStyle: "italic" }}>{x}</span>);
            } else {
              x = x.replace(/\*/g, "");
              array.push(<span style={{ fontWeight: "bold" }}>{x}</span>);
            }
          }
        }
      });

    //code format check
    for (let p = 0; p < array.length; p++) {
      if (!array[p].type) {
        array[p] = array[p].toString();
        const d = array[p]?.match(/(?<=\`\`\`).*(?=\`\`\`)/gs);
        let z = [];
        if (d) {
          z = d[0].split("\n");
          for (let j = 0; j < z.length; j++) {
            let temp = [];
            if (z[j]) {
              let iNeed = z[j].match(/\w+/g);
              let dontNeed = z[j].match(/\W+/g);
              let tempCounter = 0;
              let y = [];
              while (
                tempCounter < iNeed.length ||
                tempCounter < dontNeed.length
              ) {
                if (iNeed[tempCounter]) y.push(iNeed[tempCounter]);
                if (dontNeed[tempCounter]) y.push(dontNeed[tempCounter]);
                tempCounter++;
              }
              for (let h = 0; h < y.length; h++) {
                //console.log("Y[H]",y[h]);
                if (y[h] == "const" || y[h] == "let" || y[h] == "for") {
                  temp.push(<span className={ftcss.keyWord}>{y[h]}</span>);
                } else if (y[h] == "console") {
                  temp.push(<span className={ftcss.console}>{y[h]}</span>);
                } else if (!isNaN(y[h])) {
                  temp.push(<span className={ftcss.number}>{y[h]}</span>);
                } else {
                  temp.push(<span className={ftcss.normalText}>{y[h]}</span>);
                }
              }
            }
            array2.push(
              <div key={j * 3} className={ftcss.lineCode}>
                {temp}
              </div>
            );
          }
          array2.push(<br />);
        } else {
          array2.push(array[p]);
        }
      } else array2.push(array[p]);
    }

    for (let m = 0; m < array2.length; m++) {
      if (!array2[m].type) {

        const linkFormat = array2[m].match(
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        );
        if (linkFormat) console.log("link frma", linkFormat);
        else console.log("no mach", array2[m]);

      }
      else array3.push(array2[m])
    }

    setText(array2);
    console.log(array2);
  }, [textToFormat]);

  return (
    <div>
      <div style={{whiteSpace:"pre-wrap"}}>
        {text.map((x, i) => (
          <span key={`${x}${i}`}>{x}</span>
        ))}
      </div>
    </div>
  );
};
