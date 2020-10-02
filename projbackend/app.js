require('dotenv').config();

const express      = require('express');
const app          = express();
const mongoose     = require('mongoose');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const cors         = require('cors');

//Load router modules
const authRoutes   = require('./routes/auth');

//DB Connection
mongoose
    .connect(process.env.DATABASE,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(()=>{
        console.log("DB CONNECTED");
    })
    .catch(err => {
        console.log(Error, err.message);
    });


//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
    
//My Routes
app.use('/api',authRoutes);

//PORT
const port = process.env.PORT || 3000; 

//Starting a server
app.listen(port, ()=>{
    console.log(`app is running at ${port}`);
});