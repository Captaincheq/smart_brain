const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'chirawu',
      database : 'smart_brain'
    }
  });

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req,res) => {res.send('it is working!')})

//dependence injection for signin
app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)})

 //dependence injection for register form
app.post('/register', (req, res) => { register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})
//for the Api which is in the image file
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
    console.log('app is running on port ${process.env.PORT}');
})


/* 
 / ---> res = this is working 
 / signin ---> POST = success/fail
 /  register --> POST = new user object
 /profile/: userId --> GET = user
/ image ---> PUT --> user
 / 

 */