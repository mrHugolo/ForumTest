import { useEffect, useRef, useState } from 'react'
import mod from '../styles/modal.module.css'

export const ModalText = ({showModal,isRead}) => {
  const[ac,setAc]=useState(true)
  const [text, setText] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const textRef = useRef();

  useEffect(()=>{
    let t=`Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, vitae
          quisquam doloribus deserunt consequatur exercitationem ipsa sunt culpa
          ea maxime hic quo unde ab explicabo iure. Esse recusandae enim ipsa?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, vitae
          quisquam doloribus deserunt consequatur exercitationem ipsa sunt culpa
          ea maxime hic quo unde ab explicabo iure. Esse recusandae enim ipsa?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, vitae`
    let a=[]
    for(let i=0;i<30;i++){ //number of lorem Ipsums
      a.push(t)
    }
    setText(a)
  },[])

  const handleScroll=()=>{  
    if (textRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = textRef.current;
      if (Math.floor(scrollHeight - scrollTop) === clientHeight) {
      setIsChecked(false)
      }
    }
  }

  return (
    <div className={`${mod.modalBody}`} onClick={() => showModal((p) => !p)}>
      <div className={`${mod.content}`} onClick={(e) => e.stopPropagation()}>
        <div ref={textRef} onScroll={handleScroll} className={`${mod.text}`}>{text.map((t,i)=><p key={i}>{i+1}.- {t}</p>)}</div>
        <div className="checkbox">
          <input disabled={isChecked} type="checkbox" onClick={() => { setAc((p) => !p)}}/>
          <strong > I have read the Lorem Ipsum</strong>
        </div>
        <div className={`${mod.buttonWrapper}`}>
          <button onClick={() => {isRead(true), showModal(false)}}disabled={ac}> Accept</button>
          <button onClick={() => showModal((p) => !p)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
