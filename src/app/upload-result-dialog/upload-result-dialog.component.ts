import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgModel } from '@angular/forms';
//import { Angular2Csv } from 'angular2-csv/Angular2-csv'; 

@Component({
  selector: 'app-upload-result-dialog',
  templateUrl: './upload-result-dialog.component.html',
  styleUrls: ['./upload-result-dialog.component.scss']
})
export class UploadResultDialogComponent implements OnInit {

    uploadResultList: any;
    expName: string;

    constructor(public thisDialogRef: MatDialogRef<UploadResultDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    

    ngOnInit() {
        this.uploadResultList = this.data.uploadResult;
        this.expName = this.data.experimentName;
  }

    onCloseCancel(): void {

        this.thisDialogRef.close('Cancel');
    }

    downloadFile() {

    }

    ResolveIssue() {

    }
   

}
