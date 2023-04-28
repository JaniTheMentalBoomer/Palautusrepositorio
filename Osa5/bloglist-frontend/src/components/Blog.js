import Togglable from './Togglable'

const Blog = ({ blog, handleRemove, handleUpdate }) => {
  const removeBlog = () => {
    handleRemove(blog)
  }

  const upVote = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    handleUpdate(updatedBlog)
    console.log(updatedBlog)
  }

  return (
    <div className="bloglist">
      <div className="blogTitle">
        <h3>Title: {blog.title}</h3>
      </div>
      <div id="viewMore">
        <Togglable
          buttonLabel="view"
          buttonLabel2="hide"
          ref={blog.blogFormRef}
        >
          <p className="blog-item">Webpage: {blog.url}</p>
          <p className="blog-item">
            Likes: {blog.likes}{' '}
            <button id="likes1" onClick={upVote}>
              upVote
            </button>
          </p>
          <p className="blog-item">Author: {blog.author}</p>
          <button className="removebutton" onClick={removeBlog}>
            remove
          </button>
        </Togglable>
      </div>
    </div>
  )
}

export default Blog
