import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title', () => {
    const blog = {
        title: 'test blog title',
        author: 'test blog author',
        url: 'www.testblog.com',
        likes: 0,
        user: 'test_user_id'
    }

    const container = render(<Blog blog={blog}/>).container
    expect(container).toHaveTextContent('test blog title')

    const div1 = container.querySelector('.blog')
    expect(div1).not.toHaveStyle('display: none')
    const div2 = container.querySelector('.blog-expanded')
    expect(div2).toHaveStyle('display: none')
})

test('renders the rest of the blog when expanded', async () => {
    const blog = {
        title: 'test blog title',
        author: 'test blog author',
        url: 'www.testblog.com',
        likes: 0,
        user: 'test_user_id'
    }

    const container = render(<Blog blog={blog} />).container

    const user = userEvent.setup()
    const button = screen.getByText('view')

    await user.click(button)

    const div1 = container.querySelector('.blog')
    expect(div1).toHaveStyle('display: none')
    const div2 = container.querySelector('.blog-expanded')
    expect(div2).not.toHaveStyle('display: none')

})

test('clicking the like button calls the handler', async () => {
    const blog = {
        title: 'test blog title',
        author: 'test blog author',
        url: 'www.testblog.com',
        likes: 0,
        user: 'test_user_id'
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleLike={mockHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByTestId('like-button')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})