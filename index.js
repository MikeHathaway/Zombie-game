const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const app = express()

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (request, response) => {
  response.render('home', {
    name: 'Mike'
  })
})


app.listen(3000)
