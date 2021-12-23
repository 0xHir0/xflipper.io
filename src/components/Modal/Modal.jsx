import React from "react";
import "./Modal.scss";

const Modal = ({
  type,
  size,
  message,
  name,
  description,
  children,
  handleCloseBtn,
}) => {
  // const [height, setHeight] = useState(document.documentElement.clientHeight);
  // const modalRef = useRef(null);

  // useLayoutEffect(() => {
  //   const resizeHandler = () => {
  //     setHeight(document.documentElement.clientHeight);
  //   };
  //   window.addEventListener("resize", resizeHandler);
  //   return () => window.removeEventListener("resize", resizeHandler);
  // }, []);

  return (
    <>
      <div className='modal fade show'>
        <div className={`modal-dialog ${size}`}>
          <div className='modal-content'>
            <div className='modal-header'>
              <div className='close-btn' onClick={handleCloseBtn}></div>
            </div>
            <div className='modal-body'>
              <div className='message'>{message}</div>
              <div className='name'>{name}</div>
              <div className='description'>
                {description} {children}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  );
};

export default Modal;
