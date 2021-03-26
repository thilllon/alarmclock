require('dotenv').config();
const { default: axios } = require('axios');
const express = require('express');
const cors = require('cors');
const { AlarmModel } = require('./model');
const shortid = require('shortid');
require('./database').connectDB();

const port = process.env.PORT;
const period = 25 * 60 * 1000;
// const period = 2 * 1000;

const app = express()
  .use(cors())
  .get('/', async (req, res) => {
    // console.info('get');
    const url = process.env.TARGET_URL;
    const clock = setInterval(() => {
      axios({ method: 'GET', url }).then((res) => {
        console.info(res.data);
        return new AlarmModel({
          time: new Date().toString(),
          url,
          status: res.status,
          statusText: res.statusText,
        }).save();
      });
    }, period);
    console.info(clock);
    res.send(`Alarm! ${shortid.generate()}`);
  })
  .get('/history', async (req, res) => {
    const { limit = 10 } = req.query;
    console.info(limit);

    const alarmHistory = await AlarmModel.find(
      {},
      { _id: 0, createdAt: 1, status: 1, statusText: 1, url: 1, time: 1 },
      { limit, sort: { epoch: -1 } }
    ).exec();

    console.info(alarmHistory);
    res.status(201).json(alarmHistory);
  })
  .listen(port, () => {
    console.info('Listen on PORT:', port);
  });
