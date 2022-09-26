import { AutomobileInsurance } from "./AutomobileInsurance";
import { HealthInsurance } from "./HealthInsurance";
import { LifeInsurance } from "./LifeInsurance";

export class CustomerInsurancePurchase{
    constructor(
       public customerPolicyId :string,
       public insurancePolicyId :string,
       public email :string,
       public sumInsured :number,
       public startDate :string,
       public endDate :string,
       public duration :number,
       public addOnName :string[],
       public premium :number,
       public name :string,
       public mobile :number,
       public address :string,
       public pincode :number,
       public city :string,
       public state :string,
       public nameOfNominee :string,
       public nomineeDOB :string,
       public relation :string,
       public renewalStatus :boolean=false,
       public status :boolean=true,
       public healthInsurance:HealthInsurance,
       public lifeInsurance:LifeInsurance,
       public automobileInsurance:AutomobileInsurance
    ){ }
}