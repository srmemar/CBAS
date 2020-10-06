import {
    Component, OnInit, Inject, NgModule,
    ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { Location } from '@angular/common';
import { TaskAnalysisService } from '../services/taskanalysis.service';
import { PISiteService } from '../services/piSite.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
//import { UploadService } from '../services/upload.service';
import { SharedModule } from '../shared/shared.module';
import { PubScreenService } from '../services/pubScreen.service';
import { Pubscreen } from '../models/pubscreen';
import { Cogbytes } from '../models/cogbytes'
import { CogbytesUploadComponent } from '../cogbytesUpload/cogbytesUpload.component'
import { IdentityService } from '../services/identity.service';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AuthorDialogeComponent } from '../authorDialoge/authorDialoge.component';
import { take, takeUntil } from 'rxjs/operators';

@Component({

    selector: 'app-cogbytesDialogue',
    templateUrl: './cogbytesDialogue.component.html',
    styleUrls: ['./cogbytesDialogue.component.scss'],
    providers: [TaskAnalysisService,  PISiteService]

})
export class CogbytesDialogueComponent implements OnInit {

    //Models Variables for adding Publication
    authorModel: any;
    authorModel2: any;
    titleModel: any;
    dateModel: any;
    keywordsModel: any;
    doiModel: any;
    authorMultiSelect: any;
    doiKeyModel: any;
    isEditMode: boolean;
    privacyStatusModel: boolean;
    descriptionModel: any;
    additionalNotesModel: any;
    linkModel: any;
    piModel: any;

    // Definiing List Variables 
    authorList: any;
    authorList2: any;
    searchResultList: any;
    yearList: any;
    paperInfoFromDoiList: any;
    paperInfo: any;
    

    private form: FormGroup;



    //onbj variable from Models
    _cogbytes = new Cogbytes();

    public authorMultiFilterCtrl: FormControl = new FormControl();
    public filteredAutorList: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
    /** Subject that emits when the component has been destroyed. */
    private _onDestroy = new Subject<void>();

    // container for child components (cogbytesUpload)
    @ViewChild('uploadContainer', { read: ViewContainerRef }) entry: ViewContainerRef;
    child_unique_key: number = 0;
    componentReferences = Array<ComponentRef<CogbytesUploadComponent>>();

    constructor(
        public thisDialogRef: MatDialogRef<CogbytesDialogueComponent>,
        // private pagerService: PagerService,
        private spinnerService: Ng4LoadingSpinnerService,
        public dialog: MatDialog,
        private pubScreenService: PubScreenService,
        public dialogAuthor: MatDialog,

        private resolver: ComponentFactoryResolver,
        
        @Inject(MAT_DIALOG_DATA) public data: any,) {

        this.resetFormVals();
    }

    ngOnInit() {

        this.isEditMode = false;

/*        this.GetAuthorList();
        this.pubScreenService.getPaperType().subscribe(data => { this.paperTypeList = data; });
        this.pubScreenService.getTask().subscribe(data => { this.taskList = data; this.processList(this.taskList, "None", "task"); this.processList(this.taskList, "Other", "task");  });
        this.pubScreenService.getSpecie().subscribe(data => { this.specieList = data; this.processList(this.specieList, "Other", "species"); });
        this.pubScreenService.getSex().subscribe(data => { this.sexList = data; });
        this.pubScreenService.getStrain().subscribe(data => { this.strainList = data; this.processList(this.strainList, "Other", "strain"); });
        this.pubScreenService.getDisease().subscribe(data => { this.diseaseList = data; this.processList(this.diseaseList, "Other", "diseaseModel"); });
        this.pubScreenService.getRegion().subscribe(data => { this.regionList = data; });
        this.pubScreenService.getCellType().subscribe(data => { this.cellTypeList = data; this.processList(this.cellTypeList, "Other", "cellType"); });
        this.pubScreenService.getMethod().subscribe(data => { this.methodList = data; this.processList(this.methodList, "Other", "method"); });
        this.pubScreenService.getNeurotransmitter().subscribe(data => { this.neurotransmitterList = data; this.processList(this.neurotransmitterList, "Other", "neuroTransmitter"); });
*/

        //this.pubScreenService.getAllYears().subscribe(data => { this.yearList = data; console.log(this.yearList); });
        //this.getAllYears();

        console.log(this.data);
        // if it is an Edit model
        /*if (this.data.publicationObj != null) {

            this.isEditMode = true;
            this.publicationId = this.data.publicationObj.id;

            this.spinnerService.show();

            this.pubScreenService.getPaperInfo(this.publicationId).subscribe(data => {
                this.paperInfo = data;

                this.doiModel = this.paperInfo.doi;
                this.keywordsModel = this.paperInfo.keywords;
                this.titleModel = this.paperInfo.title;
                this.abstractModel = this.paperInfo.abstract;
                this.yearModel = this.paperInfo.year;
                this.referenceModel = this.paperInfo.reference;

                this.authorModel = this.paperInfo.authourID;
                this.cellTypeModel = this.paperInfo.cellTypeID;
                this.diseaseModel = this.paperInfo.diseaseID;
                this.methodModel = this.paperInfo.methodID;
                this.paperTypeModel = this.paperInfo.paperType;
                this.regionModel = this.paperInfo.regionID;
                this.sexModel = this.paperInfo.sexID;
                this.specieModel = this.paperInfo.specieID;
                this.strainModel = this.paperInfo.strainID;

                this.pubScreenService.getRegionSubRegion().subscribe(dataSubRegion => {
                    this.selectedRegionChange(this.regionModel)
                    this.subRegionModel = this.paperInfo.subRegionID;
                });

                this.cognitiveTaskModel = this.paperInfo.taskID;
                this.neurotransmitterModel = this.paperInfo.transmitterID;

                this.sourceOptionModel = 3;

                this.setDisabledVal();

                this.spinnerService.hide();
            });




 
        }

        */

    }

    //ngAfterViewInit() {
    //    console.log("ngAfterViewInit");
    //}

    createUploadComponent() {
        const factory = this.resolver.resolveComponentFactory(CogbytesUploadComponent);
        const componentRef = this.entry.createComponent(factory);
        let childComponent = componentRef.instance;
        childComponent.uploadKey = ++this.child_unique_key;
        childComponent.parentRef = this;

        this.componentReferences.push(componentRef);
    }

    removeUploadComponent(key: number) {

        if (this.entry.length < 1) return;

        let componentRef = this.componentReferences.filter(
            x => x.instance.uploadKey == key
        )[0];

        let uploadIndex: number = this.entry.indexOf(componentRef as any);

        this.entry.remove(uploadIndex);

        this.componentReferences = this.componentReferences.filter(
            x => x.instance.uploadKey !== key
        );

    }


    // Function Definition to open a dialog for adding new cognitive task to the system
    //openDialogAuthor(): void {

    //    let dialogref = this.dialogAuthor.open(AuthorDialogeComponent, {
    //        height: '500px',
    //        width: '700px',
    //        data: {}

    //    });

    //    dialogref.afterClosed().subscribe(result => {

    //        this.GetAuthorList();

    //    });
    //}

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    //GetAuthorList() {

    //    //this.resetFormVals();

    //    this.pubScreenService.getAuthor().subscribe(data => {
    //        this.authorList = data;

    //        // load the initial expList
    //        this.filteredAutorList.next(this.authorList.slice());

    //        this.authorMultiFilterCtrl.valueChanges
    //            .pipe(takeUntil(this._onDestroy))
    //            .subscribe(() => {
    //                this.filterAuthor();
    //            });

    //    });

    //    return this.authorList;
    //}

    //// handling multi filtered Author list
    //private filterAuthor() {
    //    if (!this.authorList) {
    //        return;
    //    }

    //    // get the search keyword
    //    let searchAuthor = this.authorMultiFilterCtrl.value;

    //    if (!searchAuthor) {
    //        this.filteredAutorList.next(this.authorList.slice());
    //        return;
    //    } else {
    //        searchAuthor = searchAuthor.toLowerCase();
    //    }

    //    // filter the Author
    //    this.filteredAutorList.next(
    //        this.authorList.filter(x => x.lastName.toLowerCase().indexOf(searchAuthor) > -1)
    //    );
    //}



    //Form Validation Variables for adding publications
    //author = new FormControl('', [Validators.required]);
    //title = new FormControl('', [Validators.required]);
    //doi = new FormControl('', [Validators.required]);
    //pi = new FormControl('', [Validators.required]);
    //keywords = new FormControl('', [Validators.required]);
    //date = new FormControl('', [Validators.required]);
    //link = new FormControl('', [Validators.required]);
    //description = new FormControl('', [Validators.required]);
    //additionalNotes = new FormControl('', [Validators.required]);
    //privacyStatus = new FormControl('', [Validators.required]);

    // Handling Error for the required fields
    //getErrorMessageAuthor() {

    //    return this.author.hasError('required') ? 'You must enter a value' : '';
    //}

    //getErrorMessageTitle() {

    //    return this.title.hasError('required') ? 'You must enter a value' : '';
        
    //}

    //getErrorMessageDate() {
    //    return this.date.hasError('required') ? 'You must enter a value' : '';
    //}

    //getErrorMessageDateVal() {
    //    return this.date.hasError('pattern') ? 'You must enter a valid value' : '';
    //}

    //setDisabledVal() {

    //    if (this.authorModel === null && this.author.hasError('required')) {

    //        return true;
    //    }


    //    else if (
    //        this.title.hasError('required') ||
    //        this.privacyStatus.hasError('required') ||
    //        //this.cognitiveTask.hasError('required') ||
    //        this.date.hasError('required') ||
    //        this.date.hasError('pattern') ||
    //        //this.sourceOption.hasError('required')
    //        ((this.titleModel == null || this.titleModel == "") && this.title.hasError('required'))

    //    ) {

    //        return true;
    //    }

    //    else {

    //        return false;
    //    }

    //}


    //AddRepository() {
    //    if (this.authorModel !== null && this.authorModel.length !== 0) {
    //        this._cogbytes.authourID = this.authorModel;
    //        console.log(this.authorModel)
    //    }
    //    this._cogbytes.title = this.titleModel;
    //    this._cogbytes.keywords = this.keywordsModel;
    //    this._cogbytes.doi = this.doiModel;
    //}
/* **********************************************************************
    // Adding a new publication to DB by cliking on Submit button
   AddEditPublication() {

        if (!this.yearModel.match(/^(19|20)\d{2}$/)) {
            alert('year is not valid!');
            return;
        }

        if (this.authorModel !== null && this.authorModel.length !== 0) {
            this._pubscreen.authourID = this.authorModel;
            console.log(this.authorModel)
        }
        else {

            this._pubscreen.author = this.authorList2;
            this._pubscreen.authorString = this.authorModel2;
            console.log(this._pubscreen.author)
            console.log(this.authorList2);

        }

        if (this.paperTypeModel !== null) {
            this._pubscreen.paperType = this.paperTypeModel;
        }
        else {
            this._pubscreen.paperType = this.paperTypeModel2;
        }
        if (this.referenceModel !== null) {
            this._pubscreen.reference = this.referenceModel;
        }

        this._pubscreen.title = this.titleModel;
        this._pubscreen.abstract = this.abstractModel;
        this._pubscreen.keywords = this.keywordsModel;
        this._pubscreen.doi = this.doiModel;
        this._pubscreen.year = this.yearModel;
        this._pubscreen.taskID = this.cognitiveTaskModel;
        this._pubscreen.specieID = this.specieModel;
        this._pubscreen.sexID = this.sexModel;
        this._pubscreen.strainID = this.strainModel;
        this._pubscreen.diseaseID = this.diseaseModel;
        this._pubscreen.regionID = this.regionModel;
        this._pubscreen.subRegionID = this.subRegionModel;
        this._pubscreen.cellTypeID = this.cellTypeModel;
        this._pubscreen.methodID = this.methodModel;
        this._pubscreen.transmitterID = this.neurotransmitterModel;
        this._pubscreen.taskOther = this.taskOtherModel;
        this._pubscreen.specieOther = this.specieOtherModel;
        this._pubscreen.strainOther = this.strainOtherModel;
        this._pubscreen.diseaseOther = this.diseaseOtherModel;
        this._pubscreen.celltypeOther = this.cellOtherModel;
        this._pubscreen.methodOther = this.methodOtherModel;
        this._pubscreen.neurotransOther = this.neurotransmitterOtherModel;

                    

        switch (this.sourceOptionModel) {

            case 1: {
                this._pubscreen.source = 'pubMed';
                break;
            }
            case 2: {
                this._pubscreen.source = 'BioRxiv';
                break;
            }
            case 3: {
                this._pubscreen.source = 'None';
                break;
            }

        }

        if (this.isEditMode) {
            this.pubScreenService.EditPublication(this.publicationId, this._pubscreen).subscribe(data => {

                if (data === true) {
                    alert("Publication was successfully edited!");
                    this.thisDialogRef.close();
                } else {
                    alert("Error in editing publication! Please try again, if this happens again contact admin.")
                }
 
            });

        } else {
            this.pubScreenService.addPublication(this._pubscreen).subscribe(data => {

                if (data === null) {
                    alert("Publication with the same DOI exists in the database!");
                } else {
                    this.thisDialogRef.close();
                    alert("Publication was successfully added to the system!");
                }
                this.resetFormVals();

            });
        }

    }

*****************************/

    resetFormVals() {

        this.titleModel = '';
        this.keywordsModel = '';
        this.doiModel = '';
        this.dateModel = '';
        //this.authorModel = [];
        this.authorModel = '';
        this.doiKeyModel = '';
        this.descriptionModel = '';
        this.additionalNotesModel = '';
        this.linkModel = '';
        this.piModel = '';
    }


    processList(data, item, propertyName) {

        const ret = data.filter(row => (row[propertyName] === item));
        if (ret.length > 0) {
            data.splice(data.findIndex(row => (row[propertyName] === item)), 1);
            data.push(ret[0])
        }
        
        return data
    }
    
}