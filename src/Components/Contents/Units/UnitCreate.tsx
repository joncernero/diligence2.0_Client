import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal } from '../../Styles/Modal';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

type Props = {
  token: string | null;
  fetchUnits: Function;
  toggleCreateOn: Function;
  propertyId?: number;
};

const UnitCreate = (props: Props) => {
  const [name, setName] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [bldgNumber, setBldgNumber] = useState('');
  const [numberOfBeds, setNumberOfBeds] = useState(0);
  const [numberOfBaths, setNumberOfBaths] = useState(0);
  const [totalSquareFootage, setTotalSquareFootage] = useState(0);
  const { propertyId } = useParams<{ propertyId?: string }>();

  const fetchUnitData = (e: React.FormEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/unit/create`, {
      method: 'POST',
      body: JSON.stringify({
        propertyId,
        unit: {
          name: name,
          unitNumber: unitNumber,
          bldgNumber: bldgNumber,
          numberOfBeds: numberOfBeds,
          numberOfBaths: numberOfBaths,
          totalSquareFootage: totalSquareFootage,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((unit) => {
        setName('');
        setUnitNumber('');
        setBldgNumber('');
        setNumberOfBeds(0);
        setNumberOfBaths(0);
        setTotalSquareFootage(0);
      })
      .then(() => {
        props.fetchUnits();
        props.toggleCreateOn(true);
      });
  };
  return (
    <StyledModal as={motion.div} whileHover={{ scale: 1.1 }} drag>
      <form onSubmit={fetchUnitData}>
        <h1>Create Unit</h1>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='unitNumber'>UnitNumber:</label>
          <input
            name='unitNumber'
            value={unitNumber}
            onChange={(e) => setUnitNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='bldgNumber'>Building Number:</label>
          <input
            name='bldgNumber'
            value={bldgNumber}
            onChange={(e) => setBldgNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='numberOfBeds'>Number of Beds:</label>
          <input
            name='numberOfBeds'
            value={numberOfBeds}
            onChange={(e) => setNumberOfBeds(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='numberOfBaths'>Number Of Baths:</label>
          <input
            name='numberOfBaths'
            value={numberOfBaths}
            onChange={(e) => setNumberOfBaths(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='totalSquareFootage'>Total Sqft:</label>
          <input
            name='totalSquareFootage'
            value={totalSquareFootage}
            onChange={(e) => setTotalSquareFootage(Number(e.target.value))}
          />
        </div>
        <button type='submit'>Create Unit</button>
      </form>
    </StyledModal>
  );
};

export default UnitCreate;
