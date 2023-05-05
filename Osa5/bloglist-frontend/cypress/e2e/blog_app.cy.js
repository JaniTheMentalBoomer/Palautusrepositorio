describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('')
    const user = {
      name: 'root',
      username: 'root',
      password: 'salainen',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  })

  it('login form is shown', function () {
    cy.contains('Login to the application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('login successful')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'error: wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'login successful')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'salainen' })
      cy.createBlog({
        title: 'first blog',
        author: 'Jani1',
        url: 'www.jani1.fi',
      })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Testi blogi')
      cy.get('#author').type('Bloggaaja13')
      cy.get('#url').type('www.bloggaaja13.fi')
      cy.get('#create-button').click()
      cy.get('.notification')
        .should('contain', 'Blogi Testi blogi lisätty onnistuneesti!')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('a blog can be liked', function () {
      cy.contains('Title: first blog').click()
      cy.contains('view').click()

      cy.contains('Webpage: www.jani1.fi')
      cy.contains('upVote').click()

      cy.get('.notification')
        .should('contain', 'Blogin: first blog, päivittäminen onnistui!')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('a blog can be removed', function () {
      cy.contains('Title: first blog').click()
      cy.contains('view').click()

      cy.contains('Webpage: www.jani1.fi')
      cy.contains('remove').click()

      cy.get('.notification')
        .should('contain', 'Blogin: first blog, poistaminen onnistui!')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })
  })

  describe('removing blogs', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'salainen' })
    })
    it('A blog can be created & then deleted', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('first blog')
      cy.get('#author').type('jani1')
      cy.get('#url').type('www.jani1.fi')
      cy.get('#create-button').click()
      cy.get('.notification')
        .should('contain', 'Blogi first blog lisätty onnistuneesti!')
        .and('have.css', 'color', 'rgb(0, 128, 0)')

      cy.contains('Title: first blog').click()
      cy.contains('view').click()

      cy.contains('Webpage: www.jani1.fi')
      cy.contains('remove').click()
    })
  })

  describe('sorting blogs', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'salainen' })
      cy.createBlog({
        title: 'first blog',
        author: 'Jani1',
        url: 'www.jani1.fi',
      })
      cy.createBlog({
        title: 'second blog',
        author: 'Jani2',
        url: 'www.jani2.fi',
      })
    })
    //molemmat blogit aloittavat likes: 0 ja kun second blogille annetaan 1 upVote
    //se siirtyy listan ensimmäiseksi, kuten lopussa tarkistetaan.
    it('blogs are sorted based on the amount of likes', function () {
      cy.get('.bloglist')
        .eq(0)
        .should('contain', 'Title: first blog')
        .as('firstBlog')
      cy.get('.bloglist')
        .eq(1)
        .should('contain', 'Title: second blog')
        .as('secondBlog')
      cy.get('@secondBlog').contains('view').click()
      cy.get('@secondBlog').contains('upVote').click()
      cy.wait(3000)

      cy.get('.bloglist').eq(0).should('contain', 'Title: second blog')
    })
  })
})
