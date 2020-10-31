const {stravaUsers, stravaFetchData, stravaDataCleaner} = require('./helpers');
const router = require('express').Router();

router.get('/strava/raj', async (req, res) => {
    const raj = stravaUsers.raj.info;
    const data = await stravaFetchData(raj.id, raj.secret, raj.refresh);
    const cleanData = stravaDataCleaner(data);
    res.send(cleanData);
});

router.get('/strava/ross', async (req, res) => {
    const ross = stravaUsers.ross.info;
    const data = await stravaFetchData(ross.id, ross.secret, ross.refresh);
    const cleanData = stravaDataCleaner(data);
    res.send(cleanData);
});

router.get('/strava/cally', async (req, res) => {
    const cally = stravaUsers.cally.info;
    const data = await stravaFetchData(cally.id, cally.secret, cally.refresh);
    const cleanData = stravaDataCleaner(data);
    res.send(Object.values(cleanData));
});

module.exports = router;