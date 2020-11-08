import { AnyCnameRecord } from "dns";

export default function packageError(statusCode:number,msg:string){
        return  {
            statusCode: statusCode,
            body: msg
        }
    }