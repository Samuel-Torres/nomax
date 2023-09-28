import { ToastContainer, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type toastContainerProps = {
  alignment: ToastPosition;
};

const ToastWrapper = ({ alignment }: toastContainerProps) => {
  return (
    <ToastContainer
      style={{ fontSize: "1.6rem", textAlign: "center" }}
      position={`${alignment}`}
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};

export default ToastWrapper;
