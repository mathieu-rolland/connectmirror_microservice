var dateformat = require('dateformat');


exports.parseWeatherResponse = function( response ){

    var weatherResponse = {};

    weatherResponse.city_info = {
        sunrise: response.city_info.sunrise,
        sunset: response.city_info.sunset
    };

    weatherResponse.current_weather = {
        date: response.current_condition.date,
        hour: response.current_condition.hour,
        condition: response.current_condition.condition,
        maximal: response.fcst_day_0.tmax,
        minimal: response.fcst_day_0.tmin,
        image: response.fcst_day_0.icon_big
    };

    /*Get current weather : */
    var hourStart = dateformat( Date() , 'H' )
    var hourKey =  hourStart + 'H00';

    var data;
    if( hourKey === '0H00' ){
        data = response.fcst_day_1;
    }else{
        data = response.fcst_day_0;
    }
    
    if( data.hourly_data[hourKey] != undefined ){
        weatherResponse.current_weather.temperature = data.hourly_data[hourKey].TMP2m;
    }

    /*Get weather for previous hour and next hours (depending of i value)*/
    weatherResponse.daily = Array();
    for( var i = 0 ; i < 6 ; i++ ){

        /*In case of 24h00 reach : start to 0h00 next day*/
        if( (parseInt(hourStart) + i - 1) == 24 ) {
            hourStart = 0 - i + 1;
            data = response.fcst_day_1
        }

        hourKey = ( parseInt(hourStart) + i - 1) + 'H00';
        weatherResponse.daily.push( {
            'hour' : hourKey,
            'image': data.hourly_data[hourKey].ICON,
            'temperature' : data.hourly_data[hourKey].TMP2m
      } );
    }

    return weatherResponse;
};