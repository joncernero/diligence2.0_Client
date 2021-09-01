import React, { useState } from 'react';
import APIURL from '../../Utilities/Environments';
import UserEdit from './UserEdit';
import { EditButton, DeleteButton, TitleDiv } from '../Styles/Index';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

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
  users: User[];
  fetchUsers: Function;
  toggleEditOn: Function;
  editUser: Function;
  updateActive: boolean;
};

const UserTable = (props: Props) => {
  const [editingUser, setEditingUser] = useState<User | undefined>();

  const deleteUser = (user: User) => {
    fetch(`${APIURL}/user/delete/${user.id}`, {
      method: 'Delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    }).then(() => props.fetchUsers());
  };

  const UsersMapper = () => {
    return props.users.map((user: User, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.firstName}</TableCell>
          <TableCell>{user.lastName}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell>
            <EditButton
              onClick={() => {
                setEditingUser(user);
                props.editUser(user);
                props.toggleEditOn();
              }}>
              Edit
            </EditButton>
          </TableCell>
          <TableCell>
            <DeleteButton
              onClick={() => {
                deleteUser(user);
              }}>
              Delete
            </DeleteButton>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <>
      <div>
        <TitleDiv>
          <h1>Users</h1>
        </TitleDiv>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{UsersMapper()}</TableBody>
          </Table>
        </TableContainer>
      </div>
      {props.updateActive && editingUser ? (
        <UserEdit
          userToUpdate={editingUser}
          token={props.token}
          editUser={props.editUser}
          toggleEditOn={props.toggleEditOn}
          fetchUsers={props.fetchUsers}
        />
      ) : null}
    </>
  );
};

export default UserTable;
