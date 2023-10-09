import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { videoColumns } from '../../json/UserList'
import { toast } from 'react-toastify'

function VideoList() {

    const [list, setList] = useState([])

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {

            console.log("Call")
            await fetch(`${process.env.REACT_APP_URL}videos`, {
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
            <DataTable
                title="Video List"
                columns={videoColumns}
                data={list}
                pagination
                theme="dark"
                responsive={true}
            />
        </div>
    )
}

export default VideoList