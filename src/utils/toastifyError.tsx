import { toast } from "react-toastify";
export const toastifyError = () => {
  toast.error(
    "😟 Sorry an issue occurred on our end. Rest assured we are working on it!",
    {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }
  );
};
