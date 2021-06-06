import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import PropertyTable from './PropertyTable';

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
};

const PropertyIndex = (props: Props) => {
  const [properties, setProperties] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const [propertyToUpdate, setPropertyToUpdate] = useState({
    id: 0,
    name: '',
    streetAddress: '',
    city: '',
    zipcode: '',
    numberOfUnits: 0,
    companyId: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchProperties = () => {
    fetch('http://localhost:3000/log', {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((property) => {
        setProperties(property);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editProperty = (property: Property) => {
    setPropertyToUpdate(property);
  };
  const toggleEditOn = () => {
    setUpdateActive(true);
  };
  const toggleEditOff = () => {
    setUpdateActive(false);
  };

  const toggleCreateOn = () => {
    setCreateActive(true);
  };

  const toggleCreateOff = () => {
    setCreateActive(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const showLoading = () => {
    if (isLoading) {
      return <h1>fetching</h1>;
    }
  };

  return (
    <>
      {showLoading()}
      <>
        <PropertyTable
          properties={properties}
          token={props.token}
          fetchProperties={fetchProperties}
          editProperty={editProperty}
          toggleEditOn={toggleEditOn}
          toggleEditOff={toggleEditOff}
          toggleCreateOn={toggleCreateOn}
          toggleCreateOff={toggleCreateOff}
          createActive={createActive}
          updateActive={updateActive}
        />
      </>
    </>
  );
};

export default PropertyIndex;
