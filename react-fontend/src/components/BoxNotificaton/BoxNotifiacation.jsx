import React, { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import "./BoxNotification.scss";

const SuccessToast = ({
  message = "Thành công!",
  status,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={status ? "success-toast-true" : "success-toast-false "}>
      {status ? (
        <FaCheck className="icon" />
      ) : (
        <VscChromeClose className="icon" />
      )}

      <span>{message}</span>
    </div>
  );
};

export default SuccessToast;