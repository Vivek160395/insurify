export class InsuredInfo{
    constructor(
        public insuredDOB:string,
        public relation:string,
        public weight:number,
        public height:number,
        public name:string,
        public preExistingIllness:boolean,
        public illnessList:string[]
    ){}
}