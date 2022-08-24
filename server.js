const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');


const app = express();
const PORT = process.env.PORT || 3001;

//this is importing the connection to sequelize
const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess ={
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

//will look for an index.js file
const routes = require('./controllers');

//for handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));



//turn on routes
app.use(routes);

//turn on connection to db and server, sync means sequelize
//is taking the models and connecting them to associated database tables
//it will create a table for you if none is found. When force is 
//set to true it will drop and recreate database tables on startup like DROP TABLE IF EXISTS
sequelize.sync({ force: false }).then(()=> {
    app.listen(PORT, () => console.log('Now listening'));
});