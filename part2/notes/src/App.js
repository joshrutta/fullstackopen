import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import NoteForm from './components/NoteForm'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        noteService.getAll().then(initialNotes => {
            setNotes(initialNotes)
        })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )

            noteService.setToken(user.token)

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(n => n.id !== id ? n : returnedNote))
            })
            .catch(error => {
                console.log('error: ', error)
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }
    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    const loginForm = () => (
        <Togglable buttonLabel='login'>
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleLogin={handleLogin}
            />
        </Togglable>
    )

    const addNote = (noteObject) => {
        noteFormRef.current.toggleVisibility()
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
            }).catch(exception => {
                setErrorMessage(exception.response.data.error)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    }

    const noteFormRef = useRef()

    const noteForm = () => (
        <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm
                createNote={addNote}
            />
        </Togglable>
    )

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />

            {user === null ?
                loginForm() :
                <div>
                    <p>{user.name} logged in</p>
                    {noteForm()}
                </div>
            }

            <div>
                <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                )}
            </ul>
            {user !== null &&
      <button onClick={() => {
          window.localStorage.removeItem('loggedNoteappUser')
          setUser(null)
      }}>
        logout
      </button>}
            <Footer />
        </div>
    )
}

export default App