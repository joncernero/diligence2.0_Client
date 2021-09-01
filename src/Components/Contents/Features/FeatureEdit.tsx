import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal } from '../../Styles/Modal';
// import { motion } from 'framer-motion';

type Feature = {
  id: number;
  feature: string;
  roomType: string;
  value: string;
  notes: string;
  unitId: number;
};

type Props = {
  token: string;
  toggleEditOn: Function;
  featureToUpdate: Feature;
  fetchFeatures: Function;
};

const FeatureEdit = (props: Props) => {
  const [editFeature, setEditFeature] = useState(props.featureToUpdate.feature);
  const [editRoomType, setEditRoomType] = useState(
    props.featureToUpdate.roomType
  );
  const [editValue, setEditValue] = useState(props.featureToUpdate.value);
  const [editNotes, setEditNotes] = useState(props.featureToUpdate.notes);

  const featureUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/feature/update/${props.featureToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        feature: editFeature,
        roomType: editRoomType,
        value: editValue,
        notes: editNotes,
      }),
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        props.fetchFeatures();
        props.toggleEditOn();
      });
  };

  return (
    <StyledModal>
      <form onSubmit={featureUpdate}>
        <h1>Update Edit</h1>
        <label htmlFor='feature'>Edit Feature:</label>
        <input
          name='name'
          value={editFeature}
          onChange={(e) => setEditFeature(e.target.value)}
        />
        <label htmlFor='roomType'>Edit Room Type:</label>
        <input
          name='roomType'
          value={editRoomType}
          onChange={(e) => setEditRoomType(e.target.value)}
        />
        <label htmlFor='value'>Edit Value:</label>
        <input
          name='value'
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />
        <label htmlFor='notes'>Edit Notes:</label>
        <input
          name='notes'
          value={editNotes}
          onChange={(e) => setEditNotes(e.target.value)}
        />
        <button type='submit'>Update</button>
      </form>
    </StyledModal>
  );
};

export default FeatureEdit;
