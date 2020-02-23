const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Link = require('./models/link.model');
// connection db
const app = express();

// views use pug
app.set('view engine', 'pug');
app.set('views','./views');

const PORT = process.env.PORT || 3000;
// update body when get data from form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//connect db
mongoose.connect('mongodb+srv://phantom:phantom1@cluster0-ykytj.mongodb.net/test1?retryWrites=true&w=majority', {useNewUrlParser: true}).then(db => console.log('DB is Connected'));

app.get('/', async (req, res) => {
    const links = await Link.find();
    res.render('index', {links});
});
app.get('/create', (req, res) => {
    res.render('create');
});
app.post('/create', async (req, res) => {
    const link = await Link.create(req.body);
    res.redirect('/');
});
app.get('/delete/:id', async (req, res) => {
    const link = await Link.deleteOne({ _id: req.params.id});
    res.redirect('/');
});
app.use(express.static('public'));

app.listen(PORT, () => console.log(`listen ${PORT}`));