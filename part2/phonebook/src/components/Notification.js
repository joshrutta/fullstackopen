import NotificationType from "../NotificationType"

const Notification = ({ notificationInfo }) => {
    const successNotificationStyle = {
        color: 'green',
        backgroundColor: 'lightGray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const errorNotificationStyle = {
        color: 'red',
        backgroundColor: 'lightGray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (notificationInfo === null) {
        return null
    }

    if (notificationInfo.notificationType === NotificationType.Success) {
        return (
            <div style={successNotificationStyle}>
                {notificationInfo.message}
            </div>
        )
    } else {
        return (
            <div style={errorNotificationStyle}>
                {notificationInfo.message}
            </div>
        )
    }
}

export default Notification