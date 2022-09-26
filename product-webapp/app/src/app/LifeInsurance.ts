export class LifeInsurance
{
    constructor(
        public maritalStatus:string,
        public occupation:string,
        public organisationType:string,
        public Pan:string,
        public aadhar:string,
        public annualIncome:number,
        public weight:number,
        public height:number,
        public questionnaireAnswers:boolean[],
        public questionnaire:string[],
        public lifeIllnessStatus:boolean,
        public healthConditionList:string[]
    ){}
}