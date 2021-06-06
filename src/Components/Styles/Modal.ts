import styled from 'styled-components';

export const StyledModal = styled.div`
  width: 25%;
  height: 65vh;
  border-radius: 10px;
  padding: 35px 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: absolute;
  margin: 0 auto;
  z-index: 75;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 1px 1px 15px black;

  h1 {
    text-align: center;
    text-shadow: 1px 1px 5px #abb2b9;
  }

  form {
    color: #283747;
    display: block;
    width: 300px;
    margin: 10px auto;
  }

  label {
    margin-bottom: 0.5em;
    color: #283747;
    display: block;
    text-align: left;
    font-weight: bold;
  }

  input {
    padding: 0.5em;
    color: #283747;
    background: #eaecee;
    border: 1px solid #283747;
    border-radius: 3px;
    width: 100%;
    margin-bottom: 1em;
  }

  button {
    height: 35px;
    width: 150px;
    color: white;
    font-size: 15px;
    font-weight: bold;
    background: #060b26;
    border-radius: 5px;
    margin: 15px;
    box-shadow: 1px 3px 7px gray;

    &:hover {
      background: #d4efdf;
      color: #060b26;
    }
  }
`;
