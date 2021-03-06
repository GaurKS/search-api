const express = require('express');
const bodyParser = require('body-parser');
const db = require("./src/models");
const initRoutes = require("./src/routes/state.routes");
// const { database } = require('./database');
const port = process.env.SERVER_PORT || 3000;

global.__basedir = __dirname + "/..";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
initRoutes(app);
db.sequelize.sync()
    .then(() => {
        console.log("Databases loaded with States data");
    })
// db.sequelize.sync({ force: true })
//     .then(() => {
//         console.log("Drop and re-sync db.");
//     })

app.listen(port, () => {
    console.log(`Server up and Running on port ${port}`)
});

