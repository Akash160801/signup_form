const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const collection = require('./db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('login')
})
app.get('/signup', (req, res) => {
  res.render('signup')
})

/* sign in  */

app.post('/signup', (req, res) => {
  const { name, password } = req.body

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      await collection.insertMany({ name, password: hash })
      res.render('home')
    })
    let token = jwt.sign({ name }, 'secret')
    res.cookie('token', token)
    res.render('home')
  })
})

/* log in */

app.post('/', async (req, res) => {
  /* const data = { name: req.body.name, password: req.body.password } */
  const check = await collection.findOne({ name: req.body.name })
  bcrypt.compare(req.body.password, check.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ name: check.name }, 'secret')
      res.cookie('token', token)

      res.render('home')
    } else {
      res.render('wrong password')
    }
  })
})

/* log out */

app.get('/logout', (req, res) => {
  res.cookie('token', '')
  res.redirect('/')
})

app.listen(3000)
