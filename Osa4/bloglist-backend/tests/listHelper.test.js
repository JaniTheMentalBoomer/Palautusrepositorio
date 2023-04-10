const listHelper = require('../utils/list_helper')

const blogs = [
  {
    title: 'First Blog',
    author: 'Pekka',
    url: 'http://www.test1234.fi',
    likes: 10,
    id: '6433d39d45858d8eb2669015',
  },
  {
    title: 'Second blog',
    author: 'Minna',
    url: 'http://www.kahvila.fi',
    likes: 20,
    id: '6433d3ed45858d8eb266901a',
  },
  {
    title: 'Third blog',
    author: 'Mehmet',
    url: 'http://www.EpicGamer.com',
    likes: 5,
    id: '6433d41645858d8eb266901c',
  },
  {
    title: 'Fourth blog',
    author: 'Uuno',
    url: 'http://www.Kukkakauppa.com',
    likes: 8,
    id: '6433e88910225f6cea76941e',
  },
  {
    title: 'Fifth blog',
    author: 'Uuno',
    url: 'http://www.EssonBaari.fi',
    likes: 50,
    id: '6433e8d710225f6cea769421',
  }
]

test('dummy returns one', () => {

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const oneBlog = blogs[0]
    const result = listHelper.totalLikes([oneBlog])
    expect(result).toBe(10)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(93)
  })
})

describe('Favorite blog', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('of a bigger list is calculated right', () => {
    const blogWithMostLikes = blogs[4]
    const blogRank = listHelper.favoriteBlog(blogs)
    const favoriteBlog = blogs.find(b => b.likes === blogRank)
    expect(favoriteBlog).toEqual(blogWithMostLikes)
  })
})

describe('Author with most blogs', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('of a bigger list is calculated right', () => {
    const mostBlogs = listHelper.mostBlogs(blogs)
    console.log(mostBlogs)
    expect(mostBlogs).toEqual({
      author: 'Uuno',
      blogs: 2
    })
  })
})

describe('Author with most likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('of a bigger list is calculated right', () => {
    const mostLikes = listHelper.mostLikes(blogs)
    console.log(mostLikes)
    expect(mostLikes).toEqual({
      author: 'Uuno',
      likes: 58
    })
  })
})