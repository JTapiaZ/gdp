const express = require("express");
const router = express.Router();
const path = require('path')
const multer = require('multer')

//..............Import the controllers...................................
const natural_controller = require("../controllers/naturalController");

router.route("/list").get(natural_controller.all_natural);

router.route("/details/:id").get(natural_controller.natural_details);

router.route("/create").post(natural_controller.natural_create);

router.route("/update/:id").put(natural_controller.natural_update);

router.route("/delete/:id").delete(natural_controller.natural_delete);

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './src/subidas')
    },
    filename: (req, file, cb)=> {
      cb(null, 'senamecuida_'+ path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage });
  
router.route('/subir').post(upload.single('file'), (req, res,err) => {
    if (err) {
      res.send(err)
    } else {
      res.send('GUARDO!')
      console.log(`Storage location is ${req.file.path}`);
    }
  })

module.exports = router;
