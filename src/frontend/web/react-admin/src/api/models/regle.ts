/* tslint:disable */
/* eslint-disable */
/**
 * Mon API
 * Documentation de l'API de votre application.
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/**
 * 
 * @export
 * @interface Regle
 */
export interface Regle {
    /**
     * 
     * @type {number}
     * @memberof Regle
     */
    id?: any;
    /**
     * 
     * @type {number}
     * @memberof Regle
     */
    reglementInterieurId: any;
    /**
     * Une regle
     * @type {string}
     * @memberof Regle
     */
    libelle: any;
    /**
     * 
     * @type {ReglementInterieur}
     * @memberof Regle
     */
    reglementInterieur?: any;
    /**
     * 
     * @type {BaseModelpropertiescreatedAt}
     * @memberof Regle
     */
    createdAt?: any;
    /**
     * 
     * @type {BaseModelpropertiesupdatedAt}
     * @memberof Regle
     */
    updatedAt?: any;
    /**
     * 
     * @type {BaseModelpropertiesdeletedAt}
     * @memberof Regle
     */
    deletedAt?: any;
}
