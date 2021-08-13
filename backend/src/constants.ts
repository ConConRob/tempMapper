import   {join} from "path"

if(!process.env.MONGODB_URI){
    require('dotenv').config({path: join(__dirname,'../.env')})

}



export const DB_URI = process.env.MONGODB_URI 

export const DB_NAME = process.env.DB_NAME 


export const LISTING_COLLECTION_NAME = 'listings'


