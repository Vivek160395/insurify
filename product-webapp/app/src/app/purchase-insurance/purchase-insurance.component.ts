import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutomobileInsurance } from '../AutomobileInsurance';
import { CustomerInsurancePurchase } from '../CustomerInsurancePurchase';
import { HealthInsurance } from '../HealthInsurance';
import { Insurance } from '../insurance';
import { InsuredInfo } from '../InsuredInfo';
import { LifeInsurance } from '../LifeInsurance';
import { PolicyDetails } from '../policy-details';

@Component({
  selector: 'app-purchase-insurance',
  templateUrl: './purchase-insurance.component.html',
  styleUrls: ['./purchase-insurance.component.css']
})
export class PurchaseInsuranceComponent implements OnInit {

  id!:number
  email:string=''
  isAuto=false
  isHealth=false
  isLife=false
  isCar=false
  isBike=false
  dob_list:Date[]=[]
  policyName!:string
  policyDetails!:PolicyDetails
  addonnamelist:string[]=[]
  times=0
  date = new Date();
  autocategory:string='' 
  addonpremium=0
  xy:number=0
  y:number=0
  insurance_object!:Insurance 
  dis_status:string=''
  lifediseasestatus:boolean=false
  doblist:string[]=[]
  insInfo:InsuredInfo[]=[]
  questions:string[]=[
  "Have you consumed Alcohol in the last one year?",
  "Have you ever consumed narcotics?",
  "Are you employed in the armed, para military or police forces?",
  "Is your occupation associated with any specific hazard or do you take part in activities or have hobbies that could be dangerous in any way?",
  "Have you undergone any tests/investigations/surgery or have been hospitalized for observation or treatment in the past?",
];
life_answers:boolean[]=[]
dob!:string
rel!:string
wei!:number
hei!:number
nam!:string
ill!:boolean
illList!: string[];
getErrorMessage() {
  if (this.userForm.get('adultno')!.hasError('required')) {
    return 'You must enter a value';
  }

  return  '';
}
purchase_insurance()
{
  console.log('-----------------------------------------------------------------------------------') 
  console.log(this.userForm)
  console.log('------------------------------------------------------------------------------------------------------------------')
  window.alert('Fill all details')
  console.log('Disease Status of Life Insurance :'+this.lifediseasestatus)
  const pincode=this.userForm.get('pincode')?.value
  console.log(this.userForm.value) 
  const customerInsurancePurchase=new CustomerInsurancePurchase(
    this.userForm.get('customerPolicyId')!.value!.toString(),
    this.userForm.get('insurancePolicyId')!.value!.toString(),
    this.email,
    +this.userForm.get('sumInsured')!.value!,
    this.userForm.get('startDate')!.value!.toString(),
    this.userForm.get('endDate')!.value!.toString(),
    +this.userForm.get('duration')!.value!,
    this.addonnamelist,
    this.premium,
    this.userForm.get('name')!.value!,
    +this.userForm.get('mobile')!.value!,
    this.userForm.get('address')!.value!.toString(),
    +this.userForm.get('pincode')!.value!,
    this.userForm.get('city')!.value!,
    this.userForm.get('state')!.value!.toString(),
    this.userForm.get('nameOfNominee')!.value!.toString(),
    this.userForm.get('nomineeDOB')!.value!.toString(),
    this.userForm.get('relation')!.value!.toString(),
    false,
    true,
    new HealthInsurance(0,0,[]),
    new LifeInsurance('','','','','',0,0,0,[],[],true,[]),
    new AutomobileInsurance('','','','','') 
    );
  if(this.isAuto)
  {                                                                                                            
    customerInsurancePurchase.automobileInsurance.vehicleRegistrationNumber= this.userForm.get('vehicleRegistrationNumber')!.value!.toString()
    customerInsurancePurchase.automobileInsurance.category                 = this.autocategory
    customerInsurancePurchase.automobileInsurance.engineNumber             = this.userForm.get('engineNumber')!.value!.toString()
    customerInsurancePurchase.automobileInsurance.chassisNumber            = this.userForm.get('chassisNumber')!.value!.toString()
    customerInsurancePurchase.automobileInsurance.model                    = this.userForm.get('model')!.value!.toString()
  }
 else if(this.isHealth)
  {
    this.insInfo=[]  
    const control = <FormArray>this.userForm.controls['insuredInfo'];
    customerInsurancePurchase.healthInsurance.adults= +this.userForm.get('adultno')!.value!
    customerInsurancePurchase.healthInsurance.kids   = +this.userForm.get('kidno')!.value!
   for(let i=0;i<(+this.adultValue + +this.kidValue);i++)
   {
    this.dob=control.at(i).get('insuredDOB')?.value.toString();
    this.rel=control.at(i).get('relation')?.value.toString();
    this.wei=+control.at(i).get('weight')?.value;
    this.hei=+control.at(i).get('height')?.value;
    this.nam=control.at(i).get('name')?.value.toString();
    if(control.at(i).get('preExistingIllness')?.value=='1')
    this.ill=true;
    else 
    this.ill=false;
     this.illList=control.at(i).get('illnessList')?.value;
     console.log('Health condition : '+this.ill)
     console.log('List of Diseases : '+this.illList)
     const x=new InsuredInfo(this.dob,this.rel,this.wei,this.hei,this.nam,this.ill,this.illList);
     this.insInfo.push(x)
   }   
   customerInsurancePurchase.healthInsurance.insuredInfo=this.insInfo;
  }
 else if(this.isLife)
 {
  this.life_answers=[]
  
  if(this.dis_status==='yes')
  this.lifediseasestatus=true
  else
  this.lifediseasestatus=false
 if( !this.lifediseasestatus)
 {
 this.userForm.get('lifeillnessList')?.reset()
 }
  const control = <FormArray>this.userForm.controls['questionnaireAnswers'];
  for(let i=0;i<control.length;i++){
    console.log("Value in boolean(Answers) : " +control.at(i).get('answer')!.value!);
    
    this.life_answers.push(control.at(i).get('answer')!.value!)
  }
  customerInsurancePurchase.lifeInsurance.maritalStatus  =this.userForm.get('maritalStatus')!.value!
  customerInsurancePurchase.lifeInsurance.occupation  =this.userForm.get('occupation')!.value!
  customerInsurancePurchase.lifeInsurance.organisationType  =this.userForm.get('organisationType')!.value!
  customerInsurancePurchase.lifeInsurance.Pan  =this.userForm.get('Pan')!.value!
  customerInsurancePurchase.lifeInsurance.aadhar  =this.userForm.get('aadhar')!.value!
  customerInsurancePurchase.lifeInsurance.annualIncome  =+this.userForm.get('annualIncome')!.value!
  customerInsurancePurchase.lifeInsurance.weight  =+this.userForm.get('weight')!.value!
  customerInsurancePurchase.lifeInsurance.height  =+this.userForm.get('height')!.value!
  
  customerInsurancePurchase.lifeInsurance.questionnaireAnswers  =this.life_answers
 customerInsurancePurchase.lifeInsurance.questionnaire  =this.questions
 customerInsurancePurchase.lifeInsurance.lifeIllnessStatus  =this.lifediseasestatus
 customerInsurancePurchase.lifeInsurance.healthConditionList  =this.userForm.get('lifeillnessList')!.value!
 }
 customerInsurancePurchase.email='testing@gmail.com'
 customerInsurancePurchase.insurancePolicyId='1232131'
 console.log(customerInsurancePurchase)

 this.httpclient.post<CustomerInsurancePurchase>('http://localhost:8084/api/add/customer-insurance',customerInsurancePurchase).subscribe(
  (data:any)=>{
    console.log(data);
  }
 );
//  const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     "Access-Control-Allow-Origin": "*",
    
//   } ),responseType: 'text' as 'json'
// };
//  this.httpclient.get('http://localhost:8084/api/get/insurances/testing@gmail.com',httpOptions).subscribe((data:any)=>{console.log(data+"sdasdad")})
}
check_validity(){

 
  if(this.userForm.get('sumInsured')?.valid&&this.userForm.get('duration')?.valid&&this.userForm.get('name')?.valid&&this.userForm.get('address')?.valid&&this.userForm.get('pincode')?.valid&&this.userForm.get('city')?.valid
  &&this.userForm.get('state')?.valid&&this.userForm.get('nameOfNominee')?.valid&&this.userForm.get('nomineeDOB')?.valid&&this.userForm.get('relation')?.valid&&this.userForm.get('mobile')?.valid)
  {     
    if(this.userForm.get('vehicleRegistrationNumber')?.valid&&this.userForm.get('engineNumber')?.valid&&this.userForm.get('chassisNumber')?.valid&&this.userForm.get('model')?.valid)
    return false
    if(this.userForm.get('insuredInfo')?.valid&&this.userForm.get('adultno')?.valid&&this.userForm.get('kidno')?.valid)
    return false
    if(this.userForm.get('maritalStatus')?.valid&&this.userForm.get('occupation')?.valid&&this.userForm.get('organisationType')?.valid&&this.userForm.get('Pan')?.valid&&this.userForm.get('aadhar')?.valid&&this.userForm.get('annualIncome')?.valid&&
    this.userForm.get('weight')?.valid&&this.userForm.get('height')?.valid&&this.userForm.get('questionnaireAnswers')?.valid&&this.userForm.get('lifeillnessStatus')?.valid)
    return false
    
  }
  return true
}
  userForm = new FormGroup({
    adultno             : new FormControl("", [Validators.required]),
    kidno               : new FormControl("", [Validators.required]),
    insuredInfo         : new FormArray([new FormGroup({
      nameof            : new FormControl("", [Validators.required]),
      insuredDOB        : new FormControl("", [Validators.required]),
      relation          : new FormControl("", [Validators.required]),
      preExistingIllness: new FormControl("", [Validators.required]),
      illnessList       : new FormControl([], [Validators.required]),
      weight            : new FormControl([], [Validators.required]),
      height            : new FormControl([], [Validators.required])})],[Validators.required]), 
    lifeillnessList           : new FormControl([], [Validators.required]),
    lifeillnessStatus         : new FormControl([], [Validators.required]), 
    vehicleRegistrationNumber : new FormControl("", [Validators.required]),
    category                  : new FormControl("", [Validators.required]), 
    engineNumber              : new FormControl("", [Validators.required]),
    chassisNumber             : new FormControl("", [Validators.required]), 
    maritalStatus             : new FormControl("", [Validators.required]),
    occupation                : new FormControl("", [Validators.required]), 
    organisationType          : new FormControl("", [Validators.required]),
    Pan                       : new FormControl("", [Validators.required]),  
    annualIncome              : new FormControl("", [Validators.required]),
    weight                    : new FormControl("", [Validators.required]), 
    height                    : new FormControl("", [Validators.required]),
    aadhar                    : new FormControl("", [Validators.required]),
    questionnaireAnswers      : new FormArray([new FormGroup({
      answer                  : new FormControl("", [Validators.required])})],[Validators.required]), 
    healthCondition           : new FormControl([], [Validators.required]), 
    customerPolicyId                : new FormControl("", [Validators.required]),
    insurancePolicyId               : new FormControl("", [Validators.required]),
    email                           : new FormControl("", [Validators.required]),
    sumInsured                      : new FormControl("", [Validators.required]),
    startDate                       : new FormControl("",[Validators.required]),
    purchaseDate                    : new FormControl("",[Validators.required]),
    endDate                         : new FormControl("", ),
    duration                        : new FormControl("", [Validators.required]),
    addOnName                       : new FormArray([new FormGroup({
      addname                       : new FormControl("", [Validators.required]),
    })]),
    date_list                       :new FormArray([new FormGroup({
      dob                           : new FormControl("", [Validators.required])})]),
    policyname                      : new FormControl("", [Validators.required]),
    premium                         : new FormControl("", [Validators.required]),
    name                            : new FormControl("",[Validators.required]),
    mobile                          : new FormControl("",[Validators.required]),
    address               : new FormControl("",[Validators.required]),
    pincode               : new FormControl("", [Validators.required]),
    city                  : new FormControl("", [Validators.required]),
    state                 : new FormControl("", [Validators.required]),
    nameOfNominee         : new FormControl("", [Validators.required]),
    nomineeDOB            : new FormControl("",[Validators.required]),
    relation              : new FormControl("",[Validators.required]),
    model                 : new FormControl("",[Validators.required]),
  });

relationlist:string[]=['Self','Brother','Father','Mother','Son','Daughter','Sister','GrandFather','GrandMother','Wife','Husband','Uncle','Aunt']
  minDate: Date;
  maxDate: Date;
  adultValue=0
  kidValue=0
  checkflag=false
   flags=true
   flag=true
   DescriptionText:string=''
   adultnum=[1,2,3,4,5,6,7]
   kidnum=[0,1,2,3,4,5,6,7]
   premium:number=0


   selectedDuration!:number
   suminsuredobj!:any[];
   selectedValue: number=0;
   sortedduration:number[]=[]
   sortedsuminsured:number[]=[]
   diseaselist=["HyperTension high blood pressure history","Diabetes mellitus sugar history","Hyperlipidemia cholesterol history","Consuming alcohol or smoking","Heart related ailments"]
   diseasestatus!:boolean[]
   insuranceobj=[
   {sumInsured:1000000,duration:1,premium:5000,kids:2,adults:2,minsal:200000,maxsal:121232423,minage:25,maxage:55},
   {sumInsured:1000000,duration:10,premium:4000},
   {sumInsured:500000,duration:7,premium:7520},
   {sumInsured:1000000,duration:5,premium:7000},
   {sumInsured:1000000,duration:3,premium:8000},
   {sumInsured:500000,duration:1,premium:6200},
   {sumInsured:500000,duration:2,premium:8500},
   {sumInsured:500000,duration:3,premium:6900},
   {sumInsured:500000,duration:4,premium:3500},
   {sumInsured:500000,duration:5,premium:4000},
   ];
   addons:any[]=[
    {addonname:"Nursing At Home + Compassionate Visit",addondescription:"We cover expenses related to home nursing and compassionate visit We cover your expenses for availing nursing at home post hospitalisation. The limit under this benefit is ₹3,000 per day for up to a maximum of 15 days. If your hospitalisation extends beyond 5 days, we will cover expenses incurred for an economy class air ticket for your spouse/children/parent to visit you (up to ₹20000).",addonprice:"882"},
    {addonname:"Critical Illness Cover",addondescription:"We pay out a lump sum benefit in case of a critical illness diagnosis.This benefit pays out 100% of the sum insured. The following critical illnesses are covered under this add-on",addonprice:"2500"},
    {addonname:"Personal Accident",addondescription:"We pay the sum insured in case of death or permanent total disablement If the insured person is injured and unfortunately loses his life or is permanently disabled, we pay out this benefit to the nominee or legal heir.",addonprice:"1080"},
    {addonname:"Worldwide Cover",addondescription:"We cover your hospitalisation expenses outside India as well You can claim for inpatient hospitalisation and day care procedures under this benefit. A co-pay of 10% will be applied to every admissible claim incurred outside India. The benefit is available for 45 consecutive days from the date of travel in a single trip and 90 days in a cumulative bases as a whole in a policy year.",addonprice:"2158"},
    {addonname:"Hospital Daily Cash + Convalescence Benefit",addondescription:"We provide a daily cash allowance if you are hospitalised for three consecutive days or more We pay you a daily cash allowance if you are hospitalised for 3+ days, up to a maximum of 10 days. Additionally, In case your hospital stay continues for 10 days or more, we will pay you ₹10,000 as convalescence benefit. This benefit is payable only once to an insured person during each policy year of the policy period.",addonprice:"1278"},
    {addonname:"Super No Claim Bonus",addondescription:"We increase in your sum insured by 50% at renewal, every claim-free year    This benefit applies if you renew the policy on time without any break-in period.",addonprice:"588"},
    {addonname:"Sum Insured Protector",addondescription:"We increase your sum insured every year, based on the previous year's inflation rate You can protect your sum insured against rising inflation. Your sum insured will be increased on cumulative basis at every renewal, based on the previous year's inflation rate. Inflation rate is based on the Consumer Price index (CPI) published by the Central Statistical Organisation (CSO).The % increase will be applicable only on Annual Sum Insured under the Policy and not on additional sum insured or any other benefit which leads to increase in Sum Insured.",addonprice:"220"},
    {addonname:"Claim Protector",addondescription:"We cover items not payable under the claim, as per IRDAI's excluded list .We cover the items related to your claim, which are not payable as per IRDAI's excluded list. These include hot packs, gauze, crepe bandages etc. Such non-payables will be covered up to sum insured if we have accepted your inpatient hospitalisation claim.",addonprice:"188"}
   ];
   bikelist:string[]=['Honda SP 125','Honda Shine','Honda H`ness CB350','TVS Apache RTR 160','TVS Ronin','TVS Apache RTR 200 4V','Hero Splendor Plus','Hero HF Deluxe','Hero Flareon','KTM 390 Duke','KTM 125 Duke'];
   carlist:string[]=['Hyundai Creta','Hyundai Venue','Hyundai i20','Toyota Fortuner','Toyota Innova Crysta','Toyota Urban Cruiser','Tata Tiago','Tata Harrier','Tata Safari','Maruti Brezza','Maruti Swift']

   panelOpenState = true;
   openSnackBar(message: string) {
    
    this.snackBar.open(message, 'Undo',{duration: 3000});
  }

  // ---------------------------------------NGONIT()-------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------
   ngOnInit(): void {
    
    const control1 = <FormArray>this.userForm.controls['date_list'];
    for (let index = 1; index < 16; index++) {
      control1.push(new FormGroup({
        dob     : new FormControl("", [Validators.required])
      }))
    }
   
      this.httpclient.get('http://localhost:8084/api/returnobj').subscribe((data:any)=>{
      console.log('Policy ID : '+data.policyId)
      console.log('Policy Name : '+data.policyName)
      if(data.insuranceType=='AutoMobile Insurance') 
        {
          console.log('Inside Automobile Insurance');
          
          this.insuranceobj=[]
          this.isAuto=true
         
         this.autocategory=data.category
          for(let index=0;index<data.policyDetails.length;index++)
          {
            this.insuranceobj.push({'sumInsured':data.policyDetails[index].sumInsure,'duration':data.policyDetails[index].durations,'premium':data.policyDetails[index].premiums})
          }
          for (let index = 0; index < data.policyDetails.length; index++) {
            this.flags=true; 
            for(let x=0;x<this.sortedsuminsured.length;x++)
              {
                 if(this.sortedsuminsured[x] ==data.policyDetails[index].sumInsure)
                 {
                   this.flags=false;
                   break;
                 }
              }
         if(this.flags)
         this.sortedsuminsured.push(data.policyDetails[index].sumInsure)
            }
        }
        else if(data.insuranceType=='HealthInsurance')
           {
            this.insuranceobj=[]
            this.isHealth=true
            for(let index=0;index<data.policyDetails.length;index++)
          {
            this.insuranceobj.push({'sumInsured':data.policyDetails[index].sumInsure,'duration':data.policyDetails[index].durations,'premium':0,'kids':data.policyDetails[index].kids,'adults':data.policyDetails[index].adults,'minage':data.policyDetails[index].minAge,'maxage':data.policyDetails[index].maxAge})
          }
           }
           else if(data.insuranceType=='LifeInsurance')
           {
            this.insuranceobj=[]
            this.isLife=true
            for(let index=0;index<data.policyDetails.length;index++)
          {
            this.insuranceobj.push({'sumInsured':data.policyDetails[index].sumInsure,'duration':data.policyDetails[index].durations,'premium':data.policyDetails[index].premiums,'minsal':data.policyDetails[index].minSalary,'maxsal':data.policyDetails[index].maxSalary})
          }
           }
      if(data.insuranceType=='AutoMobile Insurance')
        this.autocategory=data.category
      this.userForm.get('policyname')?.setValue(data.policyName)
      this.userForm.get('policyname')!.disable();
      this.DescriptionText=data.policyDescription;
      this.policyName=data.policyName
      this.addons=[]
      for (let index = 0; index <data.addOnDetails.length; index++) {
        // console.log('premium '+index+'  : '+data.policyDetails[index].premiums)
        console.log(data.addOnDetails[index].addOnName+"  : "+data.addOnDetails[index].addOnDescription+' : '+data.addOnDetails[index].addOnPremiums);
        
         this.addons.push({'addonname':data.addOnDetails[index].addOnName,'addondescription':data.addOnDetails[index].addOnDescription,'addonprice':data.addOnDetails[index].addOnPremiums},)
      }
  
     

  //  this.update_disease_status()
  
    })
       
    //====================================================================================================================
       this.id=Math.floor(Math.random()*100000000+10000000);
    
       this.userForm.get('customerPolicyId')?.setValue(this.id.toString())
       this.userForm.get('customerPolicyId')!.disable();
       const control = <FormArray>this.userForm.controls['questionnaireAnswers'];
      
      for (let index = 1; index < this.questions.length; index++) {
      control.push(new FormGroup({
        answer     : new FormControl("", [Validators.required])
      })); 
      }
    
  }
  constructor(public httpclient:HttpClient,private snackBar: MatSnackBar) {
      const currentYear = new Date().getFullYear();
      const currentMonth=new Date().getMonth();
      const currentDay=new Date().getDate();
      this.minDate = new Date(currentYear - 25, currentMonth, currentDay);
      this.maxDate = new Date(currentYear + 55, currentMonth,currentDay);
    }

    close_dob_div()
    {
      const control = <FormArray>this.userForm.controls['insuredInfo'];
      for (let index = 0;index < this.adultValue; index++) {
       if(control.controls[index].get('insuredDOB')!.value) 
        console.log(control.controls[index].get('insuredDOB')!.value)
      }
      this.checkflag=false
    }
    function_for_dob_list(i:any){
      this.xy=this.xy+ +i
      this.userForm.get('sumInsured')?.reset();
      this.userForm.get('duration')?.reset();
      const control = <FormArray>this.userForm.controls['insuredInfo'];
      console.log('current length of insuredInfo : '+control.length)
      console.log('Value entered : '+this.adultValue);     
      this.update_disease_status()
      this.checkflag=true
      // control.clear(); 
      // +this.adultValue + +this.kidValue
      console.log("After deleting length of user controls array :"+control.length)
      console.log(control)
      for (let index = 0; index < (+this.adultValue + +this.kidValue); index++) {
        control.push(new FormGroup({
          nameof            : new FormControl("", [Validators.required]),
          insuredDOB        : new FormControl("", [Validators.required]),
          relation          : new FormControl("", [Validators.required]),
          preExistingIllness: new FormControl("1", [Validators.required]),
          illnessList       : new FormControl([], [Validators.required]),
          weight            : new FormControl([], [Validators.required]),
          height            : new FormControl([], [Validators.required])
        }));       
      }
   
      console.log("Final length after modifying :"+control.length)
      console.log(control)
    }
    adding_child(){ 
      const control = <FormArray>this.userForm.controls['insuredInfo'];
      if(this.adultValue>0)
      this.function_for_dob_list(2)
      
      for (let index = this.adultValue; index < +this.adultValue + +this.kidValue; index++) {
        control.push(new FormGroup({
          nameof            : new FormControl("", [Validators.required]),
          insuredDOB        : new FormControl("", [Validators.required]),
          relation          : new FormControl("", [Validators.required]),
          preExistingIllness: new FormControl("1", [Validators.required]),
          illnessList       : new FormControl([], [Validators.required]),
          weight            : new FormControl([], [Validators.required]),
          height            : new FormControl([], [Validators.required])
        }));       
      }
      console.log(control)
    }
   selectsuminsured(eve:any)
   {
    // this.update_disease_status()
    // console.log(this.adultValue)
    if(this.isAuto){
      this.sortedduration=[]
      for (let index = 0; index < this.insuranceobj.length; index++) {
        this.flags=true; 
        for(let x=0;x<this.sortedduration.length;x++)
          {
             if(this.sortedduration[x] == this.insuranceobj[index].duration)
             {
               this.flags=false;
               break;
             }
          }
          if(this.flags)
        this.sortedduration.push(this.insuranceobj[index].duration)
         }
       this.sortedduration.sort((a, b) => a - b) 
      console.log(this.sortedduration);
    }
    this.sortedduration=[]
    for (let index = 0; index < this.insuranceobj.length; index++) {
      
      if(this.insuranceobj[index].sumInsured==this.selectedValue)
      this.sortedduration.push(this.insuranceobj[index].duration)
    }
    this.sortedduration.sort((a, b) => a - b)  
   }
    calculate_premium(){
      this.times
      if(this.isHealth&&this.userForm.get('sumInsured')?.valid&&this.userForm.get('duration')?.valid)
      {
        this.times=Math.floor(+this.userForm.get('sumInsured')!.value!/this.premium)
      }
    return false
    }
      on_duration_select(data:any)
      {
        if(this.isAuto)
        {
          const control1=this.userForm.get('model')
          const control2=this.userForm.get('sumInsured')
          const control3=this.userForm.get('duration')
          if(!control1?.valid && !control2?.valid)
            {
              this.openSnackBar("Select Vehicle Model and Sum Insured before duration")
                control3?.reset()
                return
            }
            if(!control2?.valid)
            {
              this.openSnackBar("Please Select Sum Insured First")
              control3?.reset()
              return
            }
            this.sortedsuminsured=[]
            const select_duration=+control3?.value!
            for(let index=0;index<this.insuranceobj.length;index++)
            { 
              this.flags=true
              for(let vx=0;vx<this.sortedsuminsured.length;vx++)
              {
               if( this.sortedsuminsured[vx]==this.insuranceobj[index].sumInsured)
               {
                 this.flags=false
                 break
               }
              }
              if(this.flags&&this.insuranceobj[index].duration==select_duration)
              this.sortedsuminsured.push(this.insuranceobj[index].sumInsured)
            }  

           for(let i=0;i<this.insuranceobj.length;i++)
           {
            if(this.insuranceobj[i].duration==+control3?.value!&&this.insuranceobj[i].sumInsured==+control2?.value!)
            {
              this.premium=this.addonpremium+this.insuranceobj[i].premium
              return
            }
           }
          return 
        }
        if(this.isLife)
        {
          const control1=this.userForm.get('annualIncome')
          const control2=this.userForm.get('sumInsured')
          const control3=this.userForm.get('duration')
          const user_salary=+control1?.value!
          const selected_duration=+control3?.value!
          const sum_insured=+control2?.value!
          if(!control1?.valid && !control2?.valid)
            {
              this.openSnackBar("Enter Annual Income and select Sum Insured before duration")
                control3?.reset()
                return
            }
            if(!control2?.valid)
            {
              this.openSnackBar("Please Select Sum Insured First")
              control3?.reset()
              return
            }
            this.sortedsuminsured=[]
            const select_duration=+control3?.value!
            for(let index=0;index<this.insuranceobj.length;index++)
            { 
              this.flags=true
              for(let vx=0;vx<this.sortedsuminsured.length;vx++)
              {
               if( this.sortedsuminsured[vx]==this.insuranceobj[index].sumInsured)
               {
                 this.flags=false
                 break
               }
              }
              if(this.flags&&this.insuranceobj[index].duration==select_duration&&user_salary>this.insuranceobj[index].minsal!&&user_salary<this.insuranceobj[index].maxsal!)
              this.sortedsuminsured.push(this.insuranceobj[index].sumInsured)
            }  
              this.insuranceobj.sort((a,b)=>b.premium-a.premium)
           for(let i=0;i<this.insuranceobj.length;i++)
           {
            console.log('Value of result'+ (this.insuranceobj[i].duration==selected_duration&&this.insuranceobj[i].sumInsured==sum_insured&&user_salary>this.insuranceobj[i].minsal!&&user_salary<this.insuranceobj[i].maxsal!));
            
            if(this.insuranceobj[i].duration==selected_duration&&this.insuranceobj[i].sumInsured==sum_insured&&user_salary>this.insuranceobj[i].minsal!&&user_salary<this.insuranceobj[i].maxsal!)
            {
              this.premium=this.addonpremium+this.insuranceobj[i].premium
              return
            }
           }
          return 
        }
        for (let index = 0; index < this.insuranceobj.length; index++) {
          console.log(this.insuranceobj[index]);
          
          if(this.insuranceobj[index].sumInsured==this.selectedValue&&this.insuranceobj[index].duration==this.selectedDuration)
             {
              this.premium=this.addonpremium+this.insuranceobj[index].premium
             }
        }
        this.date=new Date()
        this.userForm.get('startDate')?.setValue(this.date.toLocaleDateString('en-GB').toString())
        this.date.setFullYear(this.date.getFullYear() + +this.selectedDuration);
        this.userForm.get('endDate')?.setValue(this.date.toLocaleDateString('en-GB').toString())
        console.log('start Date : '+this.userForm.get('startDate')!.value)
        console.log('End Date : '+this.userForm.get('endDate')!.value);
        
      }
      on_suminsured_select(data:any)
      {
        if(this.isAuto)
        {   
                  const control1=this.userForm.get('sumInsured') 
                  const control2=this.userForm.get('duration')
                      if(!this.userForm.get('model')?.valid)
                      {
                         this.openSnackBar("Please select Vehicle model first")
                         this.userForm.get('sumInsured')?.reset();
                         return
                      }
                      console.log("In SelectedPrem");
                      if(control2?.valid)
                      {
                        const insured_sum=+control1?.value!
                        const insured_duration=+control2.value!
                        //this.premium=this.addonpremium
                        for(let index=0;index<this.insuranceobj.length;index++)
                          {
                            if(insured_sum==this.insuranceobj[index].sumInsured&&insured_duration==this.insuranceobj[index].duration)
                             {
                              this.premium=this.addonpremium+this.insuranceobj[index].premium
                             }
                          }
                      }
                     this.sortedduration=[]
                     const select_sumInsured=+this.userForm.get('sumInsured')?.value!
                     console.log("sum Selected"+select_sumInsured);
                     console.log(this.insuranceobj);
                     
                     for(let index=0;index<this.insuranceobj.length;index++)
                     { 
                       this.flags=true
                       for(let vx=0;vx<this.sortedduration.length;vx++)
                       {
                        if( this.sortedduration[vx]==this.insuranceobj[index].duration)
                        {
                          this.flags=false
                          break
                        }
                       }
                       if(this.flags&&this.insuranceobj[index].sumInsured==select_sumInsured)
                       this.sortedduration.push(this.insuranceobj[index].duration)
                     }  

                     return           
        }
        if(this.isLife)
        {   
                  const control1=this.userForm.get('sumInsured') 
                  const control2=this.userForm.get('duration')
                  const control3=this.userForm.get('annualIncome')
                  const user_salary=+control3?.value!
                      if(!this.userForm.get('annualIncome')?.valid)
                      {
                         this.openSnackBar("Please select Annual Income first")
                         this.userForm.get('sumInsured')?.reset();
                         return
                      }
                      console.log("In Select Premium function");
                      if(control2?.valid)
                      {
                        const insured_sum=+control1?.value!
                        const insured_duration=+control2.value!
                        
                        this.insuranceobj.sort((a, b) => -a.premium + b.premium)
                        for(let index=0;index<this.insuranceobj.length;index++)
                          {
                            if(insured_sum==this.insuranceobj[index].sumInsured&&insured_duration==this.insuranceobj[index].duration&&user_salary>this.insuranceobj[index].minsal!&&user_salary<this.insuranceobj[index].maxsal!)
                             {
                              this.premium=this.addonpremium+this.insuranceobj[index].premium
                             }
                          }
                      }
                     this.sortedduration=[]
                     const select_sumInsured=+this.userForm.get('sumInsured')?.value!
                     console.log("sum Selected :"+select_sumInsured);
                     console.log("User salary :"+user_salary);
                     console.log(this.insuranceobj);
                     
                     for(let index=0;index<this.insuranceobj.length;index++)
                     { 
                       this.flags=true
                       for(let vx=0;vx<this.sortedduration.length;vx++)
                       {
                        if( this.sortedduration[vx]==this.insuranceobj[index].duration)
                        {
                          this.flags=false
                          break
                        }
                       }
                       console.log(user_salary+'  '+this.insuranceobj[index].minsal+'  '+this.insuranceobj[index].maxsal)
                       console.log(user_salary>this.insuranceobj[index].minsal!&&user_salary<this.insuranceobj[index].maxsal!)
                       if(this.flags&&this.insuranceobj[index].sumInsured==select_sumInsured&&user_salary>this.insuranceobj[index].minsal!&&user_salary<this.insuranceobj[index].maxsal!)
                       this.sortedduration.push(this.insuranceobj[index].duration)
                     }  
                     this.sortedduration.sort((a,b)=>a-b)
                     return           
        }
        this.selectsuminsured(1)
        if(this.selectedDuration<=0)
        return
        for (let index = 0; index < this.insuranceobj.length; index++) {
          console.log(this.insuranceobj[index]);
          
          if(this.insuranceobj[index].sumInsured==this.selectedValue&&this.insuranceobj[index].duration==this.selectedDuration)
             {
              this.premium=this.addonpremium+this.insuranceobj[index].premium
             }
        }
      }

      set_suminsured_life_insurance(salary:any)
      {
                        console.log('Inside method set_suminsured_life_insurance');
                        console.log(this.insuranceobj);
                   const user_salary=+salary
                   this.sortedsuminsured=[]
                   const control1=this.userForm.get('sumInsured')
                   const control2=this.userForm.get('duration')
                   if(control1?.valid||control2?.valid)
                     {                    
                    control1?.reset()
                    control2?.reset()                 
                   }
                   for(let index=0;index<this.insuranceobj.length;index++)
                   { 
                     this.flags=true
                     for(let vx=0;vx<this.sortedsuminsured.length;vx++)
                     {
                      if( this.sortedsuminsured[vx]==this.insuranceobj[index].sumInsured)
                      {
                        this.flags=false
                        break
                      }
                     }
                     console.log('MAX - '+this.insuranceobj[index].maxsal+' MIN - '+this.insuranceobj[index].minsal+' User sal - '+user_salary)
                     console.log(this.insuranceobj[index].minsal!<user_salary&&this.insuranceobj[index].maxsal!>user_salary);
                     if(this.flags&&this.insuranceobj[index].minsal!<user_salary&&this.insuranceobj[index].maxsal!>user_salary)
                     this.sortedsuminsured.push(this.insuranceobj[index].sumInsured)
                   }
                   this.sortedsuminsured.sort((a,b)=>a-b)
                   console.log(this.sortedsuminsured)
      }
   checked_addOn(an:any,i:any,price:any,name:string){
    const control = <FormArray>this.userForm.controls['insuredInfo'];
    console.log("Value of "+i);
    if(an.checked==true){
      if(this.addonnamelist.findIndex(x => x === name)>-1)
      {
        console.log(this.addonnamelist)
        return
      }
    this.premium=this.premium+ +price;
    this.addonpremium=this.addonpremium+ +price
    this.addonnamelist.push(name)
    console.log(this.addonnamelist)
              }
    else{
    this.premium=this.premium- +price;
    this.addonpremium=this.addonpremium- +price
    this.addonnamelist=this.addonnamelist.filter(add_on_name=>add_on_name!=name)
    console.log(this.addonnamelist)
         } 
    console.log(an.checked);
      }
update_disease_status()
{
  this.diseasestatus=[]
  for (let index = 0; index < (+this.adultValue + +this.kidValue); index++) {
    this.diseasestatus[index]=false    
  }
  
}
display_disease(x:any){
 console.log(this.diseasestatus[x]);
 if(this.diseasestatus[x]==true)
 return true
 else
 return false
}
check_illness(i:any)
{
  const control=<FormArray>this.userForm.controls['insuredInfo'];
  console.log('Illness status of User  : '+i+' : '+control.at(i).get('preExistingIllness')!.value)
 if( control.at(i).get('preExistingIllness')!.value==='1')
  return true
  return false
}
function_to_return_status()
{
  console.log(this.dis_status)
  if(this.dis_status==='yes')
  return true
  else{

  return false
  }
}     


}
