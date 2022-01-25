import { useEffect, useState } from "react";
import ftcss from "../styles/formatText.module.css";

export const FormatText = ({ textToFormat }) => {
  const [text, setText] = useState([]);

  let array = []; //  for words  format
  let array2 = []; // for code
  let array3 = []; //for links

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
         //   console.log("cero", spliNotCode[0]);

            array.push(spliNotCode[0]);
          }
          const matchCode = x.match(/(?=\`\`\`).*(?<=\`\`\`)/gs);
          if (matchCode) {
            array.push(matchCode);
          }
          if (spliNotCode[1]) {
           // console.log("cero", spliNotCode[1]);
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
              if(iNeed && dontNeed)
              while (
                tempCounter < iNeed.length ||
                tempCounter < dontNeed.length
              ) {
                if (iNeed[tempCounter]) y.push(iNeed[tempCounter]);
                if (dontNeed[tempCounter]) y.push(dontNeed[tempCounter]);
                tempCounter++;
              }
              else y.push(z[j])
              for (let h = 0; h < y.length; h++) {
                //console.log("Y[H]",y[h]);
                if (y[h] == "const" || y[h] == "let" || y[h] == "for") {
                  temp.push(<span key={`${y}-${h}`} className={ftcss.keyWord}>{y[h]}</span>);
                } else if (y[h] == "console") {
                  temp.push(<span key={`${y}-${h}`} className={ftcss.console}>{y[h]}</span>);
                } else if (!isNaN(y[h])) {
                  temp.push(<span key={`${y}-${h}`} className={ftcss.number}>{y[h]}</span>);
                } else {
                  temp.push(<span key={`${y}-${h}`} className={ftcss.normalText}>{y[h]}</span>);
                }
              }
            }
            array2.push(
              <div key={j * 3} className={ftcss.lineCode}>
                {temp}
              </div>
            );
          }
        } else {
          array2.push(array[p]);
        }
      } else array2.push(array[p]);
    }

    // IMPORATN  
    //https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/

    for (let m = 0; m < array2.length; m++) {
      if (!array2[m].type) {
        array2[m].split(/(https?:\/\/\S+)/g).filter((x) => x.length > 0).map((x) => {
          const a = /(https?):\/\/(\S+)/.exec(x);
          if(!a) array3.push(x)
          else {
           // let templinkName=x.split(/https:\/\/\w+\./)
            //console.log("link name :",templinkName)

            if(/[webp,jpg]$/.test(x)){
              array3.push(
                <a
                  style={{ display: "table-cell" }}
                  href={x}
                  target="_blank"
                  rel="noopener noreferrer" // *****VERY VERY IMPORTANT'****
                >
                  <img className={ftcss.picture} href={x} src={x} />
                </a>
              );
            }
            else
              array3.push(
                <a
                style={{ display: "table-cell" }}
                href={x}
                target="_blank"
                rel="noopener noreferrer" // *****VERY VERY IMPORTANT'****
                >
                {x}
              </a>
            );
          
          }
        })
      }      
      else array3.push(array2[m])
    }

    setText(array3);
   // console.log(array2);
  }, [textToFormat]);

  return (
    <div style={{whiteSpace:"pre-wrap"}}>
        {text.map((x, i) => <span key={i}>{x}</span>)}
    </div>
  );
};
