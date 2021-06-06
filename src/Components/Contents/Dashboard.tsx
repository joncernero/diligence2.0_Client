import React from 'react';
import PropertyIndex from './Property/PropertyIndex';
import { Container } from '../Styles/Containers';

type Props = {
  token: string | null;
};

const Dashboard = (props: Props) => {
  return (
    <Container>
      <PropertyIndex token={props.token} />
    </Container>
  );
};

export default Dashboard;
