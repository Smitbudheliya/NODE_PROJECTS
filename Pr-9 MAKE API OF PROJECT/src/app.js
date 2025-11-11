const express = require('express');
const morgan = require('morgan');
const cors = require('cors');     
const db = require('./config/db'); 

const app = express();
const port = 8005;

db();

app.use(cors({
  origin: "attach_frontend_link_here"
}));

app.use(morgan('combined'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes/index.routes'));

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server is running at http://localhost:${port}`);
});
 