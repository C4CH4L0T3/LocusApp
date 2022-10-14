const app = require('../config/server')
const db = require('../config/db')
const path = require('path');
require('colors')
const multer = require('multer');

// ------ Cloudinary config
const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'dkxhqlmec', 
    api_key: '861168279331914', 
    api_secret: 'rB3e8LYNcW88mzn-dOY28Y6QX_k' 
  });

// ------- Multer config
const multerConfig = multer.diskStorage({
    destination:  'src/static/uploads',
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }

});
const upload = multer({ storage: multerConfig })

// APP GET METHODS
app.get('/', (req, res)=>{
    res.render('../views/index')
});

app.get('/localizaciones', (req, res)=>{
    res.render('../views/localizaciones')
});

app.get('/repositorio', (req, res)=>{
    res.render('../views/repositorio')
});

app.get('/corregimiento', (req, res)=>{
    res.render('../views/corregimiento')
});
app.get('/lugares', (req, res)=>{
    res.render('../views/lugares')
});

app.get('/restaurant', (req, res)=>{
     db.query("SELECT * FROM comments ", (err, result) => {
        if(err){
            console.log('Hubo un error: '.bgRed + err);
        }else{
            res.render('../views/restaurant',{
                result
            })
            console.log(result)
        }
     })
});

app.get('/sanantonio', (req, res)=>{
    res.render('../views/sanAntonio')
});

app.get('/servicios', (req, res)=>{
    db.query("SELECT * FROM services_publications WHERE categoria = 'comida' ", (err, result)=>{
        if(err){
            console.log('Hubo algun error '.bgRed + err)
        }else{
            res.render('../views/servicios',{
                result
            })
        }
    })
});

app.get('/galeria', (req, res)=>{
    db.query('SELECT * FROM photos', (err, result)=>{
        if(err){
            console.log('Hubo un error en la consulta '.bgRed + err)
        }else{
            res.render('../views/galeria',{
                result
            })
        }
    })
});


app.get('/servicios/transporte', (req, res)=>{
    db.query("SELECT * FROM services_publications WHERE categoria = 'transporte' ", (err, result)=>{
        if(err){
            console.log('Hubo algun error '.bgRed + err)
        }else{
            res.render('../views/servicios-transporte',{
                result
            })
        }
    })
});

app.get('/servicios/tours', (req, res)=>{
    db.query("SELECT * FROM services_publications WHERE categoria = 'tours' ", (err, result)=>{
        if(err){
            console.log('Hubo algun error '.bgRed + err)
        }else{
            res.render('../views/servicios-tours',{
                result
            })
            console.log(result)
        }
    })
});

app.get('/servicios/hospedaje', (req, res)=>{
    db.query("SELECT * FROM services_publications WHERE categoria = 'hospedaje' ", (err, result)=>{
        if(err){
            console.log('Hubo algun error '.bgRed + err)
        }else{
            res.render('../views/servicios-hospedaje',{
                result
            })
            console.log(result)
        }
    })
});

// ADD DATA ROUTES

app.get('/comida/add', (req, res)=>{
    res.render('../views/comida-form')
});

app.get('/galeria/add', (req, res)=>{
    res.render('../views/galeria-form')
});


// APP POST METHODS

// Sistema de comentarios
app.post("/comment",(req,res) =>{
    const { author, message, date} = req.body;
    db.query('INSERT INTO comments SET?',{
        author,
        message,
        date_publication: date
    }, (err, result)=>{
        if(err){
            console.log('No se hizo el post '.bgRed + err);

        }else{
            res.redirect('/restaurant')
        }
    });
})


// Sistema de subida de imagenes con sistema de interacciones
app.post('/uploadimg', upload.single('imagen'), async(req, res)=>{
    const resultado = await cloudinary.v2.uploader.upload(req.file.path);
    const { nombre, descripcion, date } = req.body
    db.query("INSERT INTO photos SET?",{
        img_ruta: resultado.url,
        nombre,
        descripcion,
        fecha: date
    }, (err, result)=>{
        if(err){
            console.log('No se hizo el post, '.bgRed + err)
        }else{
            res.redirect('/galeria');
        }
    });
});


app.post('/likear', (req, res)=>{
    const id = req.body;
    let likes;
    db.query(`SELECT * FROM photos WHERE id = ${id.id}`, (err, result) =>{
      if(err){
        console.log('Hubo algun error '.bgRed + err)
      }else{
        likes = result[0].likes;
        db.query(` UPDATE photos SET likes = ${likes + 1} WHERE id = ${id.id} `, (err, result)=>{
          if(err){
            console.log('No se pudo hacer update '.bgRed + err)
          }else{
            res.redirect('/galeria')
          }
        })
      }
    })
  })


//   Agregar Servicios
app.post('/uploadservices', upload.single('imagen'),async(req, res)=>{
    const resultado = await cloudinary.v2.uploader.upload(req.file.path);
    let {categoria, titulo, subtitulo, descripcion, negocio, link} = req.body;
    db.query('INSERT INTO services_publications SET?',{
        categoria,
        titulo,
        subtitulo,
        descripcion,
        tipo_negocio: negocio,
        link_negocio: link,
        img_ruta: resultado.url
    }, (err, result)=>{
        if(err){
            console.log('Hubo algun error '.bgRed + err)

        }else{
            res.redirect('/servicios');
        }
    })
})


app.all("*", (req, res) => {
    const badUrl = req.originalUrl;
    res.render("../views/404.ejs", {
      ruta: badUrl,
    });
  });