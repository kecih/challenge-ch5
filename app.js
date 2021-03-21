const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true})); 
app.use('/public', express.static('public'))

const readJson = fs.readFileSync('./data/user.json');
const user = JSON.parse(readJson);

app.get('/login', (req, res) => {
    const notif = req.query.notif
    res.render('login', {notif : notif})
})

app.post('/login', (req, res) => {
    const {username, password} = req.body
    // console.log(username + password)
    if(username == user[0].username || password == user[0].password){
        res.redirect('index')
    }else{
        res.redirect('login?notif=fail')
    }
})

app.get('/index', (req, res) => {
    res.render('index')
});

app.get('/game', (req, res) => {
    res.render('game')
})

app.get('/gagal', (req, res) => {
    res.render('gagal')
})
app.listen(port, ()=> {
    console.log(`Listening at port ${port}`)
})