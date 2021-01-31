const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/users', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
    console.log('Database Connected');
});

module.exports = mongoose;