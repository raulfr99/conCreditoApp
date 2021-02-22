const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const fileUpload = require('express-fileupload')


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'concredito'

})

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public'));



app.post('/registrar',(req,res)=>{
       
       
        const estatus = 0
        const nombre = req.body.nombre
        const primerApellido = req.body.primerApellido
        const segundoApellido = req.body.segundoApellido
        const calle = req.body.calle
        const numero = req.body.numero
        const colonia = req.body.colonia
        const codigoPostal = req.body.codigoPostal
        const telefono = req.body.telefono
        const rfc = req.body.rfc
        const documentos = req.files.documentos.name
        
        

        //Imagenes
        var randomID = Math.floor(Math.random() * 999999) + 1 ;
        var aux = req.files.documentos.length
        for (var i = 0; i <= (aux-1); i++) {
            var myFile = req.files.documentos[i];
            myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
                if (err) {
                    console.log(err)
                    
                }
                console.log('Imagenes subidas!')
               
            });
            //Subir a la base
            db.query('INSERT INTO documentos (id_documentos,nombre_documento) VALUES(?,?)'
                ,[randomID,myFile.name],
                (err,result)=>{
                    if(err){
                        console.log('ERROR: '+err)
                    }
                    else{
                        console.log('Valores de imagenes insertados!')
                        //res.send('Valores de imagenes Insertados')
                    }
                })
         }
         

        db.query('INSERT INTO prospectos (estatus,nombre,primer_apellido,segundo_apellido,calle,numero,colonia,codigo_postal,telefono,rfc,documentos) VALUES(?,?,?,?,?,?,?,?,?,?,?)'
        ,[estatus,nombre,primerApellido,segundoApellido,calle,numero,colonia,codigoPostal,telefono,rfc,(randomID)],
        (err,result)=>{
            if(err){
                console.log('ERROR: '+err)
            }
            else{
                res.send('Valores Insertados')
            }
        })

})

app.get('/listado',(req,res)=>{
    db.query("SELECT * FROM prospectos",(err,result)=>{
        if(err){
             console.log(err) 
        }
        else{
            res.send(result)
        }
    })
});
app.post('/getDocuments',(req,res)=>{
    console.log(req.body.id)
    let idDocs = req.body.id

    db.query("SELECT * FROM documentos WHERE id_documentos = "+idDocs,(err,result)=>{
        if(err){
             console.log(err) 
        }
        else{
            console.log(result)
            res.send(result)
        }
    })
});

app.post('/aceptar',(req,res)=>{
    console.log(req.body.id)
    let id = req.body.id

    db.query("UPDATE prospectos SET estatus = '1' WHERE id = "+id,(err,result)=>{
        if(err){
             console.log(err) 
        }
        else{
            console.log(result)
            res.send(result)
        }
    })
});

app.post('/rechazar',(req,res)=>{
    console.log(req.body.id)
    let id = req.body.id
    let comm = req.body.comentarios
    db.query("UPDATE prospectos SET estatus = '2', comentarios = "+ "'"+comm+"'"+" WHERE id = "+id,(err,result)=>{
        if(err){
             console.log(err) 
        }
        else{
            console.log(result)
            res.send(result)
        }
    })
});

app.listen(3002,()=>{
    console.log('Server corriendo en el 3002!')
})
