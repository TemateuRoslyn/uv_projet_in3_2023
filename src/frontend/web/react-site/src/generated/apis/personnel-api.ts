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
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
<<<<<<< HEAD
import { InlineResponse20058 } from '../models';
import { InlineResponse20059 } from '../models';
import { InlineResponse20060 } from '../models';
import { InlineResponse20061 } from '../models';
=======
import { InlineResponse20057 } from '../models';
import { InlineResponse20058 } from '../models';
import { InlineResponse20059 } from '../models';
import { InlineResponse20060 } from '../models';
>>>>>>> 65dfea4 (Closes #299 - admin api integrated)
import { InlineResponse2018 } from '../models';
import { InlineResponse40022 } from '../models';
import { InlineResponse40023 } from '../models';
import { InlineResponse401 } from '../models';
import { InlineResponse40427 } from '../models';
import { InlineResponse40428 } from '../models';
import { InlineResponse40429 } from '../models';
import { InlineResponse4222 } from '../models';
/**
 * PersonnelApi - axios parameter creator
 * @export
 */
export const PersonnelApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a new personel resource
         * @summary Create a new personel
         * @param {string} email 
         * @param {string} firstName 
         * @param {string} lastName 
         * @param {string} dateDeNaissance 
         * @param {string} lieuDeNaissance 
         * @param {string} photo 
         * @param {string} sexe 
         * @param {string} telephone 
         * @param {string} fonction 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createPersonnel: async (email: string, firstName: string, lastName: string, dateDeNaissance: string, lieuDeNaissance: string, photo: string, sexe: string, telephone: string, fonction: string, authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'email' is not null or undefined
            if (email === null || email === undefined) {
                throw new RequiredError('email','Required parameter email was null or undefined when calling createPersonnel.');
            }
            // verify required parameter 'firstName' is not null or undefined
            if (firstName === null || firstName === undefined) {
                throw new RequiredError('firstName','Required parameter firstName was null or undefined when calling createPersonnel.');
            }
            // verify required parameter 'lastName' is not null or undefined
            if (lastName === null || lastName === undefined) {
                throw new RequiredError('lastName','Required parameter lastName was null or undefined when calling createPersonnel.');
            }
            // verify required parameter 'dateDeNaissance' is not null or undefined
            if (dateDeNaissance === null || dateDeNaissance === undefined) {
                throw new RequiredError('dateDeNaissance','Required parameter dateDeNaissance was null or undefined when calling createPersonnel.');
            }
            // verify required parameter 'lieuDeNaissance' is not null or undefined
            if (lieuDeNaissance === null || lieuDeNaissance === undefined) {
                throw new RequiredError('lieuDeNaissance','Required parameter lieuDeNaissance was null or undefined when calling createPersonnel.');
            }
            // verify required parameter 'photo' is not null or undefined
            if (photo === null || photo === undefined) {
                throw new RequiredError('photo','Required parameter photo was null or undefined when calling createPersonnel.');
            }
            // verify required parameter 'sexe' is not null or undefined
            if (sexe === null || sexe === undefined) {
                throw new RequiredError('sexe','Required parameter sexe was null or undefined when calling createPersonnel.');
            }
            // verify required parameter 'telephone' is not null or undefined
            if (telephone === null || telephone === undefined) {
                throw new RequiredError('telephone','Required parameter telephone was null or undefined when calling createPersonnel.');
            }
            // verify required parameter 'fonction' is not null or undefined
            if (fonction === null || fonction === undefined) {
                throw new RequiredError('fonction','Required parameter fonction was null or undefined when calling createPersonnel.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling createPersonnel.');
            }
            const localVarPath = `/api/personnel/create`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new FormData();

            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }


            if (email !== undefined) { 
                localVarFormParams.append('email', email as any);
            }

            if (firstName !== undefined) { 
                localVarFormParams.append('firstName', firstName as any);
            }

            if (lastName !== undefined) { 
                localVarFormParams.append('lastName', lastName as any);
            }

            if (dateDeNaissance !== undefined) { 
                localVarFormParams.append('dateDeNaissance', dateDeNaissance as any);
            }

            if (lieuDeNaissance !== undefined) { 
                localVarFormParams.append('lieuDeNaissance', lieuDeNaissance as any);
            }

            if (photo !== undefined) { 
                localVarFormParams.append('photo', photo as any);
            }

            if (sexe !== undefined) { 
                localVarFormParams.append('sexe', sexe as any);
            }

            if (telephone !== undefined) { 
                localVarFormParams.append('telephone', telephone as any);
            }

            if (fonction !== undefined) { 
                localVarFormParams.append('fonction', fonction as any);
            }

            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Delete a personel resource
         * @summary Delete a personel
         * @param {string} authorization JWT token
         * @param {number} id ID of personel to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deletePersonnel: async (authorization: string, id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling deletePersonnel.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deletePersonnel.');
            }
            const localVarPath = `/api/personnel/delete/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Retrieve a list of all personels
         * @summary Get all personels
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        personelIndex: async (authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling personelIndex.');
            }
            const localVarPath = `/api/personnel/findAll`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Update a personel's information
         * @summary Update a personel's information
         * @param {string} email 
         * @param {string} firstName 
         * @param {string} lastName 
         * @param {string} dateDeNaissance 
         * @param {string} lieuDeNaissance 
         * @param {string} photo 
         * @param {string} sexe 
         * @param {string} telephone 
         * @param {string} fonction 
         * @param {string} authorization JWT token
         * @param {number} personnelId ID of personel to update in this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatePersonnel: async (email: string, firstName: string, lastName: string, dateDeNaissance: string, lieuDeNaissance: string, photo: string, sexe: string, telephone: string, fonction: string, authorization: string, personnelId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'email' is not null or undefined
            if (email === null || email === undefined) {
                throw new RequiredError('email','Required parameter email was null or undefined when calling updatePersonnel.');
            }
            // verify required parameter 'firstName' is not null or undefined
            if (firstName === null || firstName === undefined) {
                throw new RequiredError('firstName','Required parameter firstName was null or undefined when calling updatePersonnel.');
            }
            // verify required parameter 'lastName' is not null or undefined
            if (lastName === null || lastName === undefined) {
                throw new RequiredError('lastName','Required parameter lastName was null or undefined when calling updatePersonnel.');
            }
            // verify required parameter 'dateDeNaissance' is not null or undefined
            if (dateDeNaissance === null || dateDeNaissance === undefined) {
                throw new RequiredError('dateDeNaissance','Required parameter dateDeNaissance was null or undefined when calling updatePersonnel.');
            }
            // verify required parameter 'lieuDeNaissance' is not null or undefined
            if (lieuDeNaissance === null || lieuDeNaissance === undefined) {
                throw new RequiredError('lieuDeNaissance','Required parameter lieuDeNaissance was null or undefined when calling updatePersonnel.');
            }
            // verify required parameter 'photo' is not null or undefined
            if (photo === null || photo === undefined) {
                throw new RequiredError('photo','Required parameter photo was null or undefined when calling updatePersonnel.');
            }
            // verify required parameter 'sexe' is not null or undefined
            if (sexe === null || sexe === undefined) {
                throw new RequiredError('sexe','Required parameter sexe was null or undefined when calling updatePersonnel.');
            }
            // verify required parameter 'telephone' is not null or undefined
            if (telephone === null || telephone === undefined) {
                throw new RequiredError('telephone','Required parameter telephone was null or undefined when calling updatePersonnel.');
            }
            // verify required parameter 'fonction' is not null or undefined
            if (fonction === null || fonction === undefined) {
                throw new RequiredError('fonction','Required parameter fonction was null or undefined when calling updatePersonnel.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling updatePersonnel.');
            }
            // verify required parameter 'personnelId' is not null or undefined
            if (personnelId === null || personnelId === undefined) {
                throw new RequiredError('personnelId','Required parameter personnelId was null or undefined when calling updatePersonnel.');
            }
            const localVarPath = `/api/personnel/update/{personnelId}`
                .replace(`{${"personnelId"}}`, encodeURIComponent(String(personnelId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new FormData();

            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }


            if (email !== undefined) { 
                localVarFormParams.append('email', email as any);
            }

            if (firstName !== undefined) { 
                localVarFormParams.append('firstName', firstName as any);
            }

            if (lastName !== undefined) { 
                localVarFormParams.append('lastName', lastName as any);
            }

            if (dateDeNaissance !== undefined) { 
                localVarFormParams.append('dateDeNaissance', dateDeNaissance as any);
            }

            if (lieuDeNaissance !== undefined) { 
                localVarFormParams.append('lieuDeNaissance', lieuDeNaissance as any);
            }

            if (photo !== undefined) { 
                localVarFormParams.append('photo', photo as any);
            }

            if (sexe !== undefined) { 
                localVarFormParams.append('sexe', sexe as any);
            }

            if (telephone !== undefined) { 
                localVarFormParams.append('telephone', telephone as any);
            }

            if (fonction !== undefined) { 
                localVarFormParams.append('fonction', fonction as any);
            }

            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get information about a specific personel
         * @summary Get personel information
         * @param {string} authorization JWT token
         * @param {number} personnelId ID of the personel to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewPersonnel: async (authorization: string, personnelId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling viewPersonnel.');
            }
            // verify required parameter 'personnelId' is not null or undefined
            if (personnelId === null || personnelId === undefined) {
                throw new RequiredError('personnelId','Required parameter personnelId was null or undefined when calling viewPersonnel.');
            }
            const localVarPath = `/api/personnel/findOne/{id}`
                .replace(`{${"personnelId"}}`, encodeURIComponent(String(personnelId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PersonnelApi - functional programming interface
 * @export
 */
export const PersonnelApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Create a new personel resource
         * @summary Create a new personel
         * @param {string} email 
         * @param {string} firstName 
         * @param {string} lastName 
         * @param {string} dateDeNaissance 
         * @param {string} lieuDeNaissance 
         * @param {string} photo 
         * @param {string} sexe 
         * @param {string} telephone 
         * @param {string} fonction 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createPersonnel(email: string, firstName: string, lastName: string, dateDeNaissance: string, lieuDeNaissance: string, photo: string, sexe: string, telephone: string, fonction: string, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2018>> {
            const localVarAxiosArgs = await PersonnelApiAxiosParamCreator(configuration).createPersonnel(email, firstName, lastName, dateDeNaissance, lieuDeNaissance, photo, sexe, telephone, fonction, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Delete a personel resource
         * @summary Delete a personel
         * @param {string} authorization JWT token
         * @param {number} id ID of personel to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
        async deletePersonnel(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20061>> {
=======
        async deletePersonnel(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20060>> {
>>>>>>> 65dfea4 (Closes #299 - admin api integrated)
            const localVarAxiosArgs = await PersonnelApiAxiosParamCreator(configuration).deletePersonnel(authorization, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieve a list of all personels
         * @summary Get all personels
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
        async personelIndex(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20058>> {
=======
        async personelIndex(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20057>> {
>>>>>>> 65dfea4 (Closes #299 - admin api integrated)
            const localVarAxiosArgs = await PersonnelApiAxiosParamCreator(configuration).personelIndex(authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update a personel's information
         * @summary Update a personel's information
         * @param {string} email 
         * @param {string} firstName 
         * @param {string} lastName 
         * @param {string} dateDeNaissance 
         * @param {string} lieuDeNaissance 
         * @param {string} photo 
         * @param {string} sexe 
         * @param {string} telephone 
         * @param {string} fonction 
         * @param {string} authorization JWT token
         * @param {number} personnelId ID of personel to update in this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
        async updatePersonnel(email: string, firstName: string, lastName: string, dateDeNaissance: string, lieuDeNaissance: string, photo: string, sexe: string, telephone: string, fonction: string, authorization: string, personnelId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20060>> {
=======
        async updatePersonnel(email: string, firstName: string, lastName: string, dateDeNaissance: string, lieuDeNaissance: string, photo: string, sexe: string, telephone: string, fonction: string, authorization: string, personnelId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20059>> {
>>>>>>> 65dfea4 (Closes #299 - admin api integrated)
            const localVarAxiosArgs = await PersonnelApiAxiosParamCreator(configuration).updatePersonnel(email, firstName, lastName, dateDeNaissance, lieuDeNaissance, photo, sexe, telephone, fonction, authorization, personnelId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get information about a specific personel
         * @summary Get personel information
         * @param {string} authorization JWT token
         * @param {number} personnelId ID of the personel to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
        async viewPersonnel(authorization: string, personnelId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20059>> {
=======
        async viewPersonnel(authorization: string, personnelId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20058>> {
>>>>>>> 65dfea4 (Closes #299 - admin api integrated)
            const localVarAxiosArgs = await PersonnelApiAxiosParamCreator(configuration).viewPersonnel(authorization, personnelId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * PersonnelApi - factory interface
 * @export
 */
export const PersonnelApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Create a new personel resource
         * @summary Create a new personel
         * @param {string} email 
         * @param {string} firstName 
         * @param {string} lastName 
         * @param {string} dateDeNaissance 
         * @param {string} lieuDeNaissance 
         * @param {string} photo 
         * @param {string} sexe 
         * @param {string} telephone 
         * @param {string} fonction 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createPersonnel(email: string, firstName: string, lastName: string, dateDeNaissance: string, lieuDeNaissance: string, photo: string, sexe: string, telephone: string, fonction: string, authorization: string, options?: any): AxiosPromise<InlineResponse2018> {
            return PersonnelApiFp(configuration).createPersonnel(email, firstName, lastName, dateDeNaissance, lieuDeNaissance, photo, sexe, telephone, fonction, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete a personel resource
         * @summary Delete a personel
         * @param {string} authorization JWT token
         * @param {number} id ID of personel to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
        deletePersonnel(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20061> {
=======
        deletePersonnel(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20060> {
>>>>>>> 65dfea4 (Closes #299 - admin api integrated)
            return PersonnelApiFp(configuration).deletePersonnel(authorization, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieve a list of all personels
         * @summary Get all personels
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
        personelIndex(authorization: string, options?: any): AxiosPromise<InlineResponse20058> {
=======
        personelIndex(authorization: string, options?: any): AxiosPromise<InlineResponse20057> {
>>>>>>> 65dfea4 (Closes #299 - admin api integrated)
            return PersonnelApiFp(configuration).personelIndex(authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Update a personel's information
         * @summary Update a personel's information
         * @param {string} email 
         * @param {string} firstName 
         * @param {string} lastName 
         * @param {string} dateDeNaissance 
         * @param {string} lieuDeNaissance 
         * @param {string} photo 
         * @param {string} sexe 
         * @param {string} telephone 
         * @param {string} fonction 
         * @param {string} authorization JWT token
         * @param {number} personnelId ID of personel to update in this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
        updatePersonnel(email: string, firstName: string, lastName: string, dateDeNaissance: string, lieuDeNaissance: string, photo: string, sexe: string, telephone: string, fonction: string, authorization: string, personnelId: number, options?: any): AxiosPromise<InlineResponse20060> {
=======
        updatePersonnel(email: string, firstName: string, lastName: string, dateDeNaissance: string, lieuDeNaissance: string, photo: string, sexe: string, telephone: string, fonction: string, authorization: string, personnelId: number, options?: any): AxiosPromise<InlineResponse20059> {
>>>>>>> 65dfea4 (Closes #299 - admin api integrated)
            return PersonnelApiFp(configuration).updatePersonnel(email, firstName, lastName, dateDeNaissance, lieuDeNaissance, photo, sexe, telephone, fonction, authorization, personnelId, options).then((request) => request(axios, basePath));
        },
        /**
         * Get information about a specific personel
         * @summary Get personel information
         * @param {string} authorization JWT token
         * @param {number} personnelId ID of the personel to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
        viewPersonnel(authorization: string, personnelId: number, options?: any): AxiosPromise<InlineResponse20059> {
=======
        viewPersonnel(authorization: string, personnelId: number, options?: any): AxiosPromise<InlineResponse20058> {
>>>>>>> 65dfea4 (Closes #299 - admin api integrated)
            return PersonnelApiFp(configuration).viewPersonnel(authorization, personnelId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PersonnelApi - object-oriented interface
 * @export
 * @class PersonnelApi
 * @extends {BaseAPI}
 */
export class PersonnelApi extends BaseAPI {
    /**
     * Create a new personel resource
     * @summary Create a new personel
     * @param {string} email 
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {string} dateDeNaissance 
     * @param {string} lieuDeNaissance 
     * @param {string} photo 
     * @param {string} sexe 
     * @param {string} telephone 
     * @param {string} fonction 
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PersonnelApi
     */
    public createPersonnel(email: string, firstName: string, lastName: string, dateDeNaissance: string, lieuDeNaissance: string, photo: string, sexe: string, telephone: string, fonction: string, authorization: string, options?: any) {
        return PersonnelApiFp(this.configuration).createPersonnel(email, firstName, lastName, dateDeNaissance, lieuDeNaissance, photo, sexe, telephone, fonction, authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Delete a personel resource
     * @summary Delete a personel
     * @param {string} authorization JWT token
     * @param {number} id ID of personel to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PersonnelApi
     */
    public deletePersonnel(authorization: string, id: number, options?: any) {
        return PersonnelApiFp(this.configuration).deletePersonnel(authorization, id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Retrieve a list of all personels
     * @summary Get all personels
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PersonnelApi
     */
    public personelIndex(authorization: string, options?: any) {
        return PersonnelApiFp(this.configuration).personelIndex(authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update a personel's information
     * @summary Update a personel's information
     * @param {string} email 
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {string} dateDeNaissance 
     * @param {string} lieuDeNaissance 
     * @param {string} photo 
     * @param {string} sexe 
     * @param {string} telephone 
     * @param {string} fonction 
     * @param {string} authorization JWT token
     * @param {number} personnelId ID of personel to update in this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PersonnelApi
     */
    public updatePersonnel(email: string, firstName: string, lastName: string, dateDeNaissance: string, lieuDeNaissance: string, photo: string, sexe: string, telephone: string, fonction: string, authorization: string, personnelId: number, options?: any) {
        return PersonnelApiFp(this.configuration).updatePersonnel(email, firstName, lastName, dateDeNaissance, lieuDeNaissance, photo, sexe, telephone, fonction, authorization, personnelId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get information about a specific personel
     * @summary Get personel information
     * @param {string} authorization JWT token
     * @param {number} personnelId ID of the personel to get information for
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PersonnelApi
     */
    public viewPersonnel(authorization: string, personnelId: number, options?: any) {
        return PersonnelApiFp(this.configuration).viewPersonnel(authorization, personnelId, options).then((request) => request(this.axios, this.basePath));
    }
}
