import React, { useState } from 'react';
import { StyledModal } from '../Styles/Modal';
import APIURL from '../../Utilities/Environments';

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
  toggleEditOn: Function;
  editUser: Function;
  userToUpdate: User;
  fetchUsers: Function;
};

const UserEdit = (props: Props) => {
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editRole, setEditRole] = useState('');

  const UserUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/user/update/${props.userToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        firstName: editFirstName,
        lastName: editLastName,
        role: editRole,
      }),
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        props.fetchUsers();
        props.toggleEditOn();
        props.editUser();
      });
  };

  return (
    <StyledModal>
      <form onSubmit={UserUpdate}>
        <h1>Update Edit</h1>
        <label htmlFor='firstName'>Edit First Name:</label>
        <input
          name='name'
          value={editFirstName}
          onChange={(e) => setEditFirstName(e.target.value)}
        />
        <label htmlFor='lastName'>Edit Last Name:</label>
        <input
          name='lastName'
          value={editLastName}
          onChange={(e) => setEditLastName(e.target.value)}
        />
        <label htmlFor='role'>Edit Role:</label>
        <input
          name='role'
          value={editRole}
          onChange={(e) => setEditRole(e.target.value)}
        />
        <button type='submit'>Update</button>
      </form>
    </StyledModal>
  );
};

export default UserEdit;
