import React from 'react';
import { Button, Label, Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { getVersion } from 'api/auth';

const BlankPage = ({ match }) => {

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('ANTES DE HACER LA PETICION')
      const respuesta = await getVersion();
      console.log(respuesta)                     
      // return respuesta.data;
    } catch (error) {
        console.log(error.response.data)
        if(Array.isArray(error.response.data)){
            // return setErrors(error.response.data);
            return null;
        }        
    }
    // navigate('/verqr')
    return null
  };
  console.log("generando qr..")

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.blank-page" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <p>
            <IntlMessages id="menu.blank-page" />
          </p>          

          <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-white p-5 rounded-2 text-secondary" style={{ width: '25 rem', border: '1 px solid #EE7A19' }}>
                <div className="flex justify-center">
                    {/* <img src={ logoEmpresa } alt="login-icon" style={{ height: 7+'rem', marginBottom: 2.5+"rem" }} /> */}
                </div>                

                <form onSubmit={onSubmit}>
                    <div className="input-group mt-4">                        
                        <Label className="w-100 mb-2" style={{ fontWeight: 'bold' }} htmlFor="glosa"> Glosa:</Label>      
                        <input className="w-full bg-zinc-50 border-solid border-2 border-orange-300 px-4 py-2 rounded-md my-2" type="text" name="glosa" id="glosa" placeholder="Glosa"/>                        
                    </div>

                    <div className="input-group mt-3">
                        <Label className="w-100 mb-2" style={{ fontWeight: "bold" }} htmlFor="clave">Monto:</Label>                        
                        <input className="w-full bg-zinc-50 border-solid border-2 border-orange-300 px-4 py-2 rounded-md my-2" type="number" name="monto" id="monto" min="0" step="0.01" placeholder="Monto"/>                                               
                    </div>

                    <div className="flex w-full justify-center">                    
                        <Button className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'>Generar QR</Button>
                    </div>
                </form>

            </div>
        </div>
        </Colxx>
      </Row>
    </>
  );
};

export default BlankPage;
