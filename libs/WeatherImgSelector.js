
var WEATHER_IMAGES = [
    {
        title: 1,
        file: require('../components/imgs/1.png')
    },
    {
        title: 2,
        file: require('../components/imgs/2.png')
    },
    {
        title: 3,
        file: require('../components/imgs/3.png')
    },
    {
        title: 21,
        file: require('../components/imgs/21.png')
    },
    {
        title: 22,
        file: require('../components/imgs/22.png')
    },
    {
        title: 23,
        file: require('../components/imgs/23.png')
    },
    {
        title: 31,
        file: require('../components/imgs/31.png')
    },
    {
        title: 32,
        file: require('../components/imgs/32.png')
    },
    {
        title: 33,
        file: require('../components/imgs/33.png')
    },
    {
        title: 41,
        file: require('../components/imgs/41.png')
    },
    {
        title: 42,
        file: require('../components/imgs/42.png')
    },
    {
        title: 43,
        file: require('../components/imgs/43.png')
    },
    {
        title: 51,
        file: require('../components/imgs/51.png')
    },
    {
        title: 52,
        file: require('../components/imgs/52.png')
    },
    {
        title: 53,
        file: require('../components/imgs/53.png')
    },
    {
        title: 61,
        file: require('../components/imgs/61.png')
    },
    {
        title: 62,
        file: require('../components/imgs/62.png')
    },
    {
        title: 63,
        file: require('../components/imgs/63.png')
    },
    {
        title: 64,
        file: require('../components/imgs/64.png')
    },
    {
        title: 71,
        file: require('../components/imgs/71.png')
    },
    {
        title: 72,
        file: require('../components/imgs/72.png')
    },
    {
        title: 73,
        file: require('../components/imgs/73.png')
    },
    {
        title: 81,
        file: require('../components/imgs/81.png')
    },
    {
        title: 82,
        file: require('../components/imgs/82.png')
    },
    {
        title: 83,
        file: require('../components/imgs/83.png')
    },
    {
        title: 91,
        file: require('../components/imgs/91.png')
    },
    {
        title: 92,
        file: require('../components/imgs/92.png')
    }
];

/**
 * Finds correct weather image. Title equals FMI api's weathersymbol
 * @param {*} title 
 */
export default function(title) {
    var importImgFrom = WEATHER_IMAGES.find((obj) => {
        return obj.title == title;
    });
    return importImgFrom;
}