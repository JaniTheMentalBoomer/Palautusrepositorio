import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('BlogForm component', () => {
  test('creates new blog succesfully', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()
    const wrapper = render(<BlogForm blogObject={createBlog} />)

    const input1 = wrapper.getByPlaceholderText('write blog title here')
    const input2 = wrapper.getByPlaceholderText('write blog url here')
    const createButton = wrapper.getByText('create')

    await user.type(input1, 'janin testi')
    await user.type(input2, '1234')

    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('janin testi')
    expect(createBlog.mock.calls[0][0].url).toBe('1234')
  })
})
