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
 * @interface Notification
 */
export interface Notification {
    /**
     * 
     * @type {number}
     * @memberof Notification
     */
    id?: any;
    /**
     * 
     * @type {string}
     * @memberof Notification
     */
    libelle: any;
    /**
     * 
     * @type {number}
     * @memberof Notification
     */
    view: any;
    /**
     * 
     * @type {User}
     * @memberof Notification
     */
    user?: any;
    /**
     * 
     * @type {BaseModelpropertiescreatedAt}
     * @memberof Notification
     */
    createdAt?: any;
    /**
     * 
     * @type {BaseModelpropertiesupdatedAt}
     * @memberof Notification
     */
    updatedAt?: any;
    /**
     * 
     * @type {BaseModelpropertiesdeletedAt}
     * @memberof Notification
     */
    deletedAt?: any;
}
