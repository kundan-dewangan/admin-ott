import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { columns } from '../../json/UserList'
import { toast } from 'react-toastify'

function UserList() {

    const [list, setList] = useState([])

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            await fetch(`${process.env.REACT_APP_URL}users`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    setList(data);
                })
                .catch((err) => toast.error("Something wrong::" + err))
        } catch (err) {
            toast.error("Something wrong::" + err);
            console.log("Error::", err)
        }
    }

    return (
        <div className='container my-4'>

            {/* <h1>User List</h1> */}
            <DataTable
                title="User List"
                columns={columns}
                data={list}
                pagination
                theme="dark"
            />
        </div>
    )
}

export default UserList