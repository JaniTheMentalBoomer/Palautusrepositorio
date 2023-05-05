import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const mockData = {
  title: 'First Blog',
  author: 'Pekka',
  url: 'http://www.test1234.fi',
  likes: 12,
}

describe('Blog component', () => {
  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()

  test('renders content correctly', async () => {
    const wrapper = render(
      <Blog
        blog={mockData}
        handleRemove={deleteBlog}
        handleUpdate={updateBlog}
      />
    )

    const title = wrapper.getByText('Title: First Blog')
    expect(title).toBeDefined()
  })

  test('clicking the view-button shows all blog content', async () => {
    const wrapper = render(
      <Blog
        blog={mockData}
        handleRemove={deleteBlog}
        handleUpdate={updateBlog}
      />
    )

    const user = userEvent.setup()
    const button = wrapper.getByText('view')
    await user.click(button)

    const url = wrapper.getByText('Webpage: http://www.test1234.fi')
    expect(url).toBeDefined()

    const likes = wrapper.getByText('Likes: 12')
    expect(likes).toBeDefined()

    const author = wrapper.getByText('Author: Pekka')
    expect(author).toBeDefined()
  })

  test('clicking the upVote-button twice calls the eventhandler 2 times', async () => {
    const wrapper = render(
      <Blog
        blog={mockData}
        handleRemove={deleteBlog}
        handleUpdate={updateBlog}
      />
    )

    const user = userEvent.setup()
    const viewButton = wrapper.getByText('view')
    await user.click(viewButton)

    const upVote = wrapper.getByText('upVote')

    await user.click(upVote)

    await user.click(upVote)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})
