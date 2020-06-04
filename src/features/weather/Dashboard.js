import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddCity from './components/AddCity'
import CityList from './components/CityList'
import CityDetails from './components/CityDetails'
export default function Dashboard() {
  return (
    <Row>
      <Col sm={4} className="border-right">
        <AddCity />
        <CityList />
      </Col>
      <Col sm={8}>
        <CityDetails />
      </Col>
    </Row>
  );
}
