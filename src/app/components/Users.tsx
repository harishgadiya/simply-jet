import React from "react";
import UsersTable from "./UserTable";

const Users: React.FC = () => {
  return (
    <div className="bg-slate-950 dark:bg-slate-950 p-3 sm:p-5 antialiased">
      <UsersTable />
    </div>
  );
};

export default Users;
