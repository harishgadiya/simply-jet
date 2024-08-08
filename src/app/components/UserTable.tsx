import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  ColumnFiltersState,
  useReactTable,
  ColumnDef,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getCoreRowModel,
} from "@tanstack/react-table";
import UserForm from "./UserForm";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  alternate_email: string;
  password: string;
  age: number;
}

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("/api/users");
  return res.json();
};

const deleteUser = async (id: number): Promise<void> => {
  await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
};

const addUser = async (newUser: User): Promise<User> => {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  return res.json();
};

const updateUser = async (updatedUser: User): Promise<void> => {
  const res = await fetch("/api/users", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  });
  return res.json();
};

const UsersTable: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [shouldUpdateUser, setUpdateUser] = useState(false);
  const { register, handleSubmit, reset } = useForm<User>();
  const queryClient = useQueryClient();

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const addUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const onSubmit: SubmitHandler<User> = (data) => {
    if (shouldUpdateUser) {
      updateMutation.mutate(data);
    } else {
      addUserMutation.mutate(data);
    }
    setShowModal(false);
    reset();
  };

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "Select",
        accessorKey: "select",
        cell: ({ row }) => (
          <input
            type="checkbox"
            {...row.getToggleSelectedHandler()}
            className="cursor-pointer"
          />
        ),
      },
      {
        header: "First Name",
        accessorKey: "first_name",
      },
      {
        header: "Last Name",
        accessorKey: "last_name",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Alternate Email",
        accessorKey: "alternate_email",
      },
      {
        header: "Age",
        accessorKey: "age",
        meta: {
          filterVariant: "range",
        },
      },
      {
        header: "Action",
        cell: ({ row }) => (
          <div className="flex">
            <button
              id="apple-imac-27-dropdown-button"
              data-dropdown-toggle="apple-imac-27-dropdown"
              className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
              type="button"
              onClick={() => {
                reset({ ...row.original });
                setShowModal(true);
                setUpdateUser(true);
              }}
            >
              <svg
                className="w-4 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => deleteMutation.mutate(Number(row.id) + 1)}
              className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
            >
              <svg
                className="w-4 h-4 mr-2"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="currentColor"
                  d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z"
                />
              </svg>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    columns,
    data: users || [],
    // filterFns: {},
    state: {
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableGlobalFilter: true,
    // globalFilterFn: (rows, columnIds, filterValue) => {
    //   if (!filterValue) return rows;
    //   const lowercasedFilter = filterValue.toLowerCase();
    //   return [rows.original]?.filter(row => {
    //     return [columnIds].some(columnId => {
    //       const cellValue = row[columnId] || row?.getValue(columnId);
    //       return cellValue?.toString().toLowerCase().includes(lowercasedFilter);
    //     });
    //   });
    // },
  });

  const handleDeleteSelected = () => {
    console.log(table.getSelectedRowModel(), table.getSelectedRowModel, table);
    const selectedRowIds = Object.keys(table.getSelectedRowModel);
    // @ts-ignore
    selectedRowIds.forEach((id: string) => deleteMutation.mutate(id));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="appearance-none block w-full max-w-xs border border-gray-200 rounded py-2 px-4 leading-tight dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 font-bold items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            onClick={handleDeleteSelected}
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
          >
            Delete Selected
          </button>
          <button
            type="button"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              setShowModal(true);
              setUpdateUser(false);
              reset({});
            }}
          >
            Add User
          </button>
        </div>
      </div>
      {showModal ? (
        <UserForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          setShowModal={setShowModal}
          register={register}
          shouldUpdateUser={shouldUpdateUser}
        />
      ) : null}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className="border-b dark:border-gray-700" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-2" />
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
            {/* 1-10 */}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {table.getPageCount()}
          </span>
          <select
            className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2 "
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: table.getPageCount() }, (_, index) => (
            <li key={index}>
              <button
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => table.setPageIndex(index)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UsersTable;
