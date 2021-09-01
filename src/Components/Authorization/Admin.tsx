import React, { useState, useEffect } from 'react';
import Register from './Register';
import APIURL from '../../Utilities/Environments';
import { TitleDiv } from '../Styles/Index';
import UserTable from './UserTable';

type User = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  companyId: number;
};

type Props = {
  token: string | null;
};

const Admin = (props: Props) => {
  const [users, setUsers] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState({
    id: 0,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: '',
    companyId: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = () => {
    setIsLoading(true);
    fetch(`${APIURL}/user/`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        setUsers(user);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editUser = (user: User) => {
    setUserToUpdate(user);
  };

  const toggleEditOn = () => {
    setUpdateActive(!updateActive);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showLoading = () => {
    if (isLoading) {
      return <h1>fetching</h1>;
    }
  };

  return (
    <>
      {showLoading()}
      <TitleDiv>
        <Register token={props.token} fetchUsers={fetchUsers} />
      </TitleDiv>
      <UserTable
        users={users}
        token={props.token}
        fetchUsers={fetchUsers}
        toggleEditOn={toggleEditOn}
        updateActive={updateActive}
        editUser={editUser}
      />
    </>
  );
};

export default Admin;
