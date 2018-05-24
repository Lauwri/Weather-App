/**
 * Parses xml data with xml2js library
 * @param {*} xml data to parse
 * @param {*} cb done callback
 */
export function parseXmlData(xml, cb) {
    const parseString = require('react-native-xml2js').parseString;
    parseString(xml, (err, result) => {
        if(err) {
            return cb(err);
        } else {
            return cb(null, result);
        }
    });
}

//array is split by date, which hours are 00 in local time
export function groupData(array) {
    var groups = [];
    groupIndx = -1;

    array.forEach((element,i) => {
        if(element.time.getHours() === 0 || i === 0) {
            var group = [element];
            groups.push(group);
            groupIndx++;
        } else {
            groups[groupIndx].push(element);
        }
    });
    return groups;
}

/**
 * Tries to parse location from json.
 * @param {*} json Google geocode json
 */
export function getLocationComponent(json) {
    if (json) {
        var components = json.results[0].address_components;
        for (var i = 0; i < components.length; i++){
            if(components[i].types[0] == "locality"){
                return components[i].long_name;
            }
            if(components[i].types[0] == "administrative_area_level_3"){
                return components[i].long_name;
            }
            if(components[i].types[0] == "administrative_area_level_1"){
                return components[i].long_name;
            }
        }
    }
    return "Undefined";
}

/**
 * Builds app data from given object
 * 
 */

export function buildDataFromObject(object) {
    //let resLocation = findObject(object, 'gml:name')['gml:name'][0]._;
    let resTime = findObject(object, 'gml:beginPosition');
    let resStart = new Date(resTime['gml:beginPosition'][0]);
    let resEnd = new Date(resTime['gml:endPosition'][0]);
    //clean and sort data
    let resData = sortDataToObjects(findObject(object, 'gml:doubleOrNilReasonTupleList')
                    ['gml:doubleOrNilReasonTupleList'][0].split(" ")
                    .filter(entry => entry.trim() != ''), resStart); 

    var data = {
        timeRange: {start: resStart, end: resEnd},
        data: resData.weatherData
    };

    return data;
}

//recursive finding method
function findObject(object, searchFor) {
    if(object.hasOwnProperty(searchFor)) {
        return object;
    }
    for(var i = 0; i < Object.keys(object).length; i++){
        if(typeof object[Object.keys(object)[i]] == "object"){
            o = findObject(object[Object.keys(object)[i]], searchFor);
            if(o != null) {
                return o;
            }
        }
    }
    return null;
}

//Sorts data to array of objects
function sortDataToObjects(array, startTime, interval = 1) {
    const MISSINGVAL1 = "NaN";
    const MISSINGVAL2 = -1

    var res = {weatherData: []};
    //indx keeps track of every three
    //arrIndx kees track of current weather object index and is only updated when new object is created
    let indx = 0;
    let arrIndx = -1;
    for(var i = 0; i < array.length; i++) {
        //Missing values should only exist in the end if they do
        //if value is missing, break
        if(array[i] === MISSINGVAL1 || array[i] === MISSINGVAL2) {
            break;
        }

        //0 = Temperature, 1 = Windspeed, 2 = Weather as value
        if(indx == 0) {
            //set time for object from time and adding interval
            objectTime = new Date(startTime.getTime());
            objectTime.setHours(objectTime.getHours() + (interval * (arrIndx + 1)));
            //create new weather object and push it to weather data
            var weatherObject = {
                time: objectTime,
                temperature: Math.round(array[i], -1) + "°C",
                windspeed: 0,
                weather: 0,
            };
            res.weatherData.push(weatherObject);
            indx++;
            arrIndx++;
        } else if(indx == 1) {
            res.weatherData[arrIndx].windspeed = Math.round(array[i], -1) + " m/s";
            indx++;
        } else if(indx == 2){
            res.weatherData[arrIndx].weather = array[i];
            indx=0;
        }
    }
    return res;
}

