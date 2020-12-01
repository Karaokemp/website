import { Language } from "../types";

export default class LanguageHelper{
    static infer(text: string) : Language{
        if(this.isHebrew(text)){
            return Language.HEWBREW
        }else{
            return Language.ENGLISH
        }
    }
    static isHebrew(str:string) {
        return (/[\u0590-\u05FF]/).test(str);
    }
}

LanguageHelper.infer('בלה')