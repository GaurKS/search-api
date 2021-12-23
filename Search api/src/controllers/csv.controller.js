const db = require("../models");
const State = db.states;
const fs = require("fs");
const csv = require("fast-csv");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let states = [];  //empty data array to store parsed rows from csv file
    let path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        states.push(row);
      })
      .on("end", () => {
        State.bulkCreate(states)
          .then(() => {
            res.status(200).send({
              message:
                "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
    } 
    catch (error) {
        console.log(error);
        res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
        });
    }
};


const redis = require('redis');
const config = require('../config/redis.config');
const client = redis.createClient({
    host: config.HOST,
    port: config.PORT,
    password: config.PASSWORD 
});
const {promisify} = require('util');
const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.setex).bind(client);
client.on('error', err => {
  console.log('Error ' + err);
});

async function getByStates(req, res) {
    const reply = await GET_ASYNC('state')
    if (reply){
      console.log('using cache');
      res.send(JSON.parse(reply));
      return
    }

    let reqData = req.query.state;
    reqData = reqData[0].toUpperCase() + reqData.slice(1);

    const response = await State.findAll({
      where: {state: reqData}
    });
    const saveResult = await SET_ASYNC('state', 30 , JSON.stringify(response) );
    console.log('new data cached', saveResult);
    return res.send(response);
}


module.exports = {upload, getByStates};