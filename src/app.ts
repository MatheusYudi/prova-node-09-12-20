import express from 'express';
import bodyParser from 'body-parser';

// App
const app = express();
const port: number = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const indexRoutes = require('./api/routes/index-routes');
indexRoutes(app);

const userRoutes = require('./api/routes/user-routes');
userRoutes(app);

app.listen(port, () => console.log(`Server running on port: ${port}`));