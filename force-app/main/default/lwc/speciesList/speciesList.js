import { LightningElement, wire, track} from 'lwc';
import getAllSpecies from "@salesforce/apex/speciesService.getAllSpecies";
import { createRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import SPECIES_OBJECT from '@salesforce/schema/Species__c';
import NAME_FIELD from '@salesforce/schema/Species__c.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/Species__c.Description__c';
import DIET_FIELD from '@salesforce/schema/Species__c.Diet__c';
import IMAGE_FIELD from '@salesforce/schema/Species__c.Image_url__c';
import CHAR_FIELD from '@salesforce/schema/Species__c.Characteristics__c';

export default class SpeciesList extends LightningElement {
    loading = false;
    @wire(getAllSpecies)
    species;

    fieldsForm = {
        Name: '',
        Description: '',
        Diet: '',
        Image: '',
        Characteristics: ''
    }

       @track isModalOpen = false;
       openModal() {
           this.isModalOpen = true;
       }
       closeModal() {
           this.isModalOpen = false;
    }

/*    handleChange(event) {
        const {value, name} = event.target
        this.fieldsForm = { ...this.fieldsForm, [name]:value}
    }
*/
    handleChangeName(event) {
        this.fieldsForm.Name = event.target.value
    }
    handleChangeDescription(event) {
        this.fieldsForm.Description = event.target.value
    }
    handleChangeDiet(event) {
        this.fieldsForm.Diet = event.target.value
    }
    handleChangeImage(event) {
        this.fieldsForm.Image = event.target.value
    }
    handleChangeChar(event) {
        this.fieldsForm.Characteristics = event.target.value
    }

       saveRecord() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.fieldsForm.Name;
        fields[DESCRIPTION_FIELD.fieldApiName] = this.fieldsForm.Description;
        fields[DIET_FIELD.fieldApiName] = this.fieldsForm.Diet;
        fields[IMAGE_FIELD.fieldApiName] = this.fieldsForm.Image;
        fields[CHAR_FIELD.fieldApiName] = this.fieldsForm.Characteristics;
        const recordInput = { apiName: SPECIES_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(result => {
                this.fieldsForm = {}
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Specie created ' + fields[NAME_FIELD.fieldApiName],
                        variant: 'success',
                    }),
                );
                this.loading = true;
                setTimeout(() => {
                    refreshApex(this.species);
                   this.loading = false;
                 }, 200)
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
           // to close modal set isModalOpen tarck value as false
           //Add your code to call apex method or do some processing
           this.isModalOpen = false;
       }
     
}