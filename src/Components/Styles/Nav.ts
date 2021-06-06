import styled from 'styled-components';

export const NavbarDiv = styled.div`
  background-color: #060b26;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    color: white;
  }

  button {
    margin-right: 20px;
    width: 75px;
    height: 35px;
    border: 2px solid white;
    border-radius: 10px;
    background: transparent;
    color: white;
    font-weight: bold;
  }

  button a {
    text-decoration: inherit;
    color: inherit;
  }

  button:hover {
    background: white;
    color: #060b26;
  }
`;

export const MenuBars = styled.div`
  margin-top: 1rem;
  margin-left: 2rem;
  font-size: 2rem;
  background: none;
`;

export const NavMenu = styled.div<{ active: boolean }>`
  background-color: #060b26;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${(props) => (props.active ? '0' : '-100%')};
  transition: ${(props) => (props.active ? '350ms' : '850ms')};
`;

export const NavText = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 8px 0px 8px 16px;
  list-style: none;
  height: 60px;

  a {
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;
  }

  a:hover {
    background-color: #1a83ff;
  }
`;

export const NavMenuItems = styled.div`
  width: 100%;
`;

export const NavbarToggle = styled.div`
  background-color: #060b26;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const Span = styled.span`
  margin-left: 16px;
`;
