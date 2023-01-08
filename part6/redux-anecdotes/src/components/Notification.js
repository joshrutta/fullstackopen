import { connect } from 'react-redux'
const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    props.notifications.content ? <div style={style}>
      {props.notifications.content}
    </div> : <div></div>
  )
}

const mapStateToProps = (state) => {
  return { notifications: state.notifications }
}

export default connect(mapStateToProps, null)(Notification)