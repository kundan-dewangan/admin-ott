import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { generateRandom5DigitNumber, genreList, getVimeoVideoId, getYouTubeVideoId } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').max(300, 'Title must be exactly 300 characters'),
    thumbnail: Yup.string().required('Thumbnail is required').max(10000, 'Thumbnail must be exactly 10000 characters'),
    description: Yup.string().required('Description is required').max(1000000, 'Description must be exactly 1000000 characters'),
    genre: Yup.string().required('Genre is required').max(30, 'genre must be exactly 30 characters'),
    type: Yup.string().required('Video type is required'),
    url: Yup.string().required('URL is required').max(10000, 'Url must be exactly 10000 characters'),
});

const AddVideo = () => {
    const navigate = useNavigate();

    const initialValues = {
        id: generateRandom5DigitNumber(),
        title: '',
        thumbnail: '',
        description: '',
        genre: '',
        type: '',
        url: '',
    };

    const onSubmit = async (values, { resetForm }) => {

        // Handle form submission here
        if (values?.type === 'youtube') {
            values.playId = getYouTubeVideoId(values.url)
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
        } catch (err) {
            toast.error("Something wrong::" + err);
            console.log("Something wrong::", err)
        }
    };

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
                                {/* <Field type="text" id="genre" name="genre" className="form-control cus-input" placeholder="Enter genre" /> */}
                                <Field as="select" name="genre" className="form-select cus-input">
                                    {genreList?.map((item, index) => {
                                        return (<>
                                            {index === 0 && <option key={index} value="" disabled selected > Select Video Type</option>}
                                            {index !== 0 && <option value={item.key}>{item.value}</option>}
                                        </>)
                                    })}
                                </Field>
                                <ErrorMessage name="genre" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="type" className="form-label">
                                    Video Type
                                </label>
                                <Field as="select" name="type" className="form-select cus-input">
                                    <option value="" disabled selected> Select Video Type</option>
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
                                <Field type="text" id="url" name="url" className="form-control cus-input" placeholder="Enter url" />
                                <ErrorMessage name="url" component="div" className="text-danger" />
                            </div>

                            <Button variant="primary" type="submit" className='btn-dark btn'>
                                Submit
                            </Button>
                        </Form>
                    </Formik>
                </Col>
            </Row >
        </Container >
    );
};

export default AddVideo;
