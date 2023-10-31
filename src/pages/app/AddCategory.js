import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { generateRandom5DigitNumber, genreList, } from '../../utils/utils';
import { useLocation, useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    name: Yup.string().required('Category name is required').max(100, 'Category name must be exactly 100 characters'),
});

const AddCategory = () => {
    const navigate = useNavigate();

    const { state } = useLocation();


    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        name: state?.name ? state?.name : '',
    };

    const onSubmit = async (values, { resetForm }) => {
        if(state?.id){
            updateAPICall(values, resetForm)
        } else{
            addAPICall(values, resetForm)
        }
    };


    const addAPICall = async(values , resetForm) => {
        try {
            setIsLoading(true)            
            const data = await fetch(`${process.env.REACT_APP_URL_Two}category`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            await data.json()
            toast.success('Successfully submited.');
            resetForm();
            navigate('/app/category-list');
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            toast.error("Something wrong::" + err);
            console.log("Something wrong::", err)
        }
    }
    const updateAPICall = async(values, resetForm) => {
        try {
            setIsLoading(true)            
            const data = await fetch(`${process.env.REACT_APP_URL_Two}category/${state?.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            await data.json()
            toast.success('Successfully submited.');
            resetForm();
            navigate('/app/category-list');
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
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
                                <h1>Add Category</h1>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label text-light">
                                    Category Name
                                </label>
                                <Field type="text" id="name" name="name" className="form-control cus-input" placeholder="Enter category name" />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </div>
                            <Button variant="primary" type="submit" className='btn-dark btn' disabled={isLoading}>
                                {isLoading && <Spinner animation="grow" size='sm' className='mx-2' />}
                                {state?.id ? 'Update' : 'Submit'}
                            </Button>
                        </Form>
                    </Formik>
                </Col>
            </Row >
        </Container >
    );
};

export default AddCategory;
