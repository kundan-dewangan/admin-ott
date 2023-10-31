import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify'
import { CategoryColumns } from '../../json/UserList'
import { useNavigate } from 'react-router-dom'
import DeleteModal from '../../components/DeleteModal'

function CategoryList() {

    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [deleteModal, setDeleteModal] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
    const [deleteId, setDeleteId] = useState(0)


    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            setIsLoading(true)
            await fetch(`${process.env.REACT_APP_URL_Two}category`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
            .then((data) => {
                    setIsLoading(false)
                    setList(data);
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
        navigate('/app/add-category', { state: item })
    }
    const deleteHandler = (item) => {
        setDeleteModal(true);
        setDeleteId(item?.id)
        console.log("Delete itme is::", item)
    }

    const deleteConfirmHanlder = async () => {
        try {
            setIsDeleteLoading(true)
            await fetch(`${process.env.REACT_APP_URL_Two}category/${deleteId}`, {
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

    return (
        <div className='container my-4'>

            {/* <h1>User List</h1> */}
            <DataTable
                title="Category List"
                columns={CategoryColumns({ editHandler, deleteHandler })}
                data={list}
                pagination
                theme="dark"
                progressPending={isLoading}
            />

            <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} deleteConfirmHanlder={deleteConfirmHanlder} isDeleteLoading={isDeleteLoading} />
        </div>
    )
}

export default CategoryList