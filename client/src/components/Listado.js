import React, { Component, useState } from 'react';
import Axios from 'axios';
import {Button,Modal,Table,InputGroup,FormControl} from 'react-bootstrap'
import {Link} from 'react-router-dom'
class Listado  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            propList : [],
            show: false,
            showComm:false,
            dataModal : [],
            documentList : [],
            comentarios: ''
        }
    }
    
    componentDidMount(){
        this.getProspectos()
    }
   
    setDataModal = (val) => {
        const formData = new FormData();   
      formData.append('id',val.documentos)  
        Axios.post('http://localhost:3002/getDocuments',formData ,{
           
          }).then((response)=>{
              console.log(response.data)
              this.setState({documentList:response.data})
          });
          console.log('br: ', this.state.documentList)
        this.setState({dataModal:val})
        
        this.setState({show:true})
        
    
    }
    getProspectos = () => {
           Axios.get("http://localhost:3002/listado").then((response)=>{
               this.setState({propList:response.data})
               
           })
         
    }
    aceptar = () => {

        const formData = new FormData();   
      formData.append('id',this.state.dataModal.id)
        Axios.post('http://localhost:3002/aceptar',formData ,{
           
        }).then((response)=>{
            console.log(response.data)
            
        });
        window.location.reload(true);

    }
    rechazar = () => {
     const formData = new FormData();   
      formData.append('id',this.state.dataModal.id)
      formData.append('comentarios',this.state.comentarios)

        Axios.post('http://localhost:3002/rechazar',formData ,{
           
        }).then((response)=>{
            console.log(response.data)
            
        });
        window.location.reload(true);
    }
    
    render(){
    return(
        
        <div>
           
           
            
            <Modal show={this.state.show} 
            onHide={() => this.setState({show:false})} > 
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body >
                <div className="modalBody">
                <div>
                <p className="labelBody">Estatus:</p>
                <p className="subBody" style={this.state.dataModal.estatus == '0' ? {} : this.state.dataModal.estatus == '1' ?{backgroundColor:'#34bf3d',color:'white'} : {backgroundColor:'#e61e1e',color:'white'}}>
                {this.state.dataModal.estatus == '0' ? ('Enviado') : this.state.dataModal.estatus == '1' ?('Aceptado') : 'Rechazado' }</p>
                <p className="labelBody">Nombre:</p>
                <p className="subBody">{this.state.dataModal.nombre}</p>
                <p className="labelBody">Primer Apellido:</p>
                <p className="subBody">{this.state.dataModal.primer_apellido}</p>
                <p className="labelBody">Segundo Apellido:</p>
                <p className="subBody">{this.state.dataModal.segundo_apellido}</p>
                <p className="labelBody">Segundo Apellido:</p>
                <p className="subBody">{this.state.dataModal.calle}</p>
                <p className="labelBody">Numero:</p>
                <p className="subBody">{this.state.dataModal.calle}</p>
                <p className="labelBody">Codigo Postal:</p>
                <p className="subBody">{this.state.dataModal.codigo_postal}</p>
                <p className="labelBody">RFC:</p>
                <p className="subBody">{this.state.dataModal.rfc}</p>
                <p className="labelBody">Telefono:</p>
                <p className="subBody">{this.state.dataModal.telefono}</p>
                 </div>
                <hr/>
                <div className="documentContainer">
                <h1>
                    Documentos
                </h1>
                <p className="subBody">{this.state.documentList.map((val,key)=>{
                    return(
                        <div>
                        <div>
                        <p> {val.nombre_documento}</p>
                        </div>
                        
                        </div>  
                        
                    )
                })}</p>
                <div style={{marginTop:'30%'}}>
                {this.state.dataModal.estatus== '0'?(null): this.state.dataModal.estatus == '1' ?(null):(<div><p className="labelBody">Comentarios</p><p className="subBody">{this.state.dataModal.comentarios}</p></div>)}
                {this.state.dataModal.estatus== '0'?(<div><Button onClick={()=>this.aceptar()}> Aceptar</Button>,<Button variant="danger" onClick={()=>(this.setState({showComm:true}), this.setState({show:false}))}> Rechazar</Button></div>)
                : this.state.dataModal.estatus == '1' ?(null):(null)}
                </div>
                </div>
                   
                </div>
               
                
            </Modal.Body>
            </Modal>


           {/** Segundo modal*/}
           <Modal show={this.state.showComm} 
            onHide={() => this.setState({showComm:false})} > 
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body >
                <div className="modalBody">
                <InputGroup>
                <InputGroup.Prepend>
                <InputGroup.Text>Comentarios</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl onChange={(e)=>this.setState({comentarios:e.target.value})} as="textarea" aria-label="With textarea" />
                </InputGroup>
                
                <Button onClick={()=>this.rechazar()}>Enviar Comentarios</Button>
                </div>
               
                
            </Modal.Body>
            </Modal>

            
            {this.state.propList.map((val,key)=>{
                return (
                    <div>
                        
                    
                    <h1>{val.nombre}</h1> 
                   
            <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Nombre</th>
                        <th>Primer Apellido</th>
                        <th>Segundo Apellido</th>
                        <th>Estatus</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{val.nombre}</td>
                        <td>{val.primer_apellido}</td>
                        <td>{val.segundo_apellido}</td>
                        <td style={val.estatus == '0' ? {} : val.estatus == '1' ?{backgroundColor:'#34bf3d',color:'white'} : {backgroundColor:'#e61e1e',color:'white'}}>
                        {val.estatus == '0' ? ('Enviado') : val.estatus == '1' ?('Aceptado') : 'Rechazado' }</td>
                        <td><Button onClick={()=>this.setDataModal(val)}>Ver Prospecto</Button></td>
                        </tr>
            
                    </tbody>
                    

                    </Table>
                    
               
                 </div>
                );
            })}
           
            

        </div>
    )
}
  
}

export default Listado;