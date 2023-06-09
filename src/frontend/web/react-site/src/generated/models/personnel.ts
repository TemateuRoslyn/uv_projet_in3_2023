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
 * @interface Personnel
 */
export interface Personnel {
    /**
     * 
     * @type {number}
     * @memberof Personnel
     */
    id?: any;
    /**
     * User role
     * @type {string}
     * @memberof Personnel
     */
    role?: any;
    /**
     * 
     * @type {string}
     * @memberof Personnel
     */
    firstName: any;
    /**
     * 
     * @type {string}
     * @memberof Personnel
     */
    lastName: any;
    /**
     * 
     * @type {string}
     * @memberof Personnel
     */
    dateDeNaissance: any;
    /**
     * 
     * @type {string}
     * @memberof Personnel
     */
    lieuDeNaissance: any;
    /**
     * 
     * @type {string}
     * @memberof Personnel
     */
    photo: any;
    /**
     * 
     * @type {string}
     * @memberof Personnel
     */
    sexe: any;
    /**
     * 
     * @type {string}
     * @memberof Personnel
     */
    telephone: any;
    /**
     * 
     * @type {string}
     * @memberof Personnel
     */
    fonction: any;
    /**
     * 
     * @type {User}
     * @memberof Personnel
     */
    user?: any;
    /**
     * 
     * @type {BaseModelpropertiescreatedAt}
     * @memberof Personnel
     */
    createdAt?: any;
    /**
     * 
     * @type {BaseModelpropertiesupdatedAt}
     * @memberof Personnel
     */
    updatedAt?: any;
    /**
     * 
     * @type {BaseModelpropertiesdeletedAt}
     * @memberof Personnel
     */
    deletedAt?: any;
}
