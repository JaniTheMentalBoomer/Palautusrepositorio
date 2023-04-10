/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if(blogs.length === 0){
    return 0
  } else {
    return blogs.reduce((sum, like) => sum + like.likes, 0)
  }
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0){
    return 0
  } else {
    return Math.max(...blogs.map(blog => blog.likes))
  }
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0){
    return 0
  } else {
    const authorBlogCount = blogs.reduce((count, blog) => {
      count[blog.author] = (count[blog.author] || 0) + 1
      return count
    }, {})

    let authorWithMostBlogs = ''
    let mostBlogs = 0
    Object.keys(authorBlogCount).forEach(author => {
      if (authorBlogCount[author] > mostBlogs) {
        authorWithMostBlogs = author
        mostBlogs = authorBlogCount[author]
      }
    })

    return {
      author: authorWithMostBlogs,
      blogs: mostBlogs
    }
  }
}

const mostLikes = (blogs) => {
  if(blogs.length === 0){
    return 0
  } else {
    const authorLikeCount = blogs.reduce((count, blog) => {
      count[blog.author] = (count[blog.author] || 0) + blog.likes
      return count
    }, {})

    let authorWithMostLikes = ''
    let mostLikes = 0
    Object.keys(authorLikeCount).forEach(author => {
      if (authorLikeCount[author] > mostLikes) {
        authorWithMostLikes = author
        mostLikes = authorLikeCount[author]
      }
    })

    return { author: authorWithMostLikes, likes: mostLikes }
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}