//import Sch model
const Sch = require('../models/sch');
const multer = require('multer');
const util = require("util");

//Multer
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, './uploads');
    },
    filename: (req, file, callback) => {
      var filename = `${Date.now()}-gov-${file.originalname}`;
      callback(null, filename);
    }
  });
const uploadImg = multer({ storage: storage }).array("image", 10);
var uploadFilesMiddleware = util.promisify(uploadImg);
module.exports = uploadFilesMiddleware;

//GET All '/Sch'
const getAllSch = (req, res, next) => {
    Sch.find({}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};

//POST '/Sch'
const newSch = (req, res, next) => {
    //check if the Sch name already exists in db
    Sch.findOne({ name: req.body.name }, (err, data) => {

        //if Sch not in db, add it
        if (!data) {
            //create a new Sch object using the Sch model and req.body
            const newSch = new Sch({
                name:req.body.name,
                category:req.body.category,
                image: req.path, // placeholder for now
                link:req.body.link,
                description:req.body.description,
                launchdate:req.body.launchdate,
                enddate:req.body.enddate,   
            })

            // save this object to database
            newSch.save((err, data)=>{
                if(err) return res.json({Error: err});
                return res.json(data);
            })
        //if there's an error or the Sch is in db, return a message         
        }else{
            if(err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({message:"Sch already exists"});
        }
    })    
};


//DELETE All '/Sch'
const deleteAllSch = (req, res, next) => {
    Sch.deleteMany({}, err => {
        if(err) {
          return res.json({message: "Complete delete failed"});
        }
        return res.json({message: "Complete delete successful"});
    })
};


//Update '/Sch/:id'
const updateOneSch = (req, res, next) =>{
    Sch.findByIdAndUpdate(req.params.id,
        {
            name:req.body.name,
            category:req.body.category,
            image: req.path, // placeholder for now
            link:req.body.link,
            description:req.body.description,
            launchdate:req.body.launchdate,
            enddate:req.body.enddate,
        },
        { new: true }
      )
        .then((data) => {
          if (!data) {
            return res.status(404).send({
              message: "Message not found with id " + req.params.id,
            });
          }
          res.send(data);
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            return res.status(404).send({
              message: "Message not found with id " + req.params.id,
            });
          }
          return res.status(500).send({
            message: "Error updating message with id " + req.params.id,
          });
        });
}


//GET '/Sch/:id'
const getOneSch = (req, res, next) => {

    //find the specific tea with that name
    Sch.findById((req.params.id), (err, data) => {
    if(err || !data) {
        return res.json({message: "Scheme doesn't exist."});
    }
    else return res.json(data); //return the Sch object if found
    });
};


//DELETE '/Sch/:id'
const deleteOneSch = (req, res, next) => {
   // let id = req.params.id; // get the name of tea to delete

    Sch.findByIdAndDelete((req.params.id), (err, data) => {
    //if there's nothing to delete return a message
    if( data.deletedCount == 0) return res.json({message: "Scheme doesn't exist."});
    //else if there's an error, return the err message
    else if (err) return res.json(`Something went wrong, please try again. ${err}`);
    //else, return the success message
    else return res.json({message: "Scheme deleted."});
    });
};

//export controller functions
module.exports = {
    getAllSch, 
    uploadImg,
    newSch,
    deleteAllSch,
    updateOneSch,
    getOneSch,
    deleteOneSch
};
