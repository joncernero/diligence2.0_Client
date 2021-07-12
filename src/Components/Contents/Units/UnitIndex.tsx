import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import UnitTable from './UnitTable';
import { Container } from '../../Styles/Containers';
import { useParams } from 'react-router-dom';

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
  token: string | null;
  propertyId?: number;
};

const UnitIndex = (props: Props) => {
  const [units, setUnits] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const { propertyId } = useParams<{ propertyId?: string }>();
  const [unitToUpdate, setUnitToUpdate] = useState({
    id: 0,
    name: '',
    unitNumber: '',
    bldgNumber: '',
    numberOfBeds: 0,
    numberOfBaths: 0,
    totalSquareFootage: 0,
    propertyId: Number(propertyId),
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchUnits = () => {
    fetch(`${APIURL}/unit/${propertyId}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((unit) => {
        setUnits(unit);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editUnit = (unit: Unit) => {
    setUnitToUpdate(unit);
    console.log(unit);
  };

  const toggleEditOn = () => {
    setUpdateActive(!updateActive);
  };

  const toggleCreateOn = () => {
    setCreateActive(!createActive);
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const showLoading = () => {
    if (isLoading) {
      return <h1>fetching</h1>;
    }
  };

  return (
    <>
      {showLoading()}
      <Container>
        <UnitTable
          units={units}
          token={props.token || ''}
          fetchUnits={fetchUnits}
          editUnit={editUnit}
          toggleEditOn={toggleEditOn}
          toggleCreateOn={toggleCreateOn}
          createActive={createActive}
          updateActive={updateActive}
        />
      </Container>
    </>
  );
};

export default UnitIndex;
