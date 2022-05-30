const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(todoRoutes)

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://Armen:qA8U8jZHL8uXYESi@cluster0.uu6al.mongodb.net/todos?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      }
    )
    app.listen(PORT, () => {
      console.log('Server hes been started...')
    })
  } catch (e) {
    console.log(e)
  }
}

start()
