import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getVimeoVideoId, getYouTubeVideoId } from '../../utils/utils';
import { useLocation, useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').max(300, 'Title must be exactly 300 characters'),
    thumbnail: Yup.string().required('Thumbnail is required').max(10000, 'Thumbnail must be exactly 10000 characters'),
    description: Yup.string().required('Description is required').max(1000000, 'Description must be exactly 1000000 characters'),
    genre: Yup.string().required('Genre is required').max(30, 'genre must be exactly 30 characters'),
    type: Yup.string().required('Video type is required'),
    url: Yup.string().required('URL is required').max(10000, 'Url must be exactly 10000 characters'),
    priority: Yup.number().required('Priority is required').max(10000, 'Priority must be exactly 10000 characters'),
});

const AddVideo = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [genreList, setGenreList] = useState([]);

    const [list, setList] = useState([])


    const { state } = useLocation();

    useEffect(() => {
        getAllGenre();
        getAllVideos()
    }, [])

    const getAllGenre = async () => {
        try {
            await fetch(`${process.env.REACT_APP_URL_Two}category`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((data) => {
                    setGenreList(data);
                })
                .catch((err) => toast.error("Something wrong::" + err))
        } catch (err) {
            toast.error("Something wrong::" + err);
            console.log("Error::", err)
        }
    }

    const getAllVideos = async () => {
        try {
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


    const initialValues = {
        title: state?.title ? state?.title : '',
        thumbnail: state?.thumbnail ? state?.thumbnail : '',
        description: state?.description ? state?.description : '',
        genre: state?.genre ? state?.genre : '',
        type: state?.type ? state?.type : '',
        url: state?.url ? state?.url : '',
        priority: state?.priority ? state?.priority : '',
    };

    const onSubmit = async (values, { resetForm }) => {
        if (state?.id) {
            updateAPICall(values, resetForm)
        } else {
            addAPICall(values, resetForm)
        }
    };

    const addAPICall = async (values, resetForm) => {
        setIsLoading(true)
        addIncresePriority(values);
        // Handle form submission here
        if (values?.type === 'youtube') {
            const mainUrl = getYouTubeVideoId(values.url)

            console.log("what is ::", mainUrl)
            console.log("what is 22::", typeof (mainUrl))
            if (mainUrl === null) return toast.error("Invalid Youtube URL");
            values.playId = mainUrl
        } else if (values?.type === 'vimeo') {
            values.playId = getVimeoVideoId(values.url)
        }
        try {
            const data = await fetch(`${process.env.REACT_APP_URL}videos`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            await data.json()
            toast.success('Successfully submited.');
            resetForm();
            navigate('/app/video-list');
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            toast.error("Something wrong::" + err);
            console.log("Something wrong::", err)
        }

    }


    const checkPriority = (values) => {
        if (values?.priority === state?.priority) {
            return false
        } else {
            return true
        }
    }


    const addIncresePriority = (values) => {
        const filterList = list?.filter((item) => (item.genre === values.genre && values.priority <= item.priority));
        console.log("Add Filter list is ::", filterList);
        if (filterList.length) {
            for (const item of filterList) {
                const payload = {
                    priority: parseInt(item?.priority) + 1
                }
                priorityUpdateAPICall(item.id, payload)
            }
        }
    }
    const updateIncresePriority = (values) => {
        console.log("form value is ::",)
        const filterList = list?.filter((item) => (item.genre === values.genre && values.priority <= item.priority && item.id !== state.id));
        console.log("Filter list is ::", filterList);
        if (filterList.length) {
            for (const item of filterList) {
                const payload = {
                    priority: parseInt(item?.priority) + 1
                }
                priorityUpdateAPICall(item.id, payload)
            }
        }
    }


    const updateAPICall = async (values, resetForm) => {
        setIsLoading(true)
        const isSamePriority = checkPriority(values)
        console.log("is the priority update ::", isSamePriority)
        if (isSamePriority) {
            updateIncresePriority(values)
        }
        // Handle form submission here
        if (values?.type === 'youtube') {
            values.playId = getYouTubeVideoId(values.url)
        } else if (values?.type === 'vimeo') {
            values.playId = getVimeoVideoId(values.url)
        }

        try {
            const data = await fetch(`${process.env.REACT_APP_URL}videos/${state?.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            await data.json()
            toast.success('Successfully submited.');
            resetForm();
            navigate('/app/video-list');
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            toast.error("Something wrong::" + err);
            console.log("Something wrong::", err)
        }
    }

    const priorityUpdateAPICall = async (id, values) => {
        try {
            const data = await fetch(`${process.env.REACT_APP_URL}videos/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            return await data.json();
        } catch (err) {
            toast.error("Something wrong::" + err);
            console.log("Something wrong::", err)
        }
    }

    return (
        <Container className='my-4'>
            <Row className="justify-content-center ">
                <Col md={6}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>
                            <div className="mb-3">
                                <h1>Add Video</h1>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label text-light">
                                    Title
                                </label>
                                <Field type="text" id="title" name="title" className="form-control cus-input" placeholder="Enter title" />
                                <ErrorMessage name="title" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="thumbnail" className="form-label">
                                    Thumbnail
                                </label>
                                <Field
                                    type="text"
                                    id="thumbnail"
                                    name="thumbnail"
                                    className="form-control cus-input"
                                    placeholder="Enter thumbnail"
                                />
                                <ErrorMessage name="thumbnail" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">
                                    Description
                                </label>
                                <Field
                                    type="text"
                                    id="description"
                                    as="textarea"
                                    name="description"
                                    className="form-control cus-input"
                                    placeholder="Enter description"
                                />
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="genre" className="form-label">
                                    Genre
                                </label>
                                <Field as="select" name="genre" className="form-select cus-input">
                                    <option value="" disabled defaultValue={true} > Select Video Type</option>
                                    {genreList?.map((item, index) => {
                                        return (<React.Fragment key={index}>
                                            <option value={item?.name}>{item?.name}</option>
                                        </React.Fragment>)
                                    })}
                                </Field>
                                <ErrorMessage name="genre" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="type" className="form-label">
                                    Video Type
                                </label>
                                <Field as="select" name="type" className="form-select cus-input">
                                    <option value="" disabled defaultValue={true}> Select Video Type</option>
                                    <option value="youtube">YouTube</option>
                                    <option value="vimeo">Vimeo</option>
                                </Field>
                                <ErrorMessage
                                    name="type"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="url" className="form-label">
                                    URL
                                </label>
                                <Field type="text" id="url" name="url" className="form-control cus-input" placeholder="Enter full url" />
                                <ErrorMessage name="url" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="title" className="form-label text-light">
                                    Priority
                                </label>
                                <Field type="text" id="priority" name="priority" className="form-control cus-input" placeholder="Enter priority" />
                                <ErrorMessage name="priority" component="div" className="text-danger" />
                            </div>

                            <Button variant="dark" type="submit" className='btn-dark btn' disabled={isLoading}>
                                {isLoading && <Spinner animation="grow" size='sm' className='mx-2' />}
                                {state?.id ? 'Update' : 'Submit'}
                            </Button>
                            {/* <Button variant="dark" className='btn-dark btn mx-2' type='reset' onClick={()=> setIsLoading(false)}>
                                Reset
                            </Button> */}
                        </Form>
                    </Formik>
                </Col>
            </Row >
        </Container >
    );
};

export default AddVideo;
