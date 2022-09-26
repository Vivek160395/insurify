import { InsuredInfo } from "./InsuredInfo";

export class HealthInsurance{
    constructor(
        public kids:number,
        public adults:number,
        public insuredInfo:InsuredInfo[],
    ){}
    
}