import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { generateRandom5DigitNumber } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    thumbnail: Yup.string().required('Thumbnail is required'),
    description: Yup.string().required('Description is required'),
    genre: Yup.string().required('Genre is required'),
    type: Yup.string().required('Type is required'),
    url: Yup.string().required('URL is required'),
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
                                <Field type="text" id="genre" name="genre" className="form-control cus-input" placeholder="Enter genre" />
                                <ErrorMessage name="genre" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="type" className="form-label">
                                    Type
                                </label>
                                <Field type="text" id="type" name="type" className="form-control cus-input" placeholder="Enter type" />
                                <ErrorMessage name="type" component="div" className="text-danger" />
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
            </Row>
        </Container>
    );
};

export default AddVideo;