public with sharing class speciesService {
    @AuraEnabled(cacheable=true)
    public static List<Species__c> getAllSpecies(){
        return [SELECT Id, Name, Description__c, Image_url__c, Diet__c, Characteristics__c FROM Species__c];
    }
}
