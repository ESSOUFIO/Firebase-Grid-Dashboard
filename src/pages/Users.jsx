import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from "../firebase/config";
import AdminRoute from "../utils/AdminRoute";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const users = snapshot.docs.map((doc) => doc.data());
      setUsers(users);
    });
    return unsubscribe;
  }, []);

  return (
    <Table striped bordered hover className="container">
      <thead>
        <tr>
          <th>Name</th>
          <th>Specialty</th>
          <th>Adress</th>
          <th>Phone</th>
          <th>IP Adress</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.uid}>
            <td>
              <Link to={`/profile/${user.uid}`}>{user.name}</Link>
            </td>
            <td>{user.specialty}</td>
            <td>
              {user.adress} {user.state}, {user.city} {user.zip}
            </td>
            <td>{user.phone}</td>
            <td>{user.ip}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminRoute(Users);
