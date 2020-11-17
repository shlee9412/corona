const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment-timezone');
const fs = require('fs');
const path = require('path');
const getData = require('./getData');
const logger = require('./logger');
const app = express();

const PORT = process.env.PORT || 3001;

morgan.token('date', (req, res, tz) => {
  return moment().tz(tz).format('yyyy-MM-DD HH:mm:ss');
});
morgan.format('custom format', '[:date[Asia/Seoul]] :remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms');
const accessLogStream = fs.createWriteStream(path.resolve(__dirname, 'log', 'access', 'access.log'), { flags: 'a' });

app.use(cors());
app.use(morgan('custom format', { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`> Running On Port ${PORT}`);

  app.post('/corona/api', (req, res) => {
    getData((err, data) => {
      if (err) {
        logger.error(err.message);
        res.json({ result: false, msg: err.message });
        return;
      }

      logger.info(JSON.stringify(data));
      res.json({ result: true, data });
    });
  });
});