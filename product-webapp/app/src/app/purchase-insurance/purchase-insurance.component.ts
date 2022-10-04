
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutomobileInsurance } from '../AutomobileInsurance';
import { CustomerInsurancePurchase } from '../CustomerInsurancePurchase';
import { HealthInsurance } from '../HealthInsurance';
import { Insurance } from '../insurance';
import { InsuredInfo } from '../InsuredInfo';
import { LifeInsurance } from '../LifeInsurance';
import { PolicyDetails } from '../policy-details';
import { formatDate } from '@angular/common';
import { PaymentService } from '../payment.service';
import { RecommendationServiceService } from '../Services/recommendation-service.service';
export interface LifeTable {
  minSal: number;
  maxSal: number;
  duration: number;
  suminsured: number;
}
let LIFE_INSURANCE_DATA: LifeTable[] = [
  { minSal: 1, maxSal: 2, duration: 1, suminsured: 10000 }
];




declare var Razorpay: any;






@Component({
  selector: 'app-purchase-insurance',
  templateUrl: './purchase-insurance.component.html',
  styleUrls: ['./purchase-insurance.component.css']
})
export class PurchaseInsuranceComponent implements OnInit {
  purchaseForm: any = {};

  paymentId: string | undefined;
  error: string | undefined;
  razorpay_payment_id: string | undefined;
  razorpay_order_id: string | undefined;
  razorpay_signature: string | undefined;
  // amount:string='2000';
  paymentStatus: boolean = false;
  options = {
    "key": "",
    "amount": "",
    "currency": "",
    "name": "Insurify",
    "description": "One-Stop Insurance Solutions",
    "image": "",
    "order_id": "",
    "handler": function (response: any) {
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    }
    ,
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": ""
    },
    "theme": {
      "color": "#3399cc"
    }
  };


  // --------------------------------------------------------------------------------------------------------------------------


  displayedColumns: string[] = ['minSal', 'maxSal', 'duration', 'suminsured'];
  dataSource = LIFE_INSURANCE_DATA;
  displaytableflag: boolean = false
  id!: number
  email: string = ''
  isAuto = false
  isHealth = false
  isLife = false
  isCar = false
  isBike = false
  dob_list: Date[] = []
  policyName!: string
  policyDetails!: PolicyDetails
  addonnamelist: string[] = []
  times = 0
  premiumarray: number[] = []
  date = new Date();
  autocategory: string = ''
  addonpremium = 0
  xy: number = 0
  y: number = 0

  dis_status: string = ''
  lifediseasestatus: boolean = false
  doblist: string[] = []
  insInfo: InsuredInfo[] = []
  questions: string[] = [
    "Have you consumed Alcohol in the last one year?",
    "Have you ever consumed narcotics?",
    "Are you employed in the armed, para military or police forces?",
    "Is your occupation associated with any specific hazard or do you take part in activities or have hobbies that could be dangerous in any way?",
    "Have you undergone any tests/investigations/surgery or have been hospitalized for observation or treatment in the past?",
  ];
  life_answers: boolean[] = []
  dob!: string
  rel!: string
  wei!: number
  hei!: number
  nam!: string
  ill!: boolean
  illList!: string[];
  userForm = new FormGroup({
    adultno: new FormControl("", [Validators.required]),
    kidno: new FormControl("", [Validators.required]),
    insuredInfo: new FormArray([new FormGroup({
      nameof: new FormControl("", [Validators.required]),
      insuredDOB: new FormControl("", [Validators.required]),
      relation: new FormControl("", [Validators.required]),
      preExistingIllness: new FormControl("No", [Validators.required]),
      illnessList: new FormControl([], [Validators.required]),
      weight: new FormControl([], [Validators.required]),
      height: new FormControl([], [Validators.required])
    })], [Validators.required]),
    lifeillnessList: new FormControl([], [Validators.required]),
    lifeillnessStatus: new FormControl([], [Validators.required]),
    vehicleRegistrationNumber: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required]),
    engineNumber: new FormControl("", [Validators.required]),
    chassisNumber: new FormControl("", [Validators.required]),
    maritalStatus: new FormControl("", [Validators.required]),
    occupation: new FormControl("", [Validators.required]),
    organisationType: new FormControl("", [Validators.required]),
    Pan: new FormControl("", [Validators.required]),
    annualIncome: new FormControl("", [Validators.required]),
    weight: new FormControl("", [Validators.required]),
    height: new FormControl("", [Validators.required]),
    aadhar: new FormControl("", [Validators.required]),
    questionnaireAnswers: new FormArray([new FormGroup({
      answer: new FormControl("", [Validators.required])
    })], [Validators.required]),
    healthCondition: new FormControl([], [Validators.required]),
    customerPolicyId: new FormControl("", [Validators.required]),
    insurancePolicyId: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    sumInsured: new FormControl("", [Validators.required]),
    startDate: new FormControl("", [Validators.required]),
    purchaseDate: new FormControl("", [Validators.required]),
    endDate: new FormControl("",),
    duration: new FormControl("", [Validators.required]),
    addOnName: new FormArray([new FormGroup({
      addname: new FormControl("", [Validators.required]),
    })]),
    date_list: new FormArray([new FormGroup({
      dob: new FormControl("", [Validators.required, Validators.min(21), Validators.max(60)])
    })]),
    policyname: new FormControl("", [Validators.required]),
    premium: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    mobile: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    pincode: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    nameOfNominee: new FormControl("", [Validators.required]),
    nomineeDOB: new FormControl("", [Validators.required]),
    relation: new FormControl("", [Validators.required]),
    model: new FormControl("", [Validators.required]),
  });

  relationlist: string[] = ['Self', 'Brother', 'Father', 'Mother', 'Son', 'Daughter', 'Sister', 'GrandFather', 'GrandMother', 'Wife', 'Husband', 'Uncle', 'Aunt']

  adultValue = 0
  kidValue = 0
  checkflag = false
  flags = true
  flag = true
  DescriptionText: string = ''
  adultnum = [1, 2, 3, 4, 5, 6, 7]
  kidnum = [0, 1, 2, 3, 4, 5, 6, 7]
  premium: number = 0

  show_premiums_flag: boolean = false
  selectedDuration!: number
  suminsuredobj!: any[];
  selectedValue: number = 0;
  sortedduration: number[] = []
  sortedsuminsured: number[] = []
  diseaselist = ["HyperTension high blood pressure history", "Diabetes mellitus sugar history", "Hyperlipidemia cholesterol history", "Consuming alcohol or smoking", "Heart related ailments"]
  diseasestatus!: boolean[]
  insuranceobj = [
    { sumInsured: 1000000, duration: 1, premium: 5000, kids: 2, adults1: 2, adults2: 2, adults3: 2, minsal: 200000, maxsal: 121232423, minage: 25, maxage: 55 },
    { sumInsured: 1000000, duration: 1, kids: 2, adults1: 2, adults2: 2, adults3: 2 },
    { sumInsured: 1000000, duration: 10, premium: 4000 },
    { sumInsured: 500000, duration: 7, premium: 7520 },
    { sumInsured: 1000000, duration: 5, premium: 7000 },
    { sumInsured: 1000000, duration: 3, premium: 8000 },
    { sumInsured: 500000, duration: 1, premium: 6200 },
    { sumInsured: 500000, duration: 2, premium: 8500 },
    { sumInsured: 500000, duration: 3, premium: 6900 },
    { sumInsured: 500000, duration: 4, premium: 3500 },
    { sumInsured: 500000, duration: 5, premium: 4000 },
  ];
  addons: any[] = [
    { addonname: "Nursing At Home + Compassionate Visit", addondescription: "We cover expenses related to home nursing and compassionate visit We cover your expenses for availing nursing at home post hospitalisation. The limit under this benefit is ₹3,000 per day for up to a maximum of 15 days. If your hospitalisation extends beyond 5 days, we will cover expenses incurred for an economy class air ticket for your spouse/children/parent to visit you (up to ₹20000).", addonprice: "882" },
    { addonname: "Critical Illness Cover", addondescription: "We pay out a lump sum benefit in case of a critical illness diagnosis.This benefit pays out 100% of the sum insured. The following critical illnesses are covered under this add-on", addonprice: "2500" },
    { addonname: "Personal Accident", addondescription: "We pay the sum insured in case of death or permanent total disablement If the insured person is injured and unfortunately loses his life or is permanently disabled, we pay out this benefit to the nominee or legal heir.", addonprice: "1080" },
    { addonname: "Worldwide Cover", addondescription: "We cover your hospitalisation expenses outside India as well You can claim for inpatient hospitalisation and day care procedures under this benefit. A co-pay of 10% will be applied to every admissible claim incurred outside India. The benefit is available for 45 consecutive days from the date of travel in a single trip and 90 days in a cumulative bases as a whole in a policy year.", addonprice: "2158" },
    { addonname: "Hospital Daily Cash + Convalescence Benefit", addondescription: "We provide a daily cash allowance if you are hospitalised for three consecutive days or more We pay you a daily cash allowance if you are hospitalised for 3+ days, up to a maximum of 10 days. Additionally, In case your hospital stay continues for 10 days or more, we will pay you ₹10,000 as convalescence benefit. This benefit is payable only once to an insured person during each policy year of the policy period.", addonprice: "1278" },
    { addonname: "Super No Claim Bonus", addondescription: "We increase in your sum insured by 50% at renewal, every claim-free year    This benefit applies if you renew the policy on time without any break-in period.", addonprice: "588" },
    { addonname: "Sum Insured Protector", addondescription: "We increase your sum insured every year, based on the previous year's inflation rate You can protect your sum insured against rising inflation. Your sum insured will be increased on cumulative basis at every renewal, based on the previous year's inflation rate. Inflation rate is based on the Consumer Price index (CPI) published by the Central Statistical Organisation (CSO).The % increase will be applicable only on Annual Sum Insured under the Policy and not on additional sum insured or any other benefit which leads to increase in Sum Insured.", addonprice: "220" },
    { addonname: "Claim Protector", addondescription: "We cover items not payable under the claim, as per IRDAI's excluded list .We cover the items related to your claim, which are not payable as per IRDAI's excluded list. These include hot packs, gauze, crepe bandages etc. Such non-payables will be covered up to sum insured if we have accepted your inpatient hospitalisation claim.", addonprice: "188" }
  ];
  bikelist: string[] = ['Honda SP 125', 'Honda Shine', 'Honda H`ness CB350', 'TVS Apache RTR 160', 'TVS Ronin', 'TVS Apache RTR 200 4V', 'Hero Splendor Plus', 'Hero HF Deluxe', 'Hero Flareon', 'KTM 390 Duke', 'KTM 125 Duke'];
  carlist: string[] = ['Hyundai Creta', 'Hyundai Venue', 'Hyundai i20', 'Toyota Fortuner', 'Toyota Innova Crysta', 'Toyota Urban Cruiser', 'Tata Tiago', 'Tata Harrier', 'Tata Safari', 'Maruti Brezza', 'Maruti Swift']
  selectedPremium = 0
  panelOpenState = true;
  getErrorMessage() {
    if (this.userForm.get('adultno')!.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }
  purchase_insurance() {

    // ---------------------------------------------------------------------------------------------------------------------------------------------------
    console.log("-------------------------------------RAZORPAY PAYMENT CODE----------------------------------------------------------------");

    console.log("hello from buy method.");

    this.paymentId = '';
    this.error = '';
    let amt = this.premium * 100;

    this.order.createOrder({
      amount: this.premium.toString(),
      customerPolicyId: this.id.toString(),
      //  emailId:localStorage.getItem('email'),
      emailId: this.userForm.get('email')!.value!,
      name: this.userForm.get('name')!.value!,
      //  paymentDate:this.userForm.get('startDate')!.value!,
      mobileNo: ("+91" + (this.userForm.get('mobile')!.value!).toString()),
    }).subscribe(
      data => {
        console.log(data);
        console.log(this.options);

        //  this.paymentStatus=true;

        this.options.key = data.secretId;
        // this.options.key = "uQmSyGAgNqCHHT7AWCN94pOZ";
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.amount //paise
        this.options.currency = "INR";
        this.options.prefill.name = data.name;
        this.options.prefill.email = data.emailId;
        this.options.prefill.contact = data.mobileNo;

        // if(data.pgName ==='razor2') {
        // this.options.image=data.image;
        var rzp = new Razorpay(this.options);
        rzp.open();

        // } else {
        //   var rzp2 = new Razorpay(this.options);
        //   rzp2.open();
        // }


        rzp.on('payment.failed', function (response: { error: { code: any; description: any; source: any; step: any; reason: any; metadata: { order_id: any; payment_id: any; }; }; }) {
          // Todo - store this information in the server


          console.log(response);
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
          // this.error = response.error.reason;
        }
        );
      }
      ,
      (err: { error: { message: string | undefined; }; }) => {
        this.error = err.error.message;
      }
    );

    console.log("-----------------------------------------------------------------------------------------------------------------------------------");


  }


  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: { detail: any; }): void {
    console.log(event.detail);
    this.proceedPayment();
    this.razorpay_payment_id = event.detail.razorpay_payment_id;
    this.razorpay_order_id = event.detail.razorpay_order_id;
    this.razorpay_signature = event.detail.razorpay_signature;



  }

  proceedPayment() {
    console.log('-----------------------------------------------------------------------------------')
    console.log(this.userForm)
    console.log('------------------------------------------------------------------------------------------------------------------')
    console.log('Disease Status of Life Insurance :' + this.lifediseasestatus)
    const pincode = this.userForm.get('pincode')?.value
    console.log(this.userForm.value)
    const customerInsurancePurchase = new CustomerInsurancePurchase(
      this.userForm.get('customerPolicyId')!.value!.toString(),
      this.userForm.get('insurancePolicyId')!.value!.toString(),
      this.email,
      +this.userForm.get('sumInsured')!.value!,
      this.userForm.get('startDate')!.value!,
      this.userForm.get('endDate')!.value!,
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
      new HealthInsurance(0, 0, []),
      new LifeInsurance('', '', '', '', '', 0, 0, 0, [], [], true, []),
      new AutomobileInsurance('', '', '', '', '')
    );
    if (this.isAuto) {
      customerInsurancePurchase.automobileInsurance.vehicleRegistrationNumber = this.userForm.get('vehicleRegistrationNumber')!.value!.toString()
      customerInsurancePurchase.automobileInsurance.category = this.autocategory
      customerInsurancePurchase.automobileInsurance.engineNumber = this.userForm.get('engineNumber')!.value!.toString()
      customerInsurancePurchase.automobileInsurance.chassisNumber = this.userForm.get('chassisNumber')!.value!.toString()
      customerInsurancePurchase.automobileInsurance.model = this.userForm.get('model')!.value!.toString()
    }
    else if (this.isHealth) {
      this.insInfo = []
      const control = <FormArray>this.userForm.controls['insuredInfo'];
      customerInsurancePurchase.healthInsurance.adults = +this.userForm.get('adultno')!.value!
      customerInsurancePurchase.healthInsurance.kids = +this.userForm.get('kidno')!.value!
      for (let i = 0; i < (+this.adultValue + +this.kidValue); i++) {
        this.dob = control.at(i).get('insuredDOB')?.value.toString();
        this.rel = control.at(i).get('relation')?.value.toString();
        this.wei = +control.at(i).get('weight')?.value;
        this.hei = +control.at(i).get('height')?.value;
        this.nam = control.at(i).get('name')?.value.toString();
        if (control.at(i).get('preExistingIllness')?.value == 'Yes')
          this.ill = true;
        else
          this.ill = false;
        this.illList = control.at(i).get('illnessList')?.value;
        console.log('Health condition : ' + this.ill)
        console.log('List of Diseases : ' + this.illList)
        const x = new InsuredInfo(this.dob, this.rel, this.wei, this.hei, this.nam, this.ill, this.illList);
        this.insInfo.push(x)
      }
      customerInsurancePurchase.healthInsurance.insuredInfo = this.insInfo;
    }
    else if (this.isLife) {
      this.life_answers = []

      if (this.dis_status === 'yes')
        this.lifediseasestatus = true
      else
        this.lifediseasestatus = false
      if (!this.lifediseasestatus) {
        this.userForm.get('lifeillnessList')?.reset()
      }
      const control = <FormArray>this.userForm.controls['questionnaireAnswers'];
      for (let i = 0; i < control.length; i++) {
        console.log("Value in boolean(Answers) : " + control.at(i).get('answer')!.value!);

        this.life_answers.push(control.at(i).get('answer')!.value!)
      }
      customerInsurancePurchase.lifeInsurance.maritalStatus = this.userForm.get('maritalStatus')!.value!
      customerInsurancePurchase.lifeInsurance.occupation = this.userForm.get('occupation')!.value!
      customerInsurancePurchase.lifeInsurance.organisationType = this.userForm.get('organisationType')!.value!
      customerInsurancePurchase.lifeInsurance.Pan = this.userForm.get('Pan')!.value!
      customerInsurancePurchase.lifeInsurance.aadhar = this.userForm.get('aadhar')!.value!
      customerInsurancePurchase.lifeInsurance.annualIncome = +this.userForm.get('annualIncome')!.value!
      customerInsurancePurchase.lifeInsurance.weight = +this.userForm.get('weight')!.value!
      customerInsurancePurchase.lifeInsurance.height = +this.userForm.get('height')!.value!

      customerInsurancePurchase.lifeInsurance.questionnaireAnswers = this.life_answers
      customerInsurancePurchase.lifeInsurance.questionnaire = this.questions
      customerInsurancePurchase.lifeInsurance.lifeIllnessStatus = this.lifediseasestatus
      customerInsurancePurchase.lifeInsurance.healthConditionList = this.userForm.get('lifeillnessList')!.value!
    }
    customerInsurancePurchase.email = localStorage.getItem("email")!
    customerInsurancePurchase.insurancePolicyId = `${this.service.policyNo}`
    console.log(customerInsurancePurchase)
    console.log('This is before posting');

    this.httpclient.post<CustomerInsurancePurchase>('http://localhost:8080/purchase/api/add/customer-insurance', customerInsurancePurchase).subscribe(
      (data: any) => {
        console.log(data);
      }
    );
    console.log('This is after posting');
  }







  // -------------------------------------------------------------------------------------------------------------------------------------------------------






  check_validity() {
    if (this.userForm.get('sumInsured')?.valid && this.userForm.get('duration')?.valid && this.userForm.get('name')?.valid && this.userForm.get('address')?.valid && this.userForm.get('pincode')?.valid && this.userForm.get('city')?.valid
      && this.userForm.get('state')?.valid && this.userForm.get('nameOfNominee')?.valid && this.userForm.get('nomineeDOB')?.valid && this.userForm.get('relation')?.valid && this.userForm.get('mobile')?.valid) {
      if (this.userForm.get('vehicleRegistrationNumber')?.valid && this.userForm.get('engineNumber')?.valid && this.userForm.get('chassisNumber')?.valid && this.userForm.get('model')?.valid)
        return false
      if (this.userForm.get('adultno')?.valid && this.userForm.get('kidno')?.valid) {
        // console.log(this.adultValue + this.kidValue);
        const control = <FormArray>this.userForm.get('insuredInfo');
        for (let x = 0; x < (+this.adultValue + +this.kidValue); x++) {

          if ((control.at(x).get('insuredDOB')!.invalid) || (control.at(x).get('nameof')!.invalid) || (control.at(x).get('relation')!.invalid) || (control.at(x).get('preExistingIllness')!.invalid) || (control.at(x).get('weight')!.invalid) || (control.at(x).get('height')?.invalid)) {

            return true
          }
          else {

            if (control.at(x).get('preExistingIllness')?.value == 'Yes') {

              if (control.at(x).get('illnessList')?.invalid)
                return true
            }
          }
        }
        return false
      }
      if (this.userForm.get('maritalStatus')?.valid && this.userForm.get('occupation')?.valid && this.userForm.get('organisationType')?.valid && this.userForm.get('Pan')?.valid && this.userForm.get('aadhar')?.valid && this.userForm.get('annualIncome')?.valid &&
        this.userForm.get('weight')?.valid && this.userForm.get('height')?.valid && this.userForm.get('questionnaireAnswers')?.valid && this.userForm.get('lifeillnessStatus')?.valid)
        return false

    }
    return true
  }

  openSnackBar(message: string) {

    this.snackBar.open(message, 'Ok', { duration: 3000 });
  }
  function_check_dob() {
    const control = this.userForm.get('adultno')
    const dob_control = <FormArray>this.userForm.get('date_list')
    if (control?.invalid) {
      return false
    }
    for (let i = 0; i < +control!.value!; i++) {
      if (dob_control.at(i).get('dob')?.invalid) {
        return true
      }
    }
    return false
  }
  // ---------------------------------------NGONIT()-------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------
  ngOnInit(): void {

    const control1 = <FormArray>this.userForm.controls['date_list'];
    for (let index = 0; index < 16; index++) {
      control1.push(new FormGroup({
        dob: new FormControl("", [Validators.required])
      }))
    }
    console.log(control1);
    this.sortedsuminsured = []
    this.httpclient.get(`http://localhost:8080/insurance/api/vk1/policy-id/${this.service.policyNo}`).subscribe((data: any) => {
      console.log('Policy ID : ' + data.policyId)
      console.log('Policy Name : ' + data.policyName)

      if (data.insuranceType == 'AutoMobileInsurance') {
        console.log('Inside AutomobileInsurance');

        this.insuranceobj = []
        this.isAuto = true
        console.log(data.category);

        this.autocategory = data.category
        for (let index = 0; index < data.policyDetails.length; index++) {
          this.insuranceobj.push({ 'sumInsured': data.policyDetails[index].sumInsure, 'duration': data.policyDetails[index].durations, 'premium': data.policyDetails[index].premiums })
        }
        for (let index = 0; index < data.policyDetails.length; index++) {
          this.flags = true;
          for (let x = 0; x < this.sortedsuminsured.length; x++) {
            if (this.sortedsuminsured[x] == data.policyDetails[index].sumInsure) {
              this.flags = false;
              break;
            }
          }
          if (this.flags)
            this.sortedsuminsured.push(data.policyDetails[index].sumInsure)
        }
        this.sortedsuminsured.sort((a, b) => a - b)
      }
      else if (data.insuranceType == 'HealthInsurance') {
        this.insuranceobj = []
        this.isHealth = true
        for (let index = 0; index < data.policyDetails.length; index++) {
          this.insuranceobj.push({ 'sumInsured': data.policyDetails[index].sumInsure, 'duration': data.policyDetails[index].durations, 'kids': data.policyDetails[index].kids, 'adults1': data.policyDetails[index].adults1, 'adults2': data.policyDetails[index].adults2, 'adults3': data.policyDetails[index].adults3 })
        }
        for (let index = 0; index < data.policyDetails.length; index++) {
          this.flags = true;
          for (let x = 0; x < this.sortedsuminsured.length; x++) {
            if (this.sortedsuminsured[x] == data.policyDetails[index].sumInsure) {
              this.flags = false;
              break;
            }
          }
          if (this.flags)
            this.sortedsuminsured.push(data.policyDetails[index].sumInsure)
        }
        this.sortedsuminsured.sort((a, b) => a - b)
        const con = <FormArray>this.userForm.get('insuredInfo')
        for (let index = 0; index < 10; index++) {
          con.push(new FormGroup({
            nameof: new FormControl("", [Validators.required]),
            insuredDOB: new FormControl("", [Validators.required]),
            relation: new FormControl("", [Validators.required]),
            preExistingIllness: new FormControl("No", [Validators.required]),
            illnessList: new FormControl([], [Validators.required]),
            weight: new FormControl([], [Validators.required]),
            height: new FormControl([], [Validators.required])
          }));
        }
      }
      else if (data.insuranceType == 'LifeInsurance') {
        this.insuranceobj = []
        this.isLife = true
        for (let index = 0; index < data.policyDetails.length; index++) {
          this.insuranceobj.push({ 'sumInsured': data.policyDetails[index].sumInsure, 'duration': data.policyDetails[index].durations, 'premium': data.policyDetails[index].premiums, 'minsal': data.policyDetails[index].minSalary, 'maxsal': data.policyDetails[index].maxSalary })
        }

        for (let index = 0; index < data.policyDetails.length; index++) {
          this.flags = true;
          for (let x = 0; x < this.sortedsuminsured.length; x++) {
            if (this.sortedsuminsured[x] == data.policyDetails[index].sumInsure) {
              this.flags = false;
              break;
            }
          }
          if (this.flags)
            this.sortedsuminsured.push(data.policyDetails[index].sumInsure)
        }
      }


      this.userForm.get('policyname')?.setValue(data.policyName)
      this.userForm.get('policyname')!.disable();
      this.DescriptionText = data.policyDescription;
      this.policyName = data.policyName
      this.addons = []
      for (let index = 0; index < data.addOnDetails.length; index++) {
        // console.log('premium '+index+'  : '+data.policyDetails[index].premiums)
        console.log(data.addOnDetails[index].addOnName + "  : " + data.addOnDetails[index].addOnDescription + ' : ' + data.addOnDetails[index].addOnPremiums);

        this.addons.push({ 'addonname': data.addOnDetails[index].addOnName, 'addondescription': data.addOnDetails[index].addOnDescription, 'addonprice': data.addOnDetails[index].addOnPremiums },)
      }



      //  this.update_disease_status()

    })

    //====================================================================================================================
    this.id = Math.floor(Math.random() * 100000000 + 10000000);
    this.userForm.get('customerPolicyId')?.setValue(this.id.toString())
    this.userForm.get('customerPolicyId')!.disable();
    const control = <FormArray>this.userForm.controls['questionnaireAnswers'];

    for (let index = 1; index < this.questions.length; index++) {
      control.push(new FormGroup({
        answer: new FormControl("", [Validators.required])
      }));
    }

  }
  constructor(public httpclient: HttpClient, public snackBar: MatSnackBar, public order: PaymentService, public service: RecommendationServiceService) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    // this.minDate = new Date(currentYear - 25, currentMonth, currentDay);
    // this.maxDate = new Date(currentYear + 55, currentMonth,currentDay);
  }
  on_premium_select(data: any) {
    this.premium = +data
  }
  close_dob_div() {
    const control = <FormArray>this.userForm.controls['date_list'];
    for (let index = 0; index < this.adultValue; index++) {
      console.log(control.at(index).get('dob')!.value)
      if (control.at(index).get('dob')?.invalid) {
        this.openSnackBar("Please provide age of all adults")
        return
      }
    }

    this.checkflag = false

  }
  function_for_dob_list(i: any) {
    const control = <FormArray>this.userForm.get('date_list')
    if (this.userForm.get('adultno')?.invalid) {
      this.checkflag = false
      return
    }
    control.reset()
    this.checkflag = true
  }
  adding_child() {
    const control = <FormArray>this.userForm.controls['insuredInfo'];
    if (this.adultValue > 0)
      this.function_for_dob_list(2)


    console.log(control)
  }
  selectsuminsured(eve: any) {
    // this.update_disease_status()
    // console.log(this.adultValue)
    if (this.isAuto) {
      this.sortedduration = []
      for (let index = 0; index < this.insuranceobj.length; index++) {
        this.flags = true;
        for (let x = 0; x < this.sortedduration.length; x++) {
          if (this.sortedduration[x] == this.insuranceobj[index].duration) {
            this.flags = false;
            break;
          }
        }
        if (this.flags)
          this.sortedduration.push(this.insuranceobj[index].duration)
      }
      this.sortedduration.sort((a, b) => a - b)
      console.log(this.sortedduration);
    }
    this.sortedduration = []
    for (let index = 0; index < this.insuranceobj.length; index++) {

      if (this.insuranceobj[index].sumInsured == this.selectedValue)
        this.sortedduration.push(this.insuranceobj[index].duration)
    }
    this.sortedduration.sort((a, b) => a - b)
  }
  calculate_premium() {
    const policy_duration_control = this.userForm.get('duration')
    const policy_sum_insured_control = this.userForm.get('sumInsured')
    const model_control = this.userForm.get('model')
    const life_salary_control = this.userForm.get('annualIncome')
    const adult_control = this.userForm.get('adultno')
    const kid_control = this.userForm.get('kidno')
    const date_array_control = this.userForm.get('date_list')
    //Health Insurance Premium Calculation
    if (this.isHealth && this.userForm.get('sumInsured')?.valid && this.userForm.get('duration')?.valid && kid_control?.valid && adult_control?.valid) {
      console.log(1);
      if (this.userForm.get('adultno')?.valid && this.userForm.get('kidno')?.valid && this.userForm.get('sumInsured') && this.userForm.get('duration')?.valid) {
        console.log(123);

        const control = <FormArray>this.userForm.get('date_list')
        for (let i = 0; i < +this.userForm.get('adultno')?.value!; i++) {
          if (control.at(i).get('dob')?.invalid) {
            return false
          }
        }
        this.premium = 0;
        const sum = +this.userForm.get('sumInsured')!.value!
        const dur = +this.userForm.get('duration')!.value!
        let ins_obj_index = -1
        for (let index = 0; index < this.insuranceobj.length; index++) {
          if (sum == this.insuranceobj[index].sumInsured && dur == this.insuranceobj[index].duration) {
            ins_obj_index = index
            break
          }
        }
        if (ins_obj_index == -1) {
          return false
        }
        const controly = <FormArray>this.userForm.get('insuredInfo')
        const len = +this.adultValue + +this.kidValue;
        console.log(len);

        for (let i = 0; i < len; i++) {
          let factor = 1
          console.log("Inside");

          if (controly.at(i).get('weight')?.valid && controly.at(i).get('height')?.valid) {
            {
              const weight = controly.at(i).get('weight')?.value
              const height = controly.at(i).get('height')?.value
              let bmi = (weight) / (height * height)
              bmi = 10000 * bmi
              console.log('Bmi of user with name :' + controly.at(i).get('nameof')?.value + '  is  ' + bmi)
              if (bmi > 24 || bmi < 18) {
                factor = factor * 1.25
              }
            }
          }
          if (controly.at(i).get('preExistingIllness')?.valid) {
            if (controly.at(i).get('preExistingIllness')?.value == 'Yes') {
              factor = factor * 1.25
            }
          }
          if (control.at(i).get('dob')?.value < 41) {
            if (ins_obj_index > -1) {
              console.log('Factor ' + factor)

              this.premium = this.premium + (factor * this.insuranceobj[ins_obj_index].adults1!);
            }
            continue
          }
          if (control.at(i).get('dob')?.value < 51) {
            console.log('Factor ' + factor)
            const controly = <FormArray>this.userForm.get('insuredInfo')
            if (ins_obj_index > -1) {
              this.premium = this.premium + (factor * this.insuranceobj[ins_obj_index].adults2!);
            }
            continue
          }
          if (control.at(i).get('dob')?.value < 61) {
            console.log('Factor ' + factor)
            const controly = <FormArray>this.userForm.get('insuredInfo')
            if (ins_obj_index > -1) {
              this.premium = this.premium + (factor * this.insuranceobj[ins_obj_index].adults3!);
            }
            continue
          }
        }
        let kidfactor = 1
        for (let z = 0; z < this.kidValue; z++) {
          const controly = <FormArray>this.userForm.get('insuredInfo')
          if (controly.at(+z + +this.adultValue).get('weight')?.valid && controly.at(+z + +this.adultValue).get('height')?.valid) {
            {
              const weight = controly.at(z).get('weight')?.value
              const height = controly.at(z).get('height')?.value
              let bmi = (weight) / (height * height)
              bmi = 10000 * bmi
              console.log('Bmi of user with name :' + controly.at(z + +this.adultValue).get('nameof')?.value + '  is  ' + bmi)
              if (bmi > 24 || bmi < 18) {
                kidfactor = kidfactor + 0.1
              }
            }
          }
          if (controly.at(+z + +this.adultValue).get('preExistingIllness')?.valid) {
            console.log(controly.at(+z + +this.adultValue).get('preExistingIllness')!.value);
            if (controly.at(+z + +this.adultValue).get('preExistingIllness')!.value == 'Yes') {
              kidfactor = kidfactor + 0.1
            }
          }
        }
        this.premium = Math.floor(this.premium + this.insuranceobj[ins_obj_index].kids! * this.kidValue * kidfactor + this.addonpremium * (+this.adultValue + +this.kidValue))
        console.log('kidFactor : ' + kidfactor);
        console.log(this.insuranceobj[ins_obj_index]);
        this.insuranceobj[ins_obj_index]
        this.times = Math.floor(+this.userForm.get('sumInsured')!.value! / this.premium)
        return true
      }
      return false
    }
    //Life Insurance Premium Calculation
    if (this.isLife && this.userForm.get('sumInsured')?.valid && this.userForm.get('duration')?.valid && this.userForm.get('annualIncome')?.valid) {
      let arr: number[] = []
      let currentpremium = this.premium
      const sum = +this.userForm.get('sumInsured')!.value!
      const dur = +this.userForm.get('duration')!.value!
      const sel_sal = +this.userForm.get('annualIncome')!.value!
      const maxsal = +this.userForm.get('duration')!.value!
      let ins_obj_index = -1
      for (let index = 0; index < this.insuranceobj.length; index++) {
        if (sum == this.insuranceobj[index].sumInsured && dur == this.insuranceobj[index].duration && sel_sal >= this.insuranceobj[index].minsal! && sel_sal <= this.insuranceobj[index].maxsal!) {
          ins_obj_index = index
          arr.push(this.insuranceobj[index].premium!)
        }
      }
      if (arr.length == 0) {
        return false
      }
      if (arr.length == 1) {
        this.premium = arr[0]
        this.times = Math.floor(+this.userForm.get('sumInsured')!.value! / this.premium)
        return true
      }
      let k = -1
      for (k = 0; k < arr.length; k++) {
        if (arr[k] == currentpremium) {
          break;
        }
      }
      if (k < arr.length) {
        this.premium = currentpremium
        if (this.userForm.get('lifeillnessStatus')?.valid) {
          if ((this.userForm.get('lifeillnessStatus')?.value)?.toString() == 'Yes') {
            this.premium = Math.floor(1.2 * this.premium)
          }
        }
        const anscontrol = <FormArray>this.userForm.get('questionnaireAnswers')
        if (anscontrol.valid) {
          let numcount = 0
          for (let kk = 0; kk < anscontrol.length; kk++) {
            if (anscontrol.at(kk).value == true) {
              numcount++
            }
          }
          if (numcount > 2) {
            this.premium = Math.floor(1.2 * this.premium)
          }
        }
        this.times = Math.floor(+this.userForm.get('sumInsured')!.value! / this.premium)
        return true
      }
      return false
    }
    //Auto Insurance Premium Calculation
    if (this.isAuto && model_control?.valid && policy_duration_control?.valid && policy_sum_insured_control?.valid) {
      console.log("Inside premium calculating method of Auto Insurance");
      for (let k = 0; k < this.insuranceobj.length; k++) {
        if (this.insuranceobj[k].sumInsured == +policy_sum_insured_control.value! && this.insuranceobj[k].duration == +policy_duration_control.value!) {
          this.premium = this.insuranceobj[k].premium! + this.addonpremium
          this.times = Math.floor(+this.userForm.get('sumInsured')!.value! / this.premium)
          return true
        }
      }
      return false
    }
    return false
  }





  on_duration_select(data: any) {
    console.log(this.isHealth);

    this.date = new Date()
    // this.formattedDate = formatDate(this.date, 'yyyy-MM-dd', 'en-US');
    this.userForm.get('startDate')?.setValue(formatDate(this.date, 'yyyy-MM-dd', 'en-IN'))
    this.date.setFullYear(this.date.getFullYear() + +this.selectedDuration);
    this.userForm.get('endDate')?.setValue(formatDate(this.date, 'yyyy-MM-dd', 'en-IN'))
    console.log('start Date : ' + this.userForm.get('startDate')!.value)
    console.log('End Date : ' + this.userForm.get('endDate')!.value);
    if (this.isAuto) {
      const control1 = this.userForm.get('model')
      const control2 = this.userForm.get('sumInsured')
      const control3 = this.userForm.get('duration')
      if (!control1?.valid && !control2?.valid) {
        this.openSnackBar("Select Vehicle Model and Sum Insured before duration")
        control3?.reset()
        return
      }
      if (!control2?.valid) {
        this.openSnackBar("Please Select Sum Insured First")
        control3?.reset()
        return
      }
      this.sortedsuminsured = []
      const select_duration = +control3?.value!
      for (let index = 0; index < this.insuranceobj.length; index++) {
        this.flags = true
        for (let vx = 0; vx < this.sortedsuminsured.length; vx++) {
          if (this.sortedsuminsured[vx] == this.insuranceobj[index].sumInsured) {
            this.flags = false
            break
          }
        }
        if (this.flags && this.insuranceobj[index].duration == select_duration)
          this.sortedsuminsured.push(this.insuranceobj[index].sumInsured)
      }

      for (let i = 0; i < this.insuranceobj.length; i++) {
        if (this.insuranceobj[i].duration == +control3?.value! && this.insuranceobj[i].sumInsured == +control2?.value!) {
          this.premium = this.addonpremium + this.insuranceobj[i].premium!
          break
        }
      }
      return
    }
    if (this.isLife) {
      console.log('Entered isLife method')
      const control1 = this.userForm.get('annualIncome')
      const control2 = this.userForm.get('sumInsured')
      const control3 = this.userForm.get('duration')
      const user_salary = +control1?.value!
      const selected_duration = +control3?.value!
      const sum_insured = +control2?.value!
      if (!control1?.valid && !control2?.valid) {
        this.openSnackBar("Enter Annual Income and select Sum Insured before duration")
        control3?.reset()
        return
      }
      if (!control2?.valid) {
        this.openSnackBar("Please Select Sum Insured First")
        control3?.reset()
        return
      }
      this.sortedsuminsured = []
      const select_duration = +control3?.value!
      for (let index = 0; index < this.insuranceobj.length; index++) {
        this.flags = true
        for (let vx = 0; vx < this.sortedsuminsured.length; vx++) {
          if (this.sortedsuminsured[vx] == this.insuranceobj[index].sumInsured) {
            this.flags = false
            break
          }
        }
        if (this.flags && this.insuranceobj[index].duration == select_duration && user_salary > this.insuranceobj[index].minsal! && user_salary < this.insuranceobj[index].maxsal!)
          this.sortedsuminsured.push(this.insuranceobj[index].sumInsured)
      }
      this.insuranceobj.sort((a, b) => b.premium! - a.premium!)
      let count = 0;
      this.premiumarray = []
      for (let i = 0; i < this.insuranceobj.length; i++) {
        console.log('Value of result' + (this.insuranceobj[i].duration == selected_duration && this.insuranceobj[i].sumInsured == sum_insured && user_salary > this.insuranceobj[i].minsal! && user_salary < this.insuranceobj[i].maxsal!));
        if (this.insuranceobj[i].duration == selected_duration && this.insuranceobj[i].sumInsured == sum_insured && user_salary > this.insuranceobj[i].minsal! && user_salary < this.insuranceobj[i].maxsal!) {
          count++;
          console.log(i);
          this.premiumarray.push(this.insuranceobj[i].premium!)
          this.premium = this.addonpremium + this.insuranceobj[i].premium!
        }
      }
      console.log('count of count : ' + count);

      console.log(this.premium)
      if (count > 1) {
        this.premiumarray.sort((a, b) => a - b)
        this.show_premiums_flag = true
      }
      else {
        this.show_premiums_flag = false
      }
      return
    }
    if (this.isHealth) {
      console.log('Inside the isHealth');

      const control1 = this.userForm.get('adultno')
      const control2 = this.userForm.get('kidno')
      const control3 = this.userForm.get('sumInsured')
      const control4 = this.userForm.get('duration')
      console.log(control1?.valid);

      if (this.adultValue < 1) {
        this.openSnackBar("Select no of adults and give their age")
        control4?.reset()
        return
      }
      if (this.kidValue < 0) {
        this.openSnackBar("Select no of kids first")
        control4?.reset()
        return
      }
      if (control3?.invalid) {
        this.openSnackBar("Please Select Sum Insured First")
        control4?.reset()
        return
      }
      // this.calculate_premium()
    }

  }
  on_suminsured_select(data: any) {
    if (this.isAuto) {
      const control1 = this.userForm.get('sumInsured')
      const control2 = this.userForm.get('duration')
      if (!this.userForm.get('model')?.valid) {
        this.openSnackBar("Please select Vehicle model first")
        this.userForm.get('sumInsured')?.reset();
        return
      }
      console.log("In SelectedPrem");
      if (control2?.valid) {
        const insured_sum = +control1?.value!
        const insured_duration = +control2.value!
        //this.premium=this.addonpremium
        for (let index = 0; index < this.insuranceobj.length; index++) {
          if (insured_sum == this.insuranceobj[index].sumInsured && insured_duration == this.insuranceobj[index].duration) {
            this.premium = this.addonpremium + this.insuranceobj[index].premium!
          }
        }
      }
      this.sortedduration = []
      const select_sumInsured = +this.userForm.get('sumInsured')?.value!
      console.log("sum Selected" + select_sumInsured);
      console.log(this.insuranceobj);

      for (let index = 0; index < this.insuranceobj.length; index++) {
        this.flags = true
        for (let vx = 0; vx < this.sortedduration.length; vx++) {
          if (this.sortedduration[vx] == this.insuranceobj[index].duration) {
            this.flags = false
            break
          }
        }
        if (this.flags && this.insuranceobj[index].sumInsured == select_sumInsured)
          this.sortedduration.push(this.insuranceobj[index].duration)
      }

      return
    }
    if (this.isLife) {
      const control1 = this.userForm.get('sumInsured')
      const control2 = this.userForm.get('duration')
      const control3 = this.userForm.get('annualIncome')
      const user_salary = +control3?.value!
      if (!this.userForm.get('annualIncome')?.valid) {
        this.openSnackBar("Please select Annual Income first")
        this.userForm.get('sumInsured')?.reset();
        return
      }
      console.log("In Select Premium function");
      if (control2?.valid) {
        const insured_sum = +control1?.value!
        const insured_duration = +control2.value!
        let count = 0;
        this.insuranceobj.sort((a, b) => -a.premium! + b.premium!)
        this.premiumarray = []
        for (let index = 0; index < this.insuranceobj.length; index++) {
          if (insured_sum == this.insuranceobj[index].sumInsured && insured_duration == this.insuranceobj[index].duration && user_salary > this.insuranceobj[index].minsal! && user_salary < this.insuranceobj[index].maxsal!) {
            count++;
            this.premiumarray.push(this.insuranceobj[index].premium!)
            this.premium = this.addonpremium + this.insuranceobj[index].premium!
          }
        }
        if (count > 1) {
          this.premiumarray.sort((a, b) => a - b)
          this.show_premiums_flag = true
        }
        else
          this.show_premiums_flag = false
      }
      this.sortedduration = []
      const select_sumInsured = +this.userForm.get('sumInsured')?.value!
      console.log("sum Selected :" + select_sumInsured);
      console.log("User salary :" + user_salary);
      console.log(this.insuranceobj);

      for (let index = 0; index < this.insuranceobj.length; index++) {
        this.flags = true
        for (let vx = 0; vx < this.sortedduration.length; vx++) {
          if (this.sortedduration[vx] == this.insuranceobj[index].duration) {
            this.flags = false
            break
          }
        }
        console.log(user_salary + '  ' + this.insuranceobj[index].minsal + '  ' + this.insuranceobj[index].maxsal)
        console.log(user_salary > this.insuranceobj[index].minsal! && user_salary < this.insuranceobj[index].maxsal!)
        if (this.flags && this.insuranceobj[index].sumInsured == select_sumInsured && user_salary > this.insuranceobj[index].minsal! && user_salary < this.insuranceobj[index].maxsal!)
          this.sortedduration.push(this.insuranceobj[index].duration)
      }
      this.sortedduration.sort((a, b) => a - b)
      return
    }
    if (this.isHealth) {
      const control1 = this.userForm.get('sumInsured')
      const control2 = this.userForm.get('duration')
      const control3 = this.userForm.get('kidno')
      const control4 = this.userForm.get('adultno')
      const kids_no = +control3?.value!
      const adult_no = +control4?.value!
      console.log('Kids : ' + kids_no + ' Adults : ' + adult_no);

      if (control3?.invalid || control4?.invalid) {
        this.openSnackBar("Please select both no of adults and kids ")
        this.userForm.get('sumInsured')?.reset();
        return
      }
      else {
        const dob_control = <FormArray>this.userForm.get('date_list')
        for (let y = 0; y < adult_no; y++) {
          if (dob_control.at(y).get('dob')?.invalid) {
            this.openSnackBar("Please give ages of all adults covered in policy: Agelimit(21 to 60)")
            this.userForm.get('sumInsured')?.reset();
            return
          }
        }
      }
      console.log("In Select Premium function");
      if (control1?.invalid) {
        this.openSnackBar('Select Sum Insured first')
        control2?.reset()
        return
      }
      this.sortedduration = []
      const select_sumInsured = +this.userForm.get('sumInsured')?.value!
      console.log("sum Selected :" + select_sumInsured);
      console.log(this.insuranceobj);
      for (let index = 0; index < this.insuranceobj.length; index++) {
        this.flags = true
        for (let vx = 0; vx < this.sortedduration.length; vx++) {
          if (this.sortedduration[vx] == this.insuranceobj[index].duration) {
            this.flags = false
            break
          }
        }
        if (this.flags && this.insuranceobj[index].sumInsured == select_sumInsured)
          this.sortedduration.push(this.insuranceobj[index].duration)
      }
      this.sortedduration.sort((a, b) => a - b)
      return
    }
  }
  //----------------------------------------------------------------------------------------------------------------
  set_suminsured_life_insurance(salary: any) {
    if (this.isLife) {
      console.log('Inside method set_suminsured_life_insurance');
      console.log(this.insuranceobj);
      const user_salary = +salary
      this.sortedsuminsured = []
      const control1 = this.userForm.get('sumInsured')
      const control2 = this.userForm.get('duration')
      this.userForm.get('premium')?.reset()
      this.premiumarray = []
      this.show_premiums_flag = false
      if (control1?.valid || control2?.valid) {
        control1?.reset()
        control2?.reset()
      }
      for (let index = 0; index < this.insuranceobj.length; index++) {
        this.flags = true
        for (let vx = 0; vx < this.sortedsuminsured.length; vx++) {
          if (this.sortedsuminsured[vx] == this.insuranceobj[index].sumInsured) {
            this.flags = false
            break
          }
        }
        console.log('MAX - ' + this.insuranceobj[index].maxsal + ' MIN - ' + this.insuranceobj[index].minsal + ' User sal - ' + user_salary)
        console.log(this.insuranceobj[index].minsal! < user_salary && this.insuranceobj[index].maxsal! > user_salary);
        if (this.flags && this.insuranceobj[index].minsal! < user_salary && this.insuranceobj[index].maxsal! > user_salary)
          this.sortedsuminsured.push(this.insuranceobj[index].sumInsured)
      }
      if (this.sortedsuminsured.length == 0) {
        this.dataSource = []
        for (let i = 0; i < this.insuranceobj.length; i++) {
          this.insuranceobj.sort((a, b) => a.sumInsured - b.sumInsured)
          this.dataSource.push({ 'minSal': this.insuranceobj[i].minsal!, 'maxSal': this.insuranceobj[i].maxsal!, 'duration': this.insuranceobj[i].duration, 'suminsured': this.insuranceobj[i].sumInsured });
        }
        for (let m = 0; m < this.dataSource.length - 1; m++) {
          for (let n = m + 1; n < this.dataSource.length; n++) {
            if (this.dataSource[m].minSal == this.dataSource[n].minSal && this.dataSource[m].maxSal == this.dataSource[n].maxSal && this.dataSource[m].duration == this.dataSource[n].duration && this.dataSource[m].suminsured == this.dataSource[n].suminsured) {
              this.dataSource[n].minSal = -1
            }
          }
        }
        this.dataSource.filter((a) => a.minSal > 0)
        this.dataSource.sort((a, b) => a.minSal - b.minSal)
        if (this.userForm.get('annualIncome')?.valid)
          this.displaytableflag = true
        else
          this.displaytableflag = false
      }
      else {
        this.displaytableflag = false
      }
      this.sortedsuminsured.sort((a, b) => a - b)
      console.log(this.sortedsuminsured)
    }

  }
  checked_addOn(an: any, i: any, price: any, name: string) {
    console.log("Value of " + i);
    if (an.checked == true) {
      if (this.addonnamelist.findIndex(x => x === name) > -1) {
        console.log(this.addonnamelist)
        return
      }
      this.premium = this.premium + +price;
      this.addonpremium = this.addonpremium + +price
      this.addonnamelist.push(name)
      console.log(this.addonnamelist)
    }
    else {
      this.premium = this.premium - +price;
      this.addonpremium = this.addonpremium - +price
      this.addonnamelist = this.addonnamelist.filter(add_on_name => add_on_name != name)
      console.log(this.addonnamelist)
    }
    console.log(an.checked);
  }
  update_disease_status() {
    this.diseasestatus = []
    for (let index = 0; index < (+this.adultValue + +this.kidValue); index++) {
      this.diseasestatus[index] = false
    }

  }
  display_disease(x: any) {
    console.log(this.diseasestatus[x]);
    if (this.diseasestatus[x] == true)
      return true
    else
      return false
  }
  check_illness(i: any) {
    const control = <FormArray>this.userForm.controls['insuredInfo'];
    // console.log('Illness status of User  : '+i+' : '+control.at(i).get('preExistingIllness')!.value)
    if (control.at(i).get('preExistingIllness')!.value == 'Yes') {
      return true
    }
    if (control.at(i).get('preExistingIllness')?.value == 'No') {
      return false
    }
    return true
  }
  function_to_return_status() {
    if (this.dis_status === 'yes')
      return true
    else {
      return false
    }
  }
  refresh() {
    this.userForm.get('sumInsured')?.reset()
    this.userForm.get('duration')?.reset()
    this.show_premiums_flag = false
    if (this.isAuto) {
      this.sortedsuminsured = []
      for (let index = 0; index < this.insuranceobj.length; index++) {
        this.flags = true;
        for (let x = 0; x < this.sortedsuminsured.length; x++) {
          if (this.sortedsuminsured[x] == this.insuranceobj[index].sumInsured) {
            this.flags = false;
            break;
          }
        }
        if (this.flags)
          this.sortedsuminsured.push(this.insuranceobj[index].sumInsured)
      }
      this.sortedsuminsured.sort((a, b) => a - b)
      this.sortedduration = []
    }
    if (this.isLife) {
      this.sortedsuminsured = []
      this.sortedduration = []
      if (this.userForm.get('annualIncome')?.invalid)
        return
      this.sortedsuminsured = []
      for (let index = 0; index < this.insuranceobj.length; index++) {
        this.flags = true;
        for (let x = 0; x < this.sortedsuminsured.length; x++) {
          if (this.sortedsuminsured[x] == this.insuranceobj[index].sumInsured) {
            this.flags = false;
            break;
          }
        }
        if (this.flags)
          this.sortedsuminsured.push(this.insuranceobj[index].sumInsured)
      }
      this.sortedsuminsured.sort((a, b) => a - b)
    }
    if (this.isHealth) {
      this.userForm!.get('sumInsured')!.reset()
      this.userForm!.get('duration')?.reset
    }

  }
  print() {
    console.log(this.userForm.value)
  }
  check_age_limit(i: any) {
    const control = <FormArray>this.userForm.get('date_list');
    const age = control.at(+i).get('dob')?.value
    if (age > 60 || age < 21) {
      this.openSnackBar('Age should be betwee 21 and 60 for adults')
      control.at(+i).get('dob')?.reset()
    }
  }
  strmsg = ''

  age_display() {
    let count = this.adultValue + this.kidValue
    this.strmsg = ''
    //  let birthdate=this.userForm.get('nomineeDOB')!.value
    //  this.strmsg=this.strmsg+birthdate
    //  let timeDiff = Math.abs(Date.now() -  new Date(birthdate!.toString()).getTime());
    //  let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    //  this.strmsg=this.strmsg+age+'-'
    const control = <FormArray>this.userForm.get('insuredInfo')
    for (let i = 0; i < count; i++) {
      // if(control.valid){
      // if(control.at(i).valid){
      let birthdate = control.at(i).get('insuredDOB')!.value.toString()
      //  birthdate=control.at(i).get('insuredDOB')!
      let timeDiff = Math.abs(Date.now() - new Date(birthdate).getTime());
      let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
      this.strmsg = this.strmsg + age + '-'
      //   }
      // }
    }
    this.strmsg = this.strmsg + '-' + count
  }
  getnumber() {
    var text = 1;
    var possible = "123456789";
    let randomlength = Math.floor(Math.random() * 2377 * possible.length) % 10
    randomlength++
    for (var i = 0; i < randomlength; i++)
      text = text + (i + 1) * Math.floor(Math.random() * possible.length) % 10

    return text;
  }
  getword() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomlength = Math.floor(Math.random() * possible.length) % 10
    randomlength++
    for (var i = 0; i < randomlength; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  getdob() {
    var text = "";
    let randomlength = Math.floor(Math.random() * 15654833)
    randomlength++

    text = (randomlength % 40 + 1980).toString() + '-'
    text = text + (randomlength % 3 + 10).toString() + '-'
    text = text + (randomlength % 20 + 10).toString()
    // for (var i = 0; i < randomlength; i++)
    //   text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
  getdisease() {
    var text = [];
    let randomlength = Math.floor(Math.random() * 15654833) % this.diseaselist.length
    randomlength++

    for (var i = 0; i < randomlength; i++)
      text.push(this.diseaselist[i])
    return text;
  }
  fill_form() {
    const date = new Date()
    this.userForm.get('name')?.patchValue(this.getword())
    this.userForm.get('address')?.patchValue(this.getword())
    this.userForm.get('city')?.patchValue(this.getword())
    this.userForm.get('state')?.patchValue(this.getword())
    this.userForm.get('pincode')?.patchValue(this.getnumber().toString())
    this.userForm.get('mobile')?.patchValue(this.getnumber().toString())
    this.userForm.get('nameOfNominee')?.patchValue(this.getword())
    this.userForm.get('nomineeDOB')?.patchValue("1983-05-05")
    this.userForm.get('relation')?.patchValue(this.relationlist[this.getnumber() % this.relationlist.length])
    this.userForm.get('adultno')?.patchValue((this.getnumber() % 5 + 1).toString())
    this.userForm.get('kidno')?.patchValue((this.getnumber() % 5).toString())
    this.function_for_dob_list(this.adultValue)
    const control = <FormArray>this.userForm.get('date_list')
    let num = 0
    for (let i = 0; i < this.adultValue; i++) {
      console.log(this.getnumber());

      while (num > 60 || num < 20) {
        num = this.getnumber() % 40

        num = num + 52
        console.log(num)
      }

      control.at(i).get('dob')?.patchValue(((num * this.getnumber()) % 40 + 21).toString())
    }
    this.userForm.get('sumInsured')?.patchValue(this.sortedsuminsured[this.getnumber() % this.sortedsuminsured.length].toString())
    this.on_suminsured_select(this.selectedValue)
    setTimeout(() => {
      this.userForm.get('duration')?.patchValue(this.sortedduration[this.getnumber() % this.sortedduration.length].toString())
      this.on_duration_select(this.selectedDuration);
    }, 2000);

    setTimeout(() => {
      const controlx = <FormArray>this.userForm.get('insuredInfo')
      for (let x = 0; x < (this.adultValue + this.kidValue); x++) {
        let opt = ["Yes", "No"]
        let selection = this.getnumber() % 2
        controlx.at(x).get('nameof')?.patchValue(this.getword())
        controlx.at(x).get('insuredDOB')?.patchValue(this.getdob())
        controlx.at(x).get('relation')?.patchValue(this.relationlist[this.getnumber() % this.relationlist.length])
        controlx.at(x).get('preExistingIllness')?.patchValue(opt[selection])
        if (selection == 0) {
          controlx.at(x).get('illnessList')?.patchValue(this.getdisease())
        }
        controlx.at(x).get('height')?.patchValue(((num * this.getnumber()) % 40 + 150).toString())
        controlx.at(x).get('weight')?.patchValue(((num * this.getnumber()) % 40 + 50).toString())
      }
    }, 5000);

  }
}
