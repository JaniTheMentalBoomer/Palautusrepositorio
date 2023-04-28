import { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification('login successful')
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    } catch (exception) {
      setNotification('error: wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()
    window.location.reload()
  }

  const LogoutButton = () => <button onClick={handleLogout}>logout</button>
  const blogFormRef = useRef()

  const AddBlog = async (BlogToAdd) => {
    blogFormRef.current.toggleVisibility()
    try {
      const addBlog = await blogService.create(BlogToAdd)
      setNotification(`Blogi ${BlogToAdd.title} lisätty onnistuneesti!`)
      setBlogs(blogs.concat(addBlog))
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    } catch (exception) {
      setNotification(
        `Error: Blogin ${BlogToAdd.title} lisäämisessä tapahtui virhe!`
      )
      setNotification(null)
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    }
  }

  const deleteBlog = async (BlogToDelete) => {
    try {
      if (window.confirm(`Poistetaanko blogi: ${BlogToDelete.title} ?`)) {
        blogService.remove(BlogToDelete.id)
        setNotification(`Blogin: ${BlogToDelete.title}, poistaminen onnistui!`)
        setBlogs(blogs.filter((b) => b.id !== BlogToDelete.id))
        setTimeout(() => {
          setNotification(null)
        }, 4000)
      }
    } catch (exception) {
      setNotification(`Error: blogia: ${BlogToDelete.title}, ei voitu poistaa!`)
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    }
  }

  const updateBlog = async (BlogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(BlogToUpdate)
      setNotification(`Blogin: ${BlogToUpdate.title}, päivittäminen onnistui!`)
      setBlogs(blogs.map((b) => (b.id !== BlogToUpdate.id ? b : updatedBlog)))
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    } catch (exception) {
      setNotification(
        `Error: Blogia: ${BlogToUpdate.title}, ei voitu päivittää!`
      )
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    }
  }

  return (
    <div>
      <Notification message={notification} />
      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      )}
      {user && (
        <div>
          <h1>Bloglist-app</h1>
          <p>
            {user.name} logged in <LogoutButton />
          </p>
          <Togglable
            buttonLabel="new blog"
            buttonLabel2="close"
            ref={blogFormRef}
          >
            <BlogForm blogObject={AddBlog} />
          </Togglable>
          <h2>blogs:</h2>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog, index) => (
              <Blog
                key={`${blog.title}-${index}`}
                blog={blog}
                handleRemove={deleteBlog}
                handleUpdate={updateBlog}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
