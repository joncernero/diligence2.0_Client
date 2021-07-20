import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import FeatureTable from './FeatureTable';
import { Container } from '../../Styles/Containers';
import { useParams } from 'react-router-dom';

interface Feature {
  id: number;
  feature: string;
  roomType: string;
  value: string;
  notes: string;
  unitId: number;
}

type Props = {
  token: string | null;
  unitId?: number;
};

const FeatureIndex = (props: Props) => {
  const [features, setFeatures] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const { unitId } = useParams<{ unitId?: string }>();
  const [featureToUpdate, setFeatureToUpdate] = useState({
    id: 0,
    feature: '',
    roomType: '',
    value: '',
    notes: '',
    unitId: Number(unitId),
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchFeatures = () => {
    fetch(`${APIURL}/feature/${unitId}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((feature) => {
        setFeatures(feature);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editFeature = (feature: Feature) => {
    setFeatureToUpdate(feature);
    console.log(feature);
  };

  const toggleEditOn = () => {
    setUpdateActive(!updateActive);
  };

  const toggleCreateOn = () => {
    setCreateActive(!createActive);
  };

  useEffect(() => {
    fetchFeatures();
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
        <FeatureTable
          features={features}
          token={props.token || ''}
          fetchFeatures={fetchFeatures}
          editFeature={editFeature}
          toggleEditOn={toggleEditOn}
          toggleCreateOn={toggleCreateOn}
          createActive={createActive}
          updateActive={updateActive}
        />
      </Container>
    </>
  );
};

export default FeatureIndex;
