import React from 'react';
import {useState,useRef} from "react";
import Axios from 'axios';
import {Toast} from 'react-bootstrap'

const Inicio = () => {
    const [nombre,setNombre] = useState("")
    const [primerAp,setPrimerAp] = useState("")
    const [segundoAp,setSegundoAp] = useState("")
    const [calle,setCalle] = useState("")
    const [numero,setNumero] = useState("")
    const [colonia,setColonia] = useState("")
    const [codigoPostal,setCodigoPostal] = useState("")
    const [telefono,setTelefono] = useState("")
    const [rfc,setRfc] = useState("")
    const [documentos,setDocumentos] = useState([])
    const [advLabel,setLabel] = useState(false)
  
    const agregarProspecto = () => {
      if((nombre&&primerAp&&calle&&numero&&colonia&&codigoPostal&&telefono&&rfc&&file)!=(null || "")){
       
        const formData = new FormData();   
        formData.append('nombre',nombre)     
        formData.append('primerApellido',primerAp)   
        formData.append('segundoApellido',segundoAp) 
        formData.append('calle',calle) 
        formData.append('numero',numero) 
        formData.append('colonia',colonia) 
        formData.append('codigoPostal',codigoPostal) 
        formData.append('telefono',telefono) 
        formData.append('rfc',rfc) 
        for (var i = 0; i <= (file.length-1); i++) {
          formData.append('documentos', file[i]);
       }
        
        Axios.post('http://localhost:3002/registrar',formData,{
       
        
        }).then(()=>{
          console.log('Success')
        }).catch(err=>console.log(err))
      }
      else{
        setLabel(true)
      }
      
    }
    
    const [file, setFile] = useState([]); 
      const [data, getFile] = useState({ name: "", path: "" });    const [progress, setProgess] = useState(0); 
      const el = useRef(); 
    const handleChange = (e) => {
          setProgess(0)
          const file = e.target.files; 
          console.log(file);
          
         
          setFile(file); 
      }
      
    return(
        <div className="App">
      
      <div className="informacion">
     <label className="labelInput">Nombre</label>
     <input type="text" onChange={(e)=>{setNombre(e.target.value);
    }}/>
   
    <label className="labelInput">Primer Apellido</label>
     <input  type="text" onChange={(e)=>{setPrimerAp(e.target.value);
    }}/>
     
    <label className="labelInput">Segundo Apellido</label>
     <input  type="text" onChange={(e)=>{setSegundoAp(e.target.value);
    }}/>
     
    <label className="labelInput">Calle</label>
     <input type="text" onChange={(e)=>{setCalle(e.target.value);
    }}/>
     
    <label className="labelInput">Numero</label>
     <input type="text" onChange={(e)=>{setNumero(e.target.value);
    }}/>
     
     <label className="labelInput">Colonia</label>
     <input type="text" onChange={(e)=>{setColonia(e.target.value);
    }}/>
     
    <label className="labelInput">Codigo Postal</label>
      <input type="text" onChange={(e)=>{setCodigoPostal(e.target.value);
      }}/>
      
    <label className="labelInput">Telefono</label>
    <input type="text" pattern="[0-9]*" onChange={(e)=>{setTelefono(e.target.value);
    }}/>
    
    <label className="labelInput">RFC</label>
    <input type="text" onChange={(e)=>{setRfc(e.target.value);
    }}/>
     <hr style={{width:'80%'}}/>
    
    
    <label style={{fontWeight:'bold'}}>Documentos</label>
    <input type="file" multiple type="file" ref={el} onChange={handleChange}/>

    <button onClick={agregarProspecto} className="sendButton">Agregar Prospecto</button>
    </div>
    <div className="toastContainer">
    <Toast show={advLabel} onClose={() => setLabel(false)}>
      <Toast.Header>
        
        <strong className="mr-auto">ADVERTENCIA</strong>
        
      </Toast.Header>
      <Toast.Body>
        <p style={{color:'#e61e1e',fontWeight:'bold',padding:'10px',}}>Ingresa todos los datos o agrega documentos.</p></Toast.Body>
    </Toast>
    </div>
   
    </div>
    )
}

export default Inicio;