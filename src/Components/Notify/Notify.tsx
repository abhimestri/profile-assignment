import toast from "react-hot-toast";

interface NotifyProps {
  text: string;
  type?: "success" | "error";
}

const notify = ({ text, type }: NotifyProps) => {
  switch (type) {
    case "success":
      return toast.success(text);
    case "error":
      return toast.error(text);
    default:
      return toast(text);
  }
};

export default notify;
