import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    if (userdata) {
      setUsers(userdata);
    }
  }, []);

  const deleteUser = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem("userdata", JSON.stringify(updatedUsers));
    alert("User deleted successfully!");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">User List</h2>
      {users.length > 0 ? (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteUser(user.email)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h5 className="text-center mt-5">No users found</h5>
      )}
    </div>
  );
};

export default UserList;
