//STEP 1: import MULTER
import multer, { diskStorage } from 'multer';

//STEP 4: used for random file name
import { v4 as uuidv4 } from 'uuid';


//STEP 3: crate helper constant
//this is a simple JS object where we will map certain 
//MIME types to certain file extensions
//MULTER gives us certain information about MIME type it found for upload file
//with map we can identiry the extension by the MIME type identified
const MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};


//We will exectue this as a function
//a function at which we can pass a configuration object
//the result of this function is the actual file upload middleware that MULTER provides
//this is now a middlware
const fileUpload = multer({
    //STEP 2: we configure MLULTER to tell it where to store something
    //and also which files to accept
    limits: 500000, //set this to 500,000 bytes (upload limit 500 KB)
    storage: diskStorage({
        //control how data will get stored 
        //control destination where files will be storaged
        destination: (req,file, cb)=> {

            //derive the path at which we want to store the upload
            cb(null, 'uploads/images');
            //NOTE: create a new UPLOADS/images folder(s) in the BACKEND

        },
        filename: (req,file,cb)=> {

            //extract the extension of incoming file
            const ext = MIME_TYPE_MAP[file.mimetype];

            
            //gnerate random filename using UUID package
            cb(null, uuidv4() + '.' + ext);
        }
    }),
    fileFilter: (req, file, cb) => {
        //check if we have a valid upload type
        //double band operator we convert undefined or null to FALSE
        const isValid = !!MIME_TYPE_MAP[file.mimetype];

        let error = isValid ? null : new Error('Invalid mime type!');
        cb(error, isValid);
    }

});

export default fileUpload;