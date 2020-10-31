const fetch = require('node-fetch');

const stravaUsers = {
    raj: {
        athleteID: "<ATHLETE_ID>",
        info: {
            id: "<CLIENT_ID>",
            secret: "<CLIENT_SECRET>",
            refresh: "<RESFRESH_TOKEN>",
        }
    },
    ross: {
        athleteID: "<ATHLETE_ID>",
        info: {
            id: "<CLIENT_ID>",
            secret: "<CLIENT_SECRET>",
            refresh: "<RESFRESH_TOKEN>",
        }
    },
    cally: {
        athleteID: "<ATHLETE_ID>",
        info: {
            id: "<CLIENT_ID>",
            secret: "<CLIENT_SECRET>",
            refresh: "<RESFRESH_TOKEN>",
        }
    }
};

const stravaFetchData = async (clientID, secret, refreshToken) => {
    let stravaData;
    const authLink = "https://www.strava.com/oauth/token";
    let token = "";

    await fetch(authLink, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: clientID,
            client_secret: secret,
            refresh_token: refreshToken,
            grant_type: "refresh_token",
        })
    }).then(res => res.json())
        .then(res => token = res.access_token);

    const activitiesLink = "https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=" + token;
    await fetch(activitiesLink)
        .then(res => res.json())
        .then(res => {
            stravaData = res;
        });
    return stravaData;
};

const stravaDataCleaner = (data) => {
    const newData = [];
    data.forEach(d => {
        const obj = {
            "resource_state": d.resource_state,
            "athlete":{
                "id": d.athlete.id,
                "resource_state": d.athlete.resource_state
            },
            "name": d.name,
            "distance": d.distance,
            "moving_time": d.moving_time,
            "elapsed_time": d.elapsed_time,
            "total_elevation_gain": d.total_elevation_gain,
            "type": d.type,
            "workout_type": d.workout_type,
            "start_date": d.start_date,
            "start_date_local": d.start_date_local,
            "timezone": d.timezone,
            "average_speed": d.average_speed,
            "max_speed": d.max_speed,
            "elev_high": d.elev_high,
            "elev_low": d.elev_low
        };
        newData.push(obj);
    });

    return newData;
};

module.exports = {stravaUsers, stravaFetchData, stravaDataCleaner};