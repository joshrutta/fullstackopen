import { useDispatch, useSelector } from 'react-redux'
import { addVoteToAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

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
                        dispatch(addVoteToAnecdote(anecdote))
                        // dispatch(setNotification(`you voted '${anecdote.content}'`))
                        dispatch(notify(`you voted '${anecdote.content}'`, 5))
                    }}>vote</button>
                </div>
            </div>
        )
    )
}

export default AnecdoteList