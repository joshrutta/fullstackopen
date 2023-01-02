import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter.filter)

    return (
        anecdotes.filter(anecdote => anecdote.content.includes(filter)).map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => {
                        dispatch(vote(anecdote.id))
                        dispatch(setNotification(`you voted '${anecdote.content}'`))
                        setTimeout(() => dispatch(setNotification('')), 5 * 1000)
                    }}>vote</button>
                </div>
            </div>
        )
    )
}

export default AnecdoteList