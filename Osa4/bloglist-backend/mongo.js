/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]

//Blogien lisääminen tässä alla
/*
const title = process.argv[3]
const author = process.argv[4]
const blogUrl = process.argv[5]
const likes = process.argv[6]

const url =
  `mongodb+srv://jani:${password}@part4-bloglist.2j6h7g7.mongodb.net/testBloglist?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: title,
  author: author,
  url: blogUrl,
  likes: likes
})

if(process.argv.length > 3){
  blog.save().then(result => {
    console.log(`added blog: ${title} from ${author} on site: ${blogUrl} with ${likes} likes`)
    mongoose.connection.close()
  })
}

if(process.argv.length === 3){
  console.log('Bloglist-test:')
  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(`${blog.title} ${blog.author} ${blog.url} ${blog.likes}`)
    })
    mongoose.connection.close()
  })
}*/

//Käyttäjien lisääminen tässä alla

const username = process.argv[3]
const name = process.argv[4]
const passwordHash = process.argv[5]

const url =
  `mongodb+srv://jani:${password}@part4-bloglist.2j6h7g7.mongodb.net/user?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
})

const User = mongoose.model('User', userSchema)

const user = new User({
  username: username,
  name: name,
  passwordHash: passwordHash
})

if(process.argv.length > 3){
  user.save().then(result => {
    console.log(`added user: ${username} whose name is: ${name} with pass: ${passwordHash}`)
    mongoose.connection.close()
  })
}

if(process.argv.length === 3){
  console.log('users:')
  User.find({}).then(result => {
    result.forEach(user => {
      console.log(`${user.username} ${user.name} ${user.passwordHash}`)
    })
    mongoose.connection.close()
  })
}