import express from 'express';
import bodyParser from 'body-parser';

// App
const app = express();
const port: number = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const userRoutes = require('./api/routes/user-routes');
const indexRoutes = require('./api/routes/index-routes');

userRoutes(app);
indexRoutes(app);

app.listen(port, () => console.log(`Server running on port: ${port}`));