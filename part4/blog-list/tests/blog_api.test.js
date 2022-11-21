const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

var user1Info
var user2Info

const userSetUp = async (userName, name, password) => {
    var userId
    var authToken
    newUser = {
        username: userName,
        name: name,
        password: password
    }
    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .then((res) => {
            userId = res.body.id
        })

    await api
        .post('/api/login')
        .send({
            username: newUser.username,
            password: newUser.password
        })
        .expect(200)
        .then((res) => {
            authToken = res.body.token;
        })
    return { userId, authToken }
}

// user setup so we can get an authentication token
beforeAll(async () => {
    user1Info = await userSetUp('test_user', 'test_user', 'test_pass')
    user2Info = await userSetUp('test_user2', 'test_user2', 'test_pass2')

}, 10000)

// user teardown
afterAll(async () => {
    await api
        .delete(`/api/users/${user1Info.userId}`)
        .expect(204)

    await api
        .delete(`/api/users/${user2Info.userId}`)
        .expect(204)
})

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjectsWithUser = helper.initialBlogs.map(blog => {
        blog.user = mongoose.Types.ObjectId(user1Info.userId)
        return blog
    })
    const blogObjects = blogObjectsWithUser.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog post contains id field', async () => {
    const blogsFromDb = await helper.blogsInDb()
    expect(blogsFromDb[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }

    await api
        .post('/api/blogs')
        .auth(user1Info.authToken, { type: 'bearer' })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const urls = blogsAtEnd.map(blog => blog.url)
    expect(urls).toContain(newBlog.url)
}, 100000)

test('blog request without likes defaults to zero likes', async () => {
    const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    }

    await api
        .post('/api/blogs')
        .auth(user1Info.authToken, { type: 'bearer' })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const newBlogAtEnd = blogsAtEnd.filter(blog => blog.url === newBlog.url)[0]
    expect(newBlogAtEnd.likes).toEqual(0)
})

test('blog requests must contain title and url', async () => {
    const newBlogWithoutTitle = {
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    }

    const newBlogWithoutUrl = {
        title: "Type wars",
        author: "Robert C. Martin",
    }

    await api
        .post('/api/blogs')
        .auth(user1Info.authToken, { type: 'bearer' })
        .send(newBlogWithoutTitle)
        .expect(400)

    await api
        .post('/api/blogs')
        .auth(user1Info.authToken, { type: 'bearer' })
        .send(newBlogWithoutUrl)
        .expect(400)
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .auth(user1Info.authToken, { type: 'bearer' })
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const urls = blogsAtEnd.map(r => r.url)

        expect(urls).not.toContain(blogToDelete.url)
    })

    test('delete fails without token', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length
        )

        const urls = blogsAtEnd.map(r => r.url)

        expect(urls).toContain(blogToDelete.url)
    })
    test("delete fails when wrong user tries to delete", async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .auth(user2Info.authToken, { type: 'bearer' })
            .expect(403)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length
        )

        const urls = blogsAtEnd.map(r => r.url)

        expect(urls).toContain(blogToDelete.url)
    })
})

describe('updating individual blog post', () => {
    test('succeeds with status 200 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const updatedBlog = {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 8,
        }
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        const updatedBlogAtEnd = blogsAtEnd.filter(blog => blog.url === updatedBlog.url)[0]
        expect(updatedBlogAtEnd.likes).toEqual(updatedBlog.likes)

    })
})