import { LightningElement,api,track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class SpeciesType extends NavigationMixin(LightningElement) {
    @api specie;
    isViewMode = true;
    fields = [{name: 'Description__c', label: 'Description'}]
    
    // switching between view and edit modes    
    switchForm(){
        this.isViewMode = !this.isViewMode;
    }

    // change to view form mode
    handleSuccess(){
        this.switchForm();
    }
    
    handleError(event){
        console.log('Error updating specie record:'+ JSON.stringify(event));
    }

    get Seeds(){
        return this.specie.Diet__c.includes("Seeds");
    }

    get Bugs(){
        return this.specie.Diet__c.includes("Bugs");
    }

    navigateToRecordViewPage(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.specie.Id,
                objectApiName: 'Species__c',
                actionName: 'view'
            }
        })
    }

}
