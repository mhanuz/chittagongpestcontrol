import multer from 'multer';
import dotenv from 'dotenv';
import { GridFsStorage } from 'multer-gridfs-storage';

dotenv.config();

const username = process.env.DB_Username;
const password = process.env.BD_Password;
const storage = new GridFsStorage({
    url: `mongodb+srv://${username}:${password}@chittagongpestcontrol.hviumcx.mongodb.net/?retryWrites=true&w=majority`,
    options: {useNewUrlParser: true},
    file: (request,file) =>{
        const match = ["image/png","image/jpg"];
        if (match.indexOf(file.memeType)===-1){
            return `${Date.now()}-blog-${file.originalname}`
        }

        return {
            bucketname: 'photos',
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
})

export default multer ({ storage })
