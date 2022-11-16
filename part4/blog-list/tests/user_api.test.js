const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })
})

describe('invalid user creation requests', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation of user with too short username fails', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUserWithShortUsername = {
            username: 'ml',
            name: 'Matti Luukainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUserWithShortUsername)
            .expect(400)
            .expect((res) => {
                if (res._body.error !== 'User validation failed: username: Path `username` (`ml`) is shorter than the minimum allowed length (3).') {
                    throw new Error('error message incorrect')
                }
            })


        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation of user with too short password fails', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUserWithShortPassword = {
            username: 'mlucky',
            name: 'Matti Luukainen',
            password: 'sa'
        }

        await api
            .post('/api/users')
            .send(newUserWithShortPassword)
            .expect(400)
            .expect((res) => {
                if (res._body.error !== 'password must be greater than 3 characters') {
                    throw new Error('error message incorrect')
                }
            })


        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})