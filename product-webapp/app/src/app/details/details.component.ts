// import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";

import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';

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
  policyId: any;
  policyName: any;
  policies: any;
  healthInsuredInfo: any;
  claims: any;
  renewals: any;
  claimDatesArray: any;
  claimSumArray: any;
  claimStatusArray: any;

  sysDate = new Date();
  currentDate: any;
  sampleDate = new Date();
  sampleFinlDate: any;

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.insuranceType = localStorage.getItem('insuranceType');
    this.policyId = localStorage.getItem('customerPolicyId');
    this.policyName = localStorage.getItem('policyName');
    this.currentDate = this.datePipe.transform(this.sysDate, 'yyyy-MM-dd');
    this.sampleFinlDate = this.datePipe.transform('Wed Aug 22 2022 23:11:06 GMT+0530 (India Standard Time)', 'yyyy-MM-dd');
    console.log(this.sampleFinlDate);

    console.log(this.sysDate.getMonth);
    //  console.log(this.currentDate.getMonth());

    console.log("----------------");
    //  console.log(this.currentDate.compareTo(this.sampleFinlDate));
    console.log(this.currentDate.month);



  }

  ngOnInit(): void {
    let response= this.http.get("http://localhost:8080/purchase/api/retrieveall/customerinsurances");
    response.subscribe((data)=>{
      console.log(data);
      this.policies = data;

    });
  }



  @ViewChild('pdfFile')
  pdfFile!: ElementRef;


  public downloadAsPDF(policyNo: any) {
    let div = this.pdfFile.nativeElement;

    var img: any;
    var filename;
    var newImage: any;


    domtoimage.toPng(div, { bgcolor: '#fff' })

      .then(function (dataUrl: any) {

        img = new Image();
        img.src = dataUrl;
        newImage = img.src;

        img.onload = function () {

          var pdfWidth = img.width;
          var pdfHeight = img.height;

          // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

          var doc;

          if (pdfWidth > pdfHeight) {
            doc = new jsPDF('l', 'px', [pdfWidth, pdfHeight]);
          }
          else {
            doc = new jsPDF('p', 'px', [pdfWidth, pdfHeight]);
          }


          var width = doc.internal.pageSize.getWidth();
          var height = doc.internal.pageSize.getHeight();


          doc.addImage(newImage, 'PNG', 10, 11, width, height);
          filename = `${policyNo}-PolicyDetails.pdf`;
          doc.save(filename);

        };


      })
      .catch(function (error: any) {

        // Error Handling
        console.log(error);


      });

  }



  downloadPdf(base64String: any, policyNo: any) {

    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    // link.download = `${fil.pdf`
    link.download = `${policyNo}-claimDocument.pdf`;
    link.click();

  }


  onClickDownloadFile(doc: any, policyNo: any) {
    this.downloadPdf(doc, policyNo);
  }


  openFile(doc: any) {
    var byteCharacters = atob(doc);
    var byteNumbers = new Array(byteCharacters.length);

    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);
    var file = new Blob([byteArray], { type: 'application/pdf;base64' });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }

}

