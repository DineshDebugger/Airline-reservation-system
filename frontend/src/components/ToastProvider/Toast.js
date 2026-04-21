// ToastProvider.js
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function showSuccess(msg) {
  toast.success(`${msg}`, {
    position: "top-right",
    theme: "light",
    autoClose: 3000,
    hideProgressBar: true,
    pauseOnHover: false,
    closeOnClick: true,
  });
}

export function showError(msg) {
  toast.error(`${msg}`, {
    position: "top-right",
    theme: "light",
    autoClose: 3000,
    hideProgressBar: true,
    pauseOnHover: false,
    closeOnClick: true,
  });
}

export function showInfo(msg) {
  debugger;
  toast.info(`${msg}`, {
    position: "top-right",
    theme: "light",
    autoClose: 3000,
    hideProgressBar: true,
    pauseOnHover: false,
    closeOnClick: true,
  });
}

function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      theme="light"
      autoClose={3000}
      hideProgressBar={true}
      pauseOnHover={false}
      closeOnClick={true}
      //   pauseOnHover
      //   draggable
    />
  );
}

export default ToastProvider;
