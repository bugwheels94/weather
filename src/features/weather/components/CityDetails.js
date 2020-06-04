import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner'
import Cloudy from '../../../static/cloudy.svg'
import FewClouds from '../../../static/cloudy-day-1.svg'
import ScatteredClouds from '../../../static/cloudy-day-3.svg'
import BrokenClouds from '../../../static/cloudy.svg'
import Day from '../../../static/day.svg'
import Rain from '../../../static/rainy-1.svg'
import ShowerRain from '../../../static/rainy-6.svg'
import Snow from '../../../static/snowy-1.svg'
import Thunder from '../../../static/thunder.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import { getCityAsync } from '../weatherSlice';
function getWeatherIcon(icon) {
  console.log(Number(icon.replace(/[dn]/g, "")))
  switch (Number(icon.replace(/[dn]/g, ""))) {
    case 1: return Day;
    case 2: return FewClouds;
    case 3: return ScatteredClouds;
    case 4: return BrokenClouds;
    case 9: return ShowerRain;
    case 10: return Rain;
    case 11: return Thunder;
    case 13: return Snow;
    case 50: return Cloudy;
    default: return Day;
  }
}
const toCelsius = (K) => `${Math.round((K - 273) * 100) / 100}C`
const getDay = (dt) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][(new Date(dt * 1000)).getDay()]
const getDate = (dt) => (new Date(dt * 1000)).getDate()
export default function AddCity() {
  const city = useSelector(state => state.weather.city);
  const status = useSelector(state => state.weather.getCityReq);
  const dispatch = useDispatch();
  if (!city) return <div>Click on Any City to Fetch the Details</div>
  const forecasts = city.forecast;
  const currentWeather = city.current;
  return status.pending ? <Spinner animation="border" role="status" /> :
    status.error ? <div>{status.error}</div> : (
      <Row>
        <Col sm={12} className="d-flex justify-content-between p-5">
          <h3 className="d-inline-block">
            {currentWeather.name}
          </h3>
          <FontAwesomeIcon icon={faSync} onClick={() => dispatch(getCityAsync(currentWeather.name))} spin={status.pending} />
        </Col>
        <Col sm={4} className="d-flex align-items-center justify-content-center">
          <img src={getWeatherIcon(currentWeather.weather[0].icon)} alt="weather" width="150" />
        </Col>
        <Col sm={8} className="text-left py-5">
          <div>Temperature: {toCelsius(currentWeather.main.temp)}</div>
          <div>{currentWeather.weather[0].main}</div>
          <div>Wind: {currentWeather.wind.speed}ms {currentWeather.wind.deg} deg</div>
          <div>Pressure {currentWeather.main.pressure}</div>
        </Col>
        {forecasts.list.map(forecast => <Col sm={2} className="text-center" key={forecast.dt}>
          {getDate(forecast.dt)}<br />
          {getDay(forecast.dt)}<br />
          <img src={getWeatherIcon(forecast.weather[0].icon)} alt="weather" /> <br />
          {toCelsius(forecast.temp.day)}<br />
        </Col>
        )}
      </Row>
    );
}
