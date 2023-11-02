import {
  FaEdit,
  FaTrash

} from "react-icons/fa";

export const columns = [
  {
    name: 'Full Name',
    selector: 'fullName',
    sortable: true,
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
  },
  {
    name: 'Role',
    selector: 'role',
    sortable: true,
  },
];
export const videoColumns = ({editHandler, deleteHandler}) =>  [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
    wrap: true
  },
  {
    name: 'Description',
    selector: 'description',
    width: "300px"
  },
  {
    name: 'ID',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'Genre',
    selector: 'genre',
    sortable: true,
    width: "150px"
  },
  {
    name: 'Priority',
    selector: 'priority',
    sortable: true,
  },
  {
    name: 'Type',
    selector: 'type',
    sortable: true,
  },
  {
    name: 'Thumbnail',
    selector: 'thumbnail',
    // wrap: true,
    width: "300px"
  },
  {
    name: 'URL',
    selector: 'url',
    wrap: true
  },
  {
    name: 'Action',
    selector: (row) => row.value,
    cell: (row, index, column, id) => {
      return (
        <div className="d-flex justify-content-between">
          <FaEdit className="text-secondary fs-6 text-pointer" title="Edit" onClick={()=>editHandler(row)} />
          <FaTrash className="text-danger fs-6 mx-2 text-pointer" title="Delete" onClick={()=>deleteHandler(row)} />
        </div>
      );
    },
  }
];


// src/sampleData.js
export const sampleData = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
  { name: 'David', age: 28 },
];



export const CategoryColumns = ({editHandler, deleteHandler}) =>  [
  {
    name: 'Id',
    selector: 'id',
    width: "100px"

  },
  {
    name: 'Category Name',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Action',
    selector: (row) => row.value,
    cell: (row, index, column, id) => {
      return (
        <div className="d-flex justify-content-between">
          <FaEdit className="text-secondary fs-6 text-pointer" title="Edit" onClick={()=>editHandler(row)} />
          <FaTrash className="text-danger fs-6 mx-2 text-pointer" title="Delete" onClick={()=>deleteHandler(row)} />
        </div>
      );
    },
  }
];