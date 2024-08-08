import React from "react";
import UsersTable from "./UserTable";

const Users: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
      <UsersTable />
    </div>
  );
};

export default Users;
