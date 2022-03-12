import { LightningElement, api } from 'lwc';
import fetchFieldsList from '@salesforce/apex/SFDC_ResuableFieldSetController.fetchFieldsList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Lwc_DynamicForm extends LightningElement {
    @api objectApiName;
    @api fieldSetApiName;
    @api buttonName;
    error;
    fieldList;
    showButton = true ;
    showForm  = false;
    recordIdCreated;
    connectedCallback() {
        // Apex class call to display available cases 
        fetchFieldsList({ objectAPIName: this.objectApiName, fieldSetAPIName: this.fieldSetApiName })
            .then((result) => {
                this.fieldList = result;
            })
            .catch((error) => {
                this.error = error;
            });
    }

    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.showForm = false;
        this.showButton = true ;
    }
    createRecord(){
        this.showForm = true;
        this.showButton = false ;  
    }
    
    handleSuccess(event) {
        this.recordIdCreated = event.detail.id;
        this.handleMessage('Record Created', +this.recordIdCreated+ ' Record has been created Sucessfully', 'success');
        this.showForm = false;
    }
    handleMessage(titles , messages , variants) {
        const evt = new ShowToastEvent({
            title: titles,
            message: messages,
            variant: variants,
        });
        this.dispatchEvent(evt);
    }

}