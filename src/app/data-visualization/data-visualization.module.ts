import { NgModule } from '@angular/core';
import { DataVisualizationRoutingModule } from './data-visualization-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DataVisualizationComponent } from './data-visualization.component';
import { DataExtractionService } from '../services/dataextraction.service'

@NgModule({
    imports: [
        DataVisualizationRoutingModule,
        SharedModule,
        //MatSelectModule,
        

    ],
    declarations: [
        DataVisualizationComponent,
        
    ],
    providers: [
        DataExtractionService,
        
    ],
    bootstrap: [DataVisualizationComponent],
    

})
export class DataVisualizationModule { } 

