const express = require('express');
require('dotenv').config();
const queues = require('./routes/queues');
const app = express();
const PORT = process.env.PORT || 30001;
const {sequelize} = require('./models');
const routes = require('./routes');

app.use(express.json());


(async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        await sequelize.sync({ force: false });
        console.log('Database synchronized.');

        await queues();
        console.log('RabbitMQ connected.');
    } catch (e) {
        console.warn(e.message);
    }

})();


app.use('/', routes);


app.listen(PORT, () => {
    console.log(`History service running on http://localhost:${PORT}`);
});

