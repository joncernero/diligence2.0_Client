import React from 'react';
import { ImageContainer, TextContainer } from '../Styles/Containers';

const Home = () => {
  return (
    <>
      <ImageContainer>
        <TextContainer>
          <h1>An App for Due Diligence</h1>
          <p>
            Gather, store, and evaluate your property with this simple app.
            Determine the right value for your purchase or stay on budget with
            your next renovation. No paper required!{''}
          </p>
        </TextContainer>
      </ImageContainer>
    </>
  );
};

export default Home;
