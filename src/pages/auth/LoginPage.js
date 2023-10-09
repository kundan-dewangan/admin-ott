import React from 'react';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginCred } from '../../utils/utils';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is Required'),
      password: Yup.string()
        .required('Password is Required'),
    }),
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      if ((values.email === loginCred.email) && (values.password === loginCred.password)) {
        localStorage.setItem('isAuth', JSON.stringify(true))
        navigate('/app')
      } else {
        toast.error("Invalid email and password")
      }
    },
  });

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={6} className='border rounded p-4'>
          <h2>Admin Login</h2>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="email" className='mt-4'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                className='cus-input'
                {...formik.getFieldProps('email')}
                isInvalid={formik.touched.email && formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                className='cus-input'
                {...formik.getFieldProps('password')}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className='mt-4'>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
