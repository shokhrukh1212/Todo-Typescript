import { toast } from "react-toastify";
import { ToastContent } from "../types/common";

const toastContent: ToastContent = {
  position: "bottom-right",
  autoClose: 1500,
  pauseOnHover: false,
  closeOnClick: true,
};

const toastMessage = (type: string, title: string = "Successfull !!!") => {
  if (type === "success") {
    return toast.success(title, toastContent);
  }

  return toast.error(title, toastContent);
};

export default toastMessage;
