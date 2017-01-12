const express = require("express")

const app = express();

app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')));


app.listen(4000)
