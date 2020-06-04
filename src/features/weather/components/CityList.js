import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync, faTimes } from '@fortawesome/free-solid-svg-icons'
import {
  getCityAsync, refreshCityAsync, removeCity
} from '../weatherSlice';
const toCelsius = (K) => `${Math.round((K - 273) * 100) / 100}C`
export default function AddCity() {
  const cities = useSelector(state => state.weather.cities);
  const status = useSelector(state => state.weather.refreshCityReq);
  const dispatch = useDispatch();
  return (
    <>
      { !!cities.length && 'Recent Locations' }
      <ListGroup>
      { cities.map(city => 
      <ListGroup.Item key={city.name} className="d-flex justify-content-between">
        <span onClick={() => dispatch(getCityAsync(city.name))}>{city.name} - {toCelsius(city.main.temp)} {city.weather[0].main}</span>
        <span>
          <FontAwesomeIcon icon={faSync} spin={status[city.name] && status[city.name].pending}  onClick={() => dispatch(refreshCityAsync(city.name))} className="mr-3"/>
          <FontAwesomeIcon icon={faTimes} onClick={() => dispatch(removeCity(city.name))}/>
        </span>
      </ListGroup.Item>)}
      </ListGroup>      
    </>
  );
}
