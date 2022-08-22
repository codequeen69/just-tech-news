const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

//will look for an index.js file
const routes = require('./controllers');

//this is importing the connection to sequelize
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

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