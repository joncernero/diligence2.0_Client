import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { useHistory } from 'react-router-dom';
import {
  EditButton,
  DeleteButton,
  TitleDiv,
  CreateButton,
} from '../../Styles/Index';
import UnitCreate from './UnitCreate';
import UnitEdit from './UnitEdit';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

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
  units: Unit[];
  fetchUnits: Function;
  editUnit: Function;
  toggleEditOn: Function;
  toggleCreateOn: Function;
  updateActive: boolean;
  createActive: boolean;
};

const UnitTable = (props: Props) => {
  const [editingUnit, setEditingUnit] = useState<Unit | undefined>();
  const history = useHistory();

  const deleteUnit = (unit: Unit) => {
    fetch(`${APIURL}/unit/delete/${unit.id}`, {
      method: 'Delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    }).then(() => props.fetchUnits());
  };

  const unitsMapper = () => {
    return props.units.map((unit: Unit, index) => {
      return (
        <TableRow key={index}>
          <TableCell onClick={() => history.push(`/features/${unit.id}`)}>
            {unit.name}
          </TableCell>
          <TableCell>{unit.unitNumber}</TableCell>
          <TableCell>{unit.bldgNumber}</TableCell>
          <TableCell>{unit.numberOfBeds}</TableCell>
          <TableCell>{unit.numberOfBaths}</TableCell>
          <TableCell>{unit.totalSquareFootage}</TableCell>
          <TableCell>
            <EditButton
              onClick={() => {
                setEditingUnit(unit);
                props.editUnit();
                props.toggleEditOn();
              }}>
              Edit
            </EditButton>
          </TableCell>
          <TableCell>
            <DeleteButton
              onClick={() => {
                deleteUnit(unit);
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
          <UnitCreate
            token={props.token}
            fetchUnits={props.fetchUnits}
            toggleCreateOn={props.toggleCreateOn}
          />
        ) : null}
        <TitleDiv>
          <h1>Units</h1>
          <CreateButton
            onClick={() => {
              props.toggleCreateOn();
            }}>
            New Unit
          </CreateButton>
        </TitleDiv>
        <hr />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Unit Name</TableCell>
                <TableCell>Unit #</TableCell>
                <TableCell>Bldg #</TableCell>
                <TableCell># Of Beds</TableCell>
                <TableCell># Of Baths</TableCell>
                <TableCell>Total SQFT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{unitsMapper()}</TableBody>
          </Table>
        </TableContainer>
      </div>
      {props.updateActive && editingUnit ? (
        <UnitEdit
          unitToUpdate={editingUnit}
          token={props.token}
          toggleEditOn={props.toggleEditOn}
          fetchUnits={props.fetchUnits}
        />
      ) : null}
    </>
  );
};

export default UnitTable;
