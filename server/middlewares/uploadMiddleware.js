import multer from 'multer';
const storage = multer.diskStorage({
  
    
    filename: function (req, file, cb) {
      //console.log(error)
      
      cb(null, file.originalname);
    },
  });
  
  export const upload = multer({ storage: storage })