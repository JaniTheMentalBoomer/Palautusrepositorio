import React, { useState } from 'react'

const BlogForm = ({ blogObject }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    blogObject({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input id="title" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          Author:
          <input id="author" value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          Url:
          <input id="url" value={url} onChange={handleUrlChange} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </>
  )
}

export default BlogForm
