describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'test user',
            username: 'test',
            password: 'test'
        }

        const user2 = {
            name: 'test user2',
            username: 'test2',
            password: 'test2'
        }

        cy.request('POST', 'http://localhost:3000/api/users/', user)
        cy.request('POST', 'http://localhost:3000/api/users/', user2)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        cy.contains('Blogs')
        cy.contains('login')
    })

    it('login form can be opened', function() {
        cy.contains('login').click()
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('test')
            cy.get('#password').type('test')
            cy.get('#login-button').click()

            cy.contains('test user logged in')
        })

        it('fails with incorrect credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('test')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error').should('contain', 'Wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })
    })

    describe('when logged in', function () {
        beforeEach(function() {
            cy.login({ username: 'test', password: 'test' })
        })

        it('a new blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('test title')
            cy.get('#author').type('test author')
            cy.get('#url').type('test url')
            cy.contains('create').click()
            cy.get('.success').should('contain', 'a new blog "test title" by test author added')
                .and('have.css', 'color', 'rgb(0, 128, 0)')
                .and('have.css', 'border-style', 'solid')

            cy.get('#blog').contains('test title')
        })

        describe('and a blog exists', function() {
            beforeEach(function() {
                cy.createBlog({ title: 'test blog 1', author: 'test author 1', url: 'www.blags.com' })
            })

            it('it can be liked', function () {
                cy.get('#blog').contains('view').click()
                cy.get('#like-button').click()
                cy.get('#likes').contains('likes 1')
            })

            it('it can be deleted by the user that created it', function () {
                cy.get('#blog').contains('view').click()
                cy.get('#remove-button').click()

                cy.get('.success').should('contain', 'a blog "test blog 1" by test author 1 was deleted')
                    .and('have.css', 'color', 'rgb(0, 128, 0)')
                    .and('have.css', 'border-style', 'solid')

                cy.get('#blog').should('not.exist')

            })

            it('it can not be deleted by a user that did not create it', function () {
                cy.get('#logout-button').click()
                cy.login({ username: 'test2', password: 'test2' })
                cy.get('#blog').contains('view').click()
                cy.get('#remove-button').click()


                cy.get('.error').should('contain', 'Error deleting blog')
                    .and('have.css', 'color', 'rgb(255, 0, 0)')
                    .and('have.css', 'border-style', 'solid')

                cy.get('#blog').should('exist')

            })

            it('blogs are ordered by likes', function () {
                // like first blog
                cy.get('.blog').eq(0).contains('view').click()
                cy.get('#like-button').click()
                cy.get('#likes').contains('likes 1')
                // add second blog
                cy.createBlog({ title: 'test blog 2', author: 'test author 2', url: 'test url 2' })
                // assert order is first blog then second blog
                cy.get('.blog').eq(0).contains('test blog 1')
                cy.get('.blog').eq(1).contains('test blog 2')
                // like second blog twice
                cy.get('.blog').eq(1).contains('view').click()
                cy.get('.blog-expanded').eq(1).find('#like-button').click()
                cy.get('.blog-expanded').eq(1).get('#likes').contains('likes 1')
                cy.get('.blog-expanded').eq(1).get('#like-button').click()
                cy.get('.blog-expanded').eq(1).get('#likes').contains('likes 2')
                // assert order is second blog then first blog
                cy.get('.blog').eq(0).contains('test blog 2')
                cy.get('.blog').eq(1).contains('test blog 1')

            })
        })
    })
})