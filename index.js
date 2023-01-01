
const express = require('express');
const app = express();
const path= require('path');
const morgan= require('morgan');
const route = require('./routes');
const cors = require('cors')
const port = process.env.port || 4000;
require('dotenv').config()
const db= require('./config/dbconnect')
const cookieParser = require('cookie-parser')
db.connected();
app.use(express.static("img"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'img')));
app.use(morgan('combined'))
app.use(cookieParser())
const whitelist = ['http://localhost:4000','http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

route(app);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

