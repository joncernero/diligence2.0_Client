import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import PropertyEdit from './PropertyEdit';
import PropertyCreate from './PropertyCreate';
import { useHistory } from 'react-router-dom';
import {
  EditButton,
  DeleteButton,
  CreateButton,
  TitleDiv,
} from '../../Styles/Index';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

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
  properties: Property[];
  fetchProperties: Function;
  toggleEditOn: Function;
  toggleEditOff: Function;
  editProperty: Function;
  toggleCreateOn: Function;
  toggleCreateOff: Function;
  updateActive: boolean;
  createActive: boolean;
};

const PropertyTable = (props: Props) => {
  const [editingProperty, setEditingProperty] =
    useState<Property | undefined>();
  const history = useHistory();

  const deleteProperty = (property: Property) => {
    fetch(`${APIURL}/property/delete/${property.id}`, {
      method: 'Delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    }).then(() => props.fetchProperties());
  };

  const propertiesMapper = () => {
    return props.properties.map((property: Property, index) => {
      return (
        <TableRow key={index}>
          <TableCell onClick={() => history.push(`/units/${property.id}`)}>
            {property.name}
          </TableCell>
          <TableCell>{property.streetAddress}</TableCell>
          <TableCell>{property.city}</TableCell>
          <TableCell>{property.state}</TableCell>
          <TableCell>{property.zipcode}</TableCell>
          <TableCell>{property.numberOfUnits}</TableCell>
          <TableCell>{property.companyId}</TableCell>
          <TableCell>
            <EditButton
              onClick={() => {
                setEditingProperty(property);
                props.editProperty();
                props.toggleEditOn();
                props.toggleEditOff();
              }}>
              Edit
            </EditButton>
          </TableCell>
          <TableCell>
            <DeleteButton
              onClick={() => {
                deleteProperty(property);
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
          <PropertyCreate
            token={props.token}
            fetchProperties={props.fetchProperties}
            toggleCreateOn={props.toggleCreateOn}
            toggleCreateOff={props.toggleCreateOff}
          />
        ) : null}
        <TitleDiv>
          <h1>Properties</h1>
          <CreateButton
            onClick={() => {
              props.toggleCreateOn();
              props.toggleCreateOff();
            }}>
            New Property
          </CreateButton>
        </TitleDiv>
        <hr />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>PropertyName</TableCell>
                <TableCell>Street Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Zipcode</TableCell>
                <TableCell># Of Units</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{propertiesMapper()}</TableBody>
          </Table>
        </TableContainer>
      </div>
      {props.updateActive && editingProperty ? (
        <PropertyEdit
          propertyToUpdate={editingProperty}
          token={props.token}
          editProperty={props.editProperty}
          toggleEditOn={props.toggleEditOn}
          toggleEditOff={props.toggleEditOff}
          fetchProperties={props.fetchProperties}
        />
      ) : null}
    </>
  );
};

export default PropertyTable;
