import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  // console.log('notification');
  // console.log(notification);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    notification.content ? <div style={style}>
      {notification.content}
    </div> : <div></div>
  )
}

export default Notification