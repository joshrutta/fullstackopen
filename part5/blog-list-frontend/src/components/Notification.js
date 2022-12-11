const Notification = ({ message, messageType }) => {
    if (message === null) {
        return null
    }

    if (messageType === 'error') {
        return (
            <div className='error'>
                {message}
            </div>
        )
    }

    if (messageType === 'success') {
        return (
            <div className='success'>
                {message}
            </div>
        )
    }
}

export default Notification