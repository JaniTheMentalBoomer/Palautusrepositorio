const Blog = require('../models/blog')
const User = require('../models/user')

const mockData = [
  {
    title: 'terveyskirjasto',
    author: 'Miika',
    url: 'www.test.fi',
    likes: 15,
    id: '643431648a29717fa826b47dxx1'
  },
  {
    title: 'tarvikekauppa',
    author: 'Sini',
    url: 'www.diipadaapa.fi',
    likes: 20,
    id: '643431648a29717fa826b47dxx2'
  },
  {
    title: 'Spiritual-energy',
    author: 'Bob',
    url: 'www.pilvilinna.fi',
    likes: 5,
    id: '643431648a29717fa826b47dxx3'
  },
]

const mockUsers = [
  {
    username: 'boomer',
    _id: 123456,
    blogs: [221212, 221255],
  },
  {
    username: 'jani',
    _id: 12121212,
    blogs: [221244],
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  mockData, mockUsers, nonExistingId, blogsInDb, usersInDb
}