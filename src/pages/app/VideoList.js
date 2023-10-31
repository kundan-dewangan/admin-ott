import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { videoColumns } from '../../json/UserList'
import { toast } from 'react-toastify'
import DeleteModal from '../../components/DeleteModal'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function VideoList() {

    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [deleteModal, setDeleteModal] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
    const [deleteId, setDeleteId] = useState(0)


    const [selectedRows, setSelectedRows] = React.useState([]);
    const [toggleCleared, setToggleCleared] = React.useState(false);
    const [deleteAllModal, setDeleteAllModal] = useState(false)
    const [isDeleteAllLoading, setIsDeleteAllLoading] = useState(false)


    const navigate = useNavigate();


    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        setIsLoading(true)
        try {
            await fetch(`${process.env.REACT_APP_URL}videos`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    setList(data);
                    setIsLoading(false)
                })
                .catch((err) => toast.error("Something wrong::" + err))
        } catch (err) {
            setIsLoading(false)
            toast.error("Something wrong::" + err);
            console.log("Error::", err)
        }
    }

    const editHandler = (item) => {
        console.log("Item is::", item)
        navigate('/app/add-video', { state: item })
    }
    const deleteHandler = (item) => {
        setDeleteModal(true);
        setDeleteId(item?.id)
        console.log("Delete itme is::", item)
    }

    const deleteConfirmHanlder = async () => {
        try {
            setIsDeleteLoading(true)
            await fetch(`${process.env.REACT_APP_URL}videos/${deleteId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then(() => {
                    getData()
                    setIsDeleteLoading(false)
                    setDeleteModal(false)
                    toast.success("Data successfully deleted")
                })
                .catch((err) => toast.error("Something wrong::" + err))
        } catch (err) {
            setIsDeleteLoading(false)
            setDeleteModal(false)
            toast.error("Something wrong::" + err);
            console.log("Error::", err)
        }
    }

    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = React.useMemo(() => {
        const handleDelete = () => {
            setDeleteAllModal(true);
        };

        return (
            <Button variant='danger' key="delete" onClick={handleDelete}>
                Delete Selected Item
            </Button>
        );
    }, [selectedRows, toggleCleared]);

    const deleteAllConfirmHanlder = async () => {

        console.log("What is selec::", selectedRows)

        const results = [];

        for (const item of selectedRows) {
            try {
                const result = await allDeleteAPICall(item?.id)
                results.push(result);
            } catch (error) {
                toast.error(`Something wrong:: ${item}: ${error}`);
            }
        }

        // after all api call get data
        getData()
        setIsDeleteAllLoading(false)
        setDeleteAllModal(false)
        setToggleCleared(!toggleCleared);
        toast.success("All selected data successfully deleted")
    }

    const allDeleteAPICall = async (id) => {
        try {
            setIsDeleteAllLoading(true)
            await fetch(`${process.env.REACT_APP_URL}videos/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .catch((err) => toast.error("Something wrong::" + err))
        } catch (err) {
            setIsDeleteAllLoading(false)
            setDeleteAllModal(false)
            toast.error("Something wrong::" + err);
            console.log("Error::", err)
        }
    }


    return (
        <div className='container my-4'>
            <DataTable
                title="Video List"
                columns={videoColumns({ editHandler, deleteHandler })}
                data={list}
                pagination
                theme="dark"
                responsive={true}
                progressPending={isLoading}
                selectableRows
                contextActions={contextActions}
                onSelectedRowsChange={handleRowSelected}
                clearSelectedRows={toggleCleared}
            />
            <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} deleteConfirmHanlder={deleteConfirmHanlder} isDeleteLoading={isDeleteLoading} />
            <DeleteModal deleteModal={deleteAllModal} setDeleteModal={setDeleteAllModal} deleteConfirmHanlder={deleteAllConfirmHanlder} isDeleteLoading={isDeleteAllLoading} />

        </div>
    )
}

export default VideoList