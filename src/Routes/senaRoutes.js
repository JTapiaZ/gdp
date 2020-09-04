const express = require("express");
const router = express.Router();
const path = require('path')
const multer = require('multer')

//..............Import the controllers...................................
const sena_controller = require("../controllers/senaController");

router.route("/list").get(sena_controller.all_sena);

router.route("/").get(sena_controller.log);

router.route("/details/:id").get(sena_controller.sena_details);

router.route("/create").post(sena_controller.sena_create);

router.route("/update/:id").put(sena_controller.sena_update);

router.route("/delete/:id").delete(sena_controller.sena_delete);

// var upload = multer({ dest: "Upload_folder_name" }) 
// If you do not want to use diskStorage then uncomment it 

const d = new Date()
const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
const ho = new Intl.DateTimeFormat('en', { hour: '2-digit' }).format(d)
const mi = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(d)

var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
  
        // Uploads is the Upload_folder_name 
        cb(null, "./src/subidasSena")
    }, 
    filename: function (req, file, cb) { 
      cb(null, ye + "-" + mo + "-" + da + "-" + ho + "-" + mi + "-" + file.fieldname + "-" + file.originalname) 
    } 
  }) 
       
  // Define the maximum size for uploading 
  // picture i.e. 1 MB. it is optional 
  const maxSize = 20 * 20000 * 20000; 
    
  var upload = multer({  
    storage: storage, 
    limits: { fileSize: maxSize }, 
    fileFilter: function (req, file, cb){ 
    
        // Set the filetypes, it is optional 
        var filetypes = /rar|zip/; 
        var mimetype = filetypes.test(file.mimetype); 
  
        var extname = filetypes.test(path.extname( 
                    file.originalname).toLowerCase()); 
        
        // console.log(file.originalname);
        
        if (mimetype && extname) { 
            return cb(null, true); 
        } 
      
        cb("Error: No puede subir achivos de este tipo "
                + "tipo de archivo - " + filetypes); 
      }  
  
  // mypic is the name of file attribute 
  }).single("gdp");        
  
  // app.get("/",function(req,res){ 
  //   res.render("Signup"); 
  // }) 
    
  router.route('/uploadProfilePicture').post(function (req, res, next) { 
        
    // Error MiddleWare for multer file upload, so if any 
    // error occurs, the image would not be uploaded! 
    upload(req,res,function(err) { 
  
        if(err) { 
  
            // ERROR occured (here it can be occured due 
            // to uploading image of size greater than 
            // 1MB or uploading different file type) 
            res.send(err) 
        } 
        else { 
  
            // SUCCESS, image successfully uploaded 
            res.send("Bien, Archivo cargado exitosamente!") 
        } 
    }) 
  }) 

module.exports = router;
