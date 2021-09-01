import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal } from '../../Styles/Modal';
// import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

type Props = {
  token: string | null;
  fetchFeatures: Function;
  toggleCreateOn: Function;
  unitId?: number;
};

const FeatureCreate = (props: Props) => {
  const [feature, setFeature] = useState('');
  const [roomType, setRoomType] = useState('');
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');
  const { unitId } = useParams<{ unitId?: string }>();

  const fetchFeatureData = (e: React.FormEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/feature/create`, {
      method: 'POST',
      body: JSON.stringify({
        feature: feature,
        roomType: roomType,
        value: value,
        notes: notes,
        unitId: unitId,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((feature) => {
        setFeature('');
        setRoomType('');
        setValue('');
        setNotes('');
      })
      .then(() => {
        props.fetchFeatures();
        props.toggleCreateOn(true);
      });
  };
  return (
    <StyledModal>
      <form onSubmit={fetchFeatureData}>
        <h1>Create New Feature</h1>
        <div>
          <label htmlFor='feature'>Feature:</label>
          <input
            name='feature'
            value={feature}
            onChange={(e) => setFeature(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='roomType'>Room Type:</label>
          <input
            name='streetAddress'
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='value'>Value:</label>
          <input
            name='value'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='notes'>Notes:</label>
          <input
            name='notes'
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <button type='submit'>Add Feature</button>
      </form>
    </StyledModal>
  );
};

export default FeatureCreate;
