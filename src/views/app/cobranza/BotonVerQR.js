import React from 'react';
// import React, { useState } from 'react';
import { 
    Button,
    Card,
    CardBody,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from 'reactstrap';
  
// import IntlMessages from 'helpers/IntlMessages';
import ImageB64 from 'components/base64toimg/ImageB64';

function BotonVerQR({ currentTupla, isOpen, closeModal }) {
    console.log("LLAMAMOS AL MODAL")
    // const [modalBasic, setModalBasic] = useState(isOpen);

  return (
    <Card className="mb-4">
        <CardBody>              
            <div>
            <Modal
                isOpen={isOpen}
                toggle={() => closeModal(!isOpen)}
            >
                <ModalHeader>
                    {/* <IntlMessages id="Verificado" /> */}
                    Cod: { currentTupla.idQR } <br/>
                    { currentTupla.gloss } <br/>
                                  
                </ModalHeader>
                <ModalBody>
                <div className="d-flex justify-content-center">
                    {/* <img src={ verificadoImg } alt="verify" style={{ height: '14rem', width: "15rem" }} /> */}
                    <div className="d-flex justify-content-center">
                        { currentTupla ? (<ImageB64 base64String = { currentTupla.codigoQR }/>) : <h3>No disponible ...</h3>}
                    </div>
                </div>                 
                </ModalBody>
                <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => closeModal(false)}
                >
                    Aceptar
                </Button>{' '}                    
                </ModalFooter>
            </Modal>
            </div>
        </CardBody>
    </Card>
  )
}

export default BotonVerQR