import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
// import { useHistory } from 'react-router-dom';
import {
  EditButton,
  DeleteButton,
  TitleDiv,
  CreateButton,
} from '../../Styles/Index';
import FeatureCreate from './FeatureCreate';
import FeatureEdit from './FeatureEdit';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

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
  features: Feature[];
  fetchFeatures: Function;
  editFeature: Function;
  toggleEditOn: Function;
  toggleCreateOn: Function;
  updateActive: boolean;
  createActive: boolean;
};

const FeatureTable = (props: Props) => {
  const [editingFeature, setEditingFeature] = useState<Feature | undefined>();
  //   const history = useHistory();

  const deleteFeature = (feature: Feature) => {
    fetch(`${APIURL}/feature/delete/${feature.id}`, {
      method: 'Delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    }).then(() => props.fetchFeatures());
  };

  const featuresMapper = () => {
    return props.features.map((feature: Feature, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{feature.feature}</TableCell>
          <TableCell>{feature.roomType}</TableCell>
          <TableCell>{feature.value}</TableCell>
          <TableCell>{feature.notes}</TableCell>
          <TableCell>
            <EditButton
              onClick={() => {
                setEditingFeature(feature);
                props.toggleEditOn();
              }}>
              Edit
            </EditButton>
          </TableCell>
          <TableCell>
            <DeleteButton
              onClick={() => {
                deleteFeature(feature);
              }}>
              Delete
            </DeleteButton>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <>
      <div>
        {props.createActive ? (
          <FeatureCreate
            token={props.token}
            fetchFeatures={props.fetchFeatures}
            toggleCreateOn={props.toggleCreateOn}
          />
        ) : null}
        <TitleDiv>
          <h1>Features</h1>
          <CreateButton
            onClick={() => {
              props.toggleCreateOn();
            }}>
            New Feature
          </CreateButton>
        </TitleDiv>
        <hr />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Feature</TableCell>
                <TableCell>Room Type</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{featuresMapper()}</TableBody>
          </Table>
        </TableContainer>
      </div>
      {props.updateActive && editingFeature ? (
        <FeatureEdit
          featureToUpdate={editingFeature}
          token={props.token}
          toggleEditOn={props.toggleEditOn}
          fetchFeatures={props.fetchFeatures}
        />
      ) : null}
    </>
  );
};

export default FeatureTable;
