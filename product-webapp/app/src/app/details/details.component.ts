// import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

// import * as pdfMake from "pdfmake/build/pdfmake";  
// import * as pdfFonts from "pdfmake/build/vfs_fonts";  

import domtoimage from 'dom-to-image';
import  jsPDF from 'jspdf';

// declare var require: any;
// const htmlToPdfmake = require("html-to-pdfmake");
// (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

// import * as pdfMake from "pdfmake/build/pdfmake";  
// import * as pdfFonts from "pdfmake/build/vfs_fonts";  
// declare var require: any;
// const htmlToPdfmake = require("html-to-pdfmake");
// (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [DatePipe]
})
export class DetailsComponent implements OnInit {
  insuranceType: string | null;
  policyId:any;
  policies:any;
  healthInsuredInfo:any;
  claims:any;
  renewals:any;
  claimDatesArray:any;
  claimSumArray:any;
  claimStatusArray:any;
  
  sysDate = new Date();
  currentDate:any;
 
  constructor(private http:HttpClient, private datePipe: DatePipe) {
     this.insuranceType= localStorage.getItem('insuranceType');
     this.policyId= localStorage.getItem('customerPolicyId');

     this.currentDate = this.datePipe.transform(this.sysDate, 'yyyy-MM-dd');
     console.log(this.sysDate);
     console.log(this.currentDate);
     
     
  }

  ngOnInit(): void {
    let response= this.http.get("http://localhost:8084/api/retrieveall/customerinsurances");
    response.subscribe((data)=>{
      console.log(data);
      this.policies=data;
      // for(var i=0;i<this.policies.length;i++){
      //   if(this.policies[i].customerPolicyId==this.policyId){
      //     this.policies[i].startDate.length = this.renewals;
      //     this.policies[i].claimStatus.length = this.claims;
      //     for(var j=0;j<i;j++){
      //       this.claimDatesArray[j]=this.policies[i].claimDate[j];
      //       console.log(this.claimDatesArray);
            
      //     }
      //   }
        
         
      // console.log(this.policies[0].policyType);
      // For="let details of data"
      // this.healthInsuredInfo=data.healthInsurance.insuredInfo;
      // }
    });
  }

  downloadMyFile(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'abc.net/files/test.ino');
    link.setAttribute('download', `policyDetails.pdf`);
    // document.body.appendChild(link);
    link.click();
    link.remove();
}

@ViewChild('pdfFile')
  pdfFile!: ElementRef;
  
  // public downloadAsPDF() {
  //   const pdfFile = this.pdfFile.nativeElement;
  //   var html = htmlToPdfmake(pdfFile.innerHTML);
  //   const documentDefinition = { content: html };
  //   pdfMake.createPdf(documentDefinition).download(); 
     
  // }


  public downloadAsPDF() {
    let div = this.pdfFile.nativeElement;
   
    var img:any;
    var filename;
    var newImage:any;


    domtoimage.toPng(div, { bgcolor: '#fff' })

      .then(function(dataUrl: any) {

        img = new Image();
        img.src = dataUrl;
        newImage = img.src;

        img.onload = function(){

        var pdfWidth = img.width;
        var pdfHeight = img.height;

          // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

          var doc;

          if(pdfWidth > pdfHeight)
          {
            doc = new jsPDF('l', 'px', [pdfWidth , pdfHeight]);
          }
          else
          {
            doc = new jsPDF('p', 'px', [pdfWidth , pdfHeight]);
          }


          var width = doc.internal.pageSize.getWidth();
          var height = doc.internal.pageSize.getHeight();


          doc.addImage(newImage, 'PNG',  10, 11, width, height);
          filename = 'myPolicyDetails' + '.pdf';
          doc.save(filename);

        };


      })
      .catch(function(error: any) {

       // Error Handling
       console.log(error);
       

      });
 
  }
}

