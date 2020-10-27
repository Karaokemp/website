import { AnyCnameRecord } from "dns";

export default function packageResponse(payload: any){
        return  {
            statusCode: 200,
            body: JSON.stringify(payload)
        }
    }