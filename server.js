require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const connectDB = require('./config/db');
const appRoutes = require('./routes/appRoutes');

const app = express();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: false }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use('/', appRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));