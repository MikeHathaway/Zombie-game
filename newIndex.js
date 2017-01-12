const express = require("express")

const app = express();

//app.set('views', path.join(__dirname, 'views'))

//app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('newIndex', { title: 'Hey', message: 'Hello there!' })
})

app.listen(4000)
