import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification.message === null) {
    return null;
  }

  if (notification.messageType === "error") {
    return <div className="error">{notification.message}</div>;
  }

  if (notification.messageType === "success") {
    return <div className="success">{notification.message}</div>;
  }
};

export default Notification;
