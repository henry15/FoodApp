import React from 'react'
import ReactDom from 'react-dom'

function Model({ children, onClose }) {
    return (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          {children}
          <button style={styles.closeButton} onClick={onClose}>X</button>
        </div>
      </div>
    );
  }
  
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '99'
    },
    modal: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      position: 'relative',
      width: '80%',
      maxWidth: '800px'
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'transparent',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer'
    }
  };
  
  export default Model;
// export default function Model({ children, onClose }) {   

//   return ReactDom.createPortal(
//     <>
//       <div/>
//       <div>
//         <button className='btn bg-danger fs-4' style={{ marginLeft: "90%", marginTop: "-35px" }} onClick={onClose}> X </button>
//         {children}
//       </div>
//     </>,
//     document.getElementById('cart-root')
//   )
// }