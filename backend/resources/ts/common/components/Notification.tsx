import React, { useEffect, useState } from "react";

export interface INotification {
  title: string,
  text: string,
  isShow: boolean
}


function Notification(props: INotification):JSX.Element {
  const [display, setDisplay] = useState<"none"|"block">("none")
  const [date] = useState<Date>(new Date())

  useEffect(() => {
    props.isShow?setDisplay("block"):setDisplay("none")
    const hideTimeout = setTimeout(() => setDisplay("none"), 3000)
    return () => {
      clearTimeout(hideTimeout)
    }
  }, [props.isShow])
  
  return (
    <div className="toast-wrapper" style={{display}}>
      <div className="toast" key={`notification`}>
        <div className="toast-header">
          <i className="fas fa-fw fa-bell"></i>
          <strong className="mr-auto">{props.title}</strong>
          <small>{date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</small>
          <button type="button"
            className="ml-2 mb-1 close"
            data-dismiss="toast"
            aria-label="Close"
            onClick={() => setDisplay("none")}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="toast-body">
          {props.text}
        </div>
      </div> 
    </div>
  );
}

export default Notification;
