import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal } from '../../Styles/Modal';
import { motion } from 'framer-motion';

type Unit = {
  id: number;
  name: string;
  unitNumber: string;
  bldgNumber: string;
  numberOfBeds: number;
  numberOfBaths: number;
  totalSquareFootage: number;
  propertyId: number;
};

type Props = {
  token: string;
  toggleEditOn: Function;
  unitToUpdate: Unit;
  fetchUnits: Function;
};

const UnitEdit = (props: Props) => {
  const [editName, setEditName] = useState(props.unitToUpdate.name);
  const [editUnitNumber, setEditUnitNumber] = useState(
    props.unitToUpdate.unitNumber
  );
  const [editBldgNumber, setEditBldgNumber] = useState(
    props.unitToUpdate.bldgNumber
  );
  const [editNumberOfBeds, setEditNumberOfBeds] = useState(
    props.unitToUpdate.numberOfBeds
  );
  const [editNumberOfBaths, setEditNumberOfBaths] = useState(
    props.unitToUpdate.numberOfBaths
  );
  const [editTotalSquareFootage, setEditTotalSquareFootage] = useState(
    props.unitToUpdate.totalSquareFootage
  );

  const unitUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/unit/update/${props.unitToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        name: editName,
        unitNumber: editUnitNumber,
        bldgNumber: editBldgNumber,
        numberOfBeds: editNumberOfBeds,
        numberOfBaths: editNumberOfBaths,
        totalSquareFootage: editTotalSquareFootage,
      }),
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        props.fetchUnits();
        props.toggleEditOn();
      });
  };

  return (
    <StyledModal as={motion.div} drag>
      <form onSubmit={unitUpdate}>
        <h1>Update Unit</h1>
        <label htmlFor='name'>EditName:</label>
        <input
          name='name'
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
        <label htmlFor='unitNumber'>Edit Unit #:</label>
        <input
          name='unitNumber'
          value={editUnitNumber}
          onChange={(e) => setEditUnitNumber(e.target.value)}
        />
        <label htmlFor='bldgNumber'>Edit Bldg #:</label>
        <input
          name='bldgNumber'
          value={editBldgNumber}
          onChange={(e) => setEditBldgNumber(e.target.value)}
        />
        <label htmlFor='name'>Edit # Of Beds:</label>
        <input
          name='numberOfBeds'
          value={editNumberOfBeds}
          onChange={(e) => setEditNumberOfBeds(Number(e.target.value))}
        />
        <label htmlFor='numberOfBaths'>Edit # of Baths:</label>
        <input
          name='numberOfBaths'
          value={editNumberOfBaths}
          onChange={(e) => setEditNumberOfBaths(Number(e.target.value))}
        />
        <label htmlFor='totalSquareFootage'>Total SQFT:</label>
        <input
          name='totalSquareFootage'
          value={editTotalSquareFootage}
          onChange={(e) => setEditTotalSquareFootage(Number(e.target.value))}
        />
        <button type='submit'>Update</button>
      </form>
    </StyledModal>
  );
};

export default UnitEdit;
