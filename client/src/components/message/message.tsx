import React, { useState, useEffect } from 'react';
import styles from './message.module.scss'; // optional CSS file for styling

interface PopupMessageProps {
    visible: boolean
    message:string
    type: 'success' | 'error' | 'warning'
}

const PopupMessage = ({ message, type, visible}: PopupMessageProps) => {

  const getTypeClass = () => {
    switch (type) {
      case 'success':
        return styles['popup-message-success'];
      case 'error':
        return styles['popup-message-error'];
      case 'warning':
        return styles['popup-message-warning'];
      default:
        return styles['popup-message-info'];
    }
  };

  return (
    <div className={`${styles["popup-message"]} ${visible ? styles['visible'] : ''} ${getTypeClass()}`}>
      {message}
    </div>
  );
};

export default PopupMessage;
