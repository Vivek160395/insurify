import { AddOnDetails } from "./add-on-details";
import { PolicyBenefits } from "./policy-benefits";
import { PolicyDetails } from "./policy-details";

export class Insurance {
      constructor(
    public  insuranceType    :string,
    public  policyId         :any,
    public  category         :string,
    public  modelsAllowed    :string[],
    public  policyName       :string,
    public  policyDescription:string,
    public  policyDetails            :PolicyDetails[],
    public  policyBenefits           :PolicyBenefits[],
    public  addOnDetails             :AddOnDetails[],
    public  policyDocuments          :string,
    public  fileSource               :any
  ){}
}
