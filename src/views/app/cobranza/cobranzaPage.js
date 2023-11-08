import React, { useEffect, useState } from 'react';
import { Row, Button, Card, CardBody, Table, CardTitle } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { getCurrentUser } from 'helpers/Utils';
import { getAllQRByUser } from 'api/auth';
import BotonVerQR from './BotonVerQR'
import DataTablePagination from './DatatablePagination'

const CobranzaPage = ({ match }) => {
    const [allQRByUser, setAllQRByUser] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTupla, setCurrentTupla] = useState(null);

    /* eslint-disable */
    const [productsPerPage, setProductsPerPage] = useState(10);
    /* eslint-enable */
    const [curentPage, setCurrentPage] = useState(1);
    
    const totolProduct = allQRByUser.length

    const lastIndex = curentPage * productsPerPage // 1 * 6 = 6  |  2 * 6 = 12  |  3 * 6 = 18
    const firstIndex = lastIndex - productsPerPage // 6 - 6 = 0  |  12 - 6 = 6  |  18 - 6 = 12

    useEffect( async () => {
      try {
        const { title: userName} = getCurrentUser();
        const data = {
          userName, 
          fkCustomer: "1", 
          typeRequest: "DATAQR"
        }
        console.log("SE ESTA EJECUTANDO EL USEEFECT ....")
        const resultado = await getAllQRByUser(data);
        console.log(resultado.data.data)
        setAllQRByUser(resultado.data.data)
      } catch (error) {
        console.log("error al obtener los datos de Cobranza")
      }
      
    }, [])

    const handleVerModal = (tupla) => {
      setCurrentTupla(tupla);
      setIsModalOpen(true);
      // setTuplaQR(tuplaQR)
      console.log("la tupla es: ")
      console.log(tupla)
      // setModalBasicP(!modalBasicP);     
    }

    return (
    <>
        <Row>
            <Colxx xxs="12">
                <Breadcrumb heading="menu.cobranza" match={match} />
                <Separator className="mb-5" />
            </Colxx>
        </Row>
        <Row>
            <Colxx xxs="12" className="mb-4">
                <p>
                    <IntlMessages id="menu.cobranza" />
                </p>
                                
            </Colxx>
        </Row>


        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <IntlMessages id="table.bootstrap-basic" />
              </CardTitle>
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Monto</th>
                    <th>Moneda</th>
                    <th style={{width: '7%'}}>Estado</th>
                    <th>Fecha de Expiracion</th>
                    <th>Fecha de Pago</th>
                    <th>Ver QR</th>                    
                    <th>Verificar</th>
                    <th>Cancelar</th>
                  </tr>
                </thead>
                <tbody>

                {
                  allQRByUser.length === 0 ? <tr><td colSpan="10" align='center'>Cargando ...</td></tr> : undefined
                }            
                { 
                  allQRByUser.map((tupla) => (
                                 
                      <tr key={tupla.id}>
                          <th scope="row"> {tupla.id} </th>
                          <td> {tupla.userName} </td>
                          <td> {tupla.amount} </td>
                          <td> {tupla.currency} </td>
                          {/* <td> {tupla.status} </td>  */}                         
                          { 
                            // eslint-disable-next-line
                            parseInt(tupla.status, 10) === 0 ? <td> sin pagar </td> : <td style={{background: '#5abd71', color: 'white', textAlign: 'center', fontWeight:'bold'}}> <span style={{background: '#5abd71', color: 'white'}}>pagado</span> </td>
                          }
                          
                          <td style={{textAlign:'center'}}> {new Date(tupla.expirationdate).toLocaleDateString()} </td>

                          { 
                            // eslint-disable-next-line
                            parseInt(tupla.status, 10) === 0 ? <td style={{textAlign:'center'}}> - </td> : <td style={{fontWeight:'', textAlign: 'center'}}> <span>25/10/2023 15:30</span> </td>
                          }
                          {
                            parseInt(tupla.status, 10) === 0 ?
                            
                              <>
                              <td><Button className='px-3 py-1' onClick={ () => handleVerModal(tupla) }>Ver QR</Button></td>
                              <td><Button className='px-3 py-1'>Verificar</Button></td> 
                              <td><Button className='px-3 py-1'>Cancelar</Button></td>
                              </>
                            
                            :
                            (
                              /* eslint-disable */
                              <>                              
                                <td></td>
                                <td></td>
                                <td></td>
                              </>
                              /* eslint-enable */
                            )
                          }                     
                          
                     </tr> 
                  
                  )).slice(firstIndex, lastIndex)
                } 
                </tbody>                
              </Table>

              <DataTablePagination
                productsPerPage={productsPerPage} 
                curentPage={curentPage} 
                setCurrentPage={setCurrentPage}
                totolProduct={totolProduct}
              />

              {isModalOpen && (
                  <BotonVerQR
                    currentTupla={currentTupla}
                    /* key={currentTupla.id} */
                    isOpen={isModalOpen}
                    closeModal={() => setIsModalOpen(false)}
                  />
                )}
                
            </CardBody>
          </Card>
        </Colxx>
    </>
    );
};
export default CobranzaPage;
