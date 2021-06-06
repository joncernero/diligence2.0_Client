import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal } from '../../Styles/Modal';
import { motion } from 'framer-motion';

type Property = {
  id: number;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
  numberOfUnits: number;
  companyId: number;
};

type Props = {
  token: string | null;
  toggleEditOn: Function;
  toggleEditOff: Function;
  editProperty: Function;
  propertyToUpdate: Property;
  fetchProperties: Function;
};

const PropertyEdit = (props: Props) => {
  const [editName, setEditName] = useState(props.propertyToUpdate.name);
  const [editStreetAddress, setEditStreetAddress] = useState(
    props.propertyToUpdate.streetAddress
  );
  const [editCity, setEditCity] = useState(props.propertyToUpdate.city);
  const [editState, setEditState] = useState(props.propertyToUpdate.state);
  const [editZipcode, setEditZipcode] = useState(
    props.propertyToUpdate.zipcode
  );
  const [editNumberOfUnits, setEditNumberOfUnits] = useState(
    props.propertyToUpdate.numberOfUnits
  );

  const propertyUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/property/update/${props.propertyToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        name: editName,
        streetAddress: editStreetAddress,
        city: editCity,
        state: editState,
        zipcode: editZipcode,
        numberOfUnits: editNumberOfUnits,
      }),
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        props.fetchProperties();
        props.toggleEditOn();
        props.toggleEditOff();
        props.editProperty();
      });
  };

  return (
    <StyledModal as={motion.div} drag>
      <form onSubmit={propertyUpdate}>
        <h1>Update Property</h1>
        <label htmlFor='name'>Edit Name:</label>
        <input
          name='name'
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
        <label htmlFor='streetAddress'>Edit Street Address:</label>
        <input
          name='streetAddress'
          value={editStreetAddress}
          onChange={(e) => setEditStreetAddress(e.target.value)}
        />
        <label htmlFor='city'>Edit City:</label>
        <input
          name='city'
          value={editCity}
          onChange={(e) => setEditCity(e.target.value)}
        />
        <label htmlFor='state'>Edit State:</label>
        <input
          name='state'
          value={editState}
          onChange={(e) => setEditState(e.target.value)}
        />
        <label htmlFor='zipcode'>Edit Zipcode:</label>
        <input
          name='zipcode'
          value={editZipcode}
          onChange={(e) => setEditZipcode(e.target.value)}
        />
        <label htmlFor='numberOfUnits'>Edit Number Of Units:</label>
        <input
          name='numberOfUnits'
          value={editNumberOfUnits}
          onChange={(e) => setEditNumberOfUnits(Number(e.target.value))}
        />
        <button type='submit'>Update</button>
      </form>
    </StyledModal>
  );
};

export default PropertyEdit;
