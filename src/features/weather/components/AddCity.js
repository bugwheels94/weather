import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import {
  addCityAsync, 
} from '../weatherSlice';

export default function AddCity() {
  const status = useSelector(state => state.weather.addCityReq);
  const dispatch = useDispatch();
  const [city, setCity] = useState('');

  return (
    <Form onSubmit={e => (e.preventDefault(), dispatch(addCityAsync(city)))}>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Type City"
          aria-label="Add City"
          aria-describedby="basic-addon2"
          onChange={e => setCity(e.target.value)}
          value={city}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" type="submit">+</Button>
        </InputGroup.Append>
      </InputGroup>
      { status.pending && <Spinner animation="border" role="status" /> }
      { status.error && <div className="text-danger">{status.error}</div> }
    </Form>
  );
}
