import { useState } from 'react'
import mod from '../styles/modal.module.css'

export const ModalText = ({showModal,isRead}) => {
  const[ac,setAc]=useState(true)

  return (
    <div className={`${mod.modalBody}`} onClick={() => showModal((p) => !p)}>
      <div className={`${mod.content}`} onClick={e=>e.stopPropagation() }>
        <div className={`${mod.text}`}>
          1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, vitae
          quisquam doloribus deserunt consequatur exercitationem ipsa sunt culpa
          ea maxime hic quo unde ab explicabo iure. Esse recusandae enim ipsa?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, vitae
          quisquam doloribus deserunt consequatur exercitationem ipsa sunt culpa
          ea maxime hic quo unde ab explicabo iure. Esse recusandae enim ipsa?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, vitae
          <br />
          2. quisquam doloribus deserunt consequatur exercitationem ipsa sunt culpa
          ea maxime hic quo unde ab explicabo iure. Esse recusandae enim ipsa?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, vitae
          quisquam doloribus deserunt consequatur exercitationem ipsa sunt culpa
          ea maxime hic quo unde ab explicabo iure. Esse recusandae enim ipsa?
          <br />
          3. doloribus deserunt consequatur exercitationem ipsa sunt culpa
          ea maxime hic quo unde ab explicabo iure. Esse recusandae enim ipsa?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, vitae
          quisquam doloribus deserunt consequatur exercitationem ipsa sunt culpa
          ea maxime hic quo unde ab explicabo iure. Esse recusandae enim ipsa?
        </div>
        
        <div className="checkbox">
          <input type="checkbox" onClick={() => {setAc((p) => !p)}}/>
          <strong> I have read the Lorem Ipsum</strong>
        </div>
        <div className={`${mod.buttonWrapper}`}>
          <button
            onClick={() => {isRead(true), showModal(false)}} disabled={ac} >Accept </button>
          <button onClick={() => showModal((p) => !p)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
