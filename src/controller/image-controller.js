import {Router} from 'express';
import multer from 'multer';
import * as imageService from "../service/image-service";
import * as commentService from "../service/comment-service";

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
});
const upload = multer({ storage: storage });

let router = Router();

router.get('/', function (req, res, next) {
    imageService.getAllImages()
        .then(response => {
            res.json({imageList: response});
        })
        .catch((err) => {
            res.json({data: 'Database Error', error: err});
        })
});

router.get("/:id", (req, res) => {
    let pictureName = req.params.id;
    res.sendFile("./uploads/"+pictureName, { root: '.'});
});

router.get("/getImage/:id", function (req, res, next){
    imageService.getRandomImage(req.params.id)
        .then(response =>{
            res.json({data:response});
        })
        .catch( err=>{
            res.json({data: 'Database Error', error: err});
        })
});

router.delete("/deleteImage/:id", function (req, res, next){
    commentService.deleteComment(req.params.id)
        .then(response=>{
            return imageService.deleteImage(req.params.id);
        })
        .then(response =>{
            res.json({message:'Deleted Successfully!'});
        })
        .catch( err=>{
            res.json({data: 'Database Error', error: err});
        })
});

router.post('/upload', upload.single('uploadedImage'), function (req, res, next) {
    imageService.saveImage(req.file)
        .then(response=>{
            res.json({data:response, message: 'Image Uploaded Successfully'});
        })
        .catch(err=>{
            res.json({data: 'Database Error', error: err});
        })
});


export default router;
