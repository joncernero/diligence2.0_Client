import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal } from '../../Styles/Modal';
// import { motion } from 'framer-motion';

type Props = {
  token: string | null;
  fetchProperties: Function;
  toggleCreateOn: Function;
};

const PropertyCreate = (props: Props) => {
  const [name, setName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState(0);
  const [numberOfUnits, setNumberOfUnits] = useState(0);

  const fetchPropertyData = (e: React.FormEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/property/create`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        streetAddress: streetAddress,
        city: city,
        state: state,
        zipcode: zipcode,
        numberOfUnits: numberOfUnits,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((property) => {
        setName('');
        setStreetAddress('');
        setCity('');
        setState('');
        setZipcode(0);
        setNumberOfUnits(0);
      })
      .then(() => {
        props.fetchProperties();
        props.toggleCreateOn(true);
      });
  };

  return (
    <StyledModal>
      <form onSubmit={fetchPropertyData}>
        <h1>Create New Property</h1>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='streetAddress'>Street Address:</label>
          <input
            name='streetAddress'
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='city'>City:</label>
          <input
            name='city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='state'>State:</label>
          <input
            name='state'
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='zipcode'>Zipcode:</label>
          <input
            name='zipcode'
            value={zipcode}
            onChange={(e) => setZipcode(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='numberOfUnits'># of Units:</label>
          <input
            name='numberOfUnits'
            value={numberOfUnits}
            onChange={(e) => setNumberOfUnits(Number(e.target.value))}
          />
        </div>
        <button type='submit'>Create Property</button>
      </form>
    </StyledModal>
  );
};

export default PropertyCreate;
