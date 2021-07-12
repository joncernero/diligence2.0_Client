import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import SideBarData from './SidebarData';
import { IconContext } from 'react-icons';
import {
  NavbarDiv,
  MenuBars,
  NavMenuItems,
  NavbarToggle,
  Span,
} from '../Styles/Nav';
import './Navbar.css';
import { useHistory } from 'react-router-dom';

type Props = {
  sessionToken: string | null;
  clearToken: () => void;
};

const Navbar = (props: Props) => {
  const [sideBar, setSideBar] = useState(false);
  const history = useHistory();

  const showSidebar = () => setSideBar(!sideBar);
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <NavbarDiv>
          <Link to='#'>
            <MenuBars>
              <FaIcons.FaBars onClick={showSidebar} />
            </MenuBars>
          </Link>
          <Link to='/dashboard'>
            <h1>diligence</h1>
          </Link>
          {localStorage.getItem('token') ? (
            <button
              onClick={() => {
                props.clearToken();
                history.push('/');
              }}>
              Logout
            </button>
          ) : (
            <button>
              <Link to='/login'>Login</Link>
            </button>
          )}
        </NavbarDiv>
        <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
          <NavMenuItems onClick={showSidebar}>
            <NavbarToggle>
              <MenuBars>
                <Link to='#'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </MenuBars>
            </NavbarToggle>
            {SideBarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <Span>{item.title}</Span>
                  </Link>
                </li>
              );
            })}
          </NavMenuItems>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
