const dayjs = require('dayjs');
require('dayjs/locale/fr')
//const utc = require('dayjs/plugin/utc');
//const timezone = require('dayjs/plugin/timezone');

dayjs.locale('fr');

//dayjs.extend(utc);
//dayjs.extend(timezone);
//dayjs.tz.setDefault("Europe/Paris");

const formatLong = (date) => {
    date = dayjs(date).format('dddd D MMMM YYYY à H:mm');
    return date;
}

const formatLongBDD = () => {
    date = dayjs(new Date).format('dddd D MMMM YYYY H:mm:ss');
    return date;
}

const formatToast = () => {
    date = dayjs(new Date).format('H:mm');
    return date;
}



module.exports = {
    formatLong,
    formatLongBDD,
    formatToast,
}