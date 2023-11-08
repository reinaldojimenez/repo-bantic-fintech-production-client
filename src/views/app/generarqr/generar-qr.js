import React, { useState } from 'react';
import { Row, Label, Button, FormGroup, CardBody } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { Formik, Form, Field } from 'formik';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { connect } from 'react-redux';
import { generarQRAct } from 'redux/actions';

const validateMount = (value) => {
  let error;
  if (!value) {
    error = 'Por favor introduce el Monto';
  }
  return error;
};


const GenerarQR = ({ history, miqr, generarQRAction, currentUser, match }) => {

  const [amount] = useState('');
  const [glosa] = useState('');
  // console.log("valor del qr ...")
  console.log(miqr)
  // console.log(currentUser)

  const initialValues = { amount, glosa };

      const onSubmit = (values) => {
        console.log(values.amount)
        console.log(values.glosa)
        console.log('ESTA ENTRANDO UNA VEZ AL METODO onSubmit')
        console.log(currentUser)
        if (values.amount !== '' && values.glosa !== '') {
          console.log('Dispatching generarQRAction');
          generarQRAction(values, history);
        }      
      };
      console.log("generando qr..")
    
      return (
        <>
          <Row>
            <Colxx xxs="12">
              <Breadcrumb heading="menu.generarqr" match={match} /> 
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row>
            <Colxx xxs="12" className="mb-4">
              <p>
                <IntlMessages id="menu.generarqr" />
              </p>             

              <Row>
                <Colxx xxs="4"/>
                {/* <Colxx xxs="3"></Colxx> */}
                <Colxx xs="12" sm="6" md="4" lg="3">
                  <CardBody>
                    <div className="form-side">
                      <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        {({ errors, touched }) => (
                          <Form className="av-tooltip tooltip-label-bottom">
                            <FormGroup className="form-group has-float-label">
                              <Label
                                style={{ fontWeight: 'bold', fontSize: '14px'}}
                              >
                                <IntlMessages id="generarqr.monto" />
                              </Label>
                              <Field
                                className="form-control"
                                name="amount"
                                type="number"
                                validate={validateMount}
                              />
                              {errors.amount && touched.amount && (
                                <div className="invalid-feedback d-block">
                                  {errors.amount}
                                </div>
                              )}
                            </FormGroup>
                            <FormGroup className="form-group has-float-label mt-4">
                              <Label
                                style={{ fontWeight: 'bold', fontSize: '14px'}}
                              >
                                <IntlMessages id="generarqr.glosa" />
                              </Label>
                              <Field
                                className="form-control"
                                type="text"
                                name="glosa"
                                
                              />
                              {errors.glosa && touched.glosa && (
                                <div className="invalid-feedback d-block">
                                  {errors.glosa}
                                </div>
                              )}
                              <div className="d-flex justify-content-center mt-3">                    
                                <Button className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'>Generar QR</Button>
                            </div>
                            </FormGroup>
                            
                          </Form>
                        )}
                      </Formik>             
                    </div>
                  </CardBody>
                  
                </Colxx>
              </Row>
            
            </Colxx>
          </Row>
        </>
      );
    };
// export default GenerarQR;

const mapStateToProps = ({ qrReducer, authUser }) => {
  const { miqr, erro } = qrReducer;
  const { currentUser } = authUser;
  return { miqr, erro, currentUser };
};

export default connect(mapStateToProps, {
  generarQRAction: generarQRAct,
})(GenerarQR);
