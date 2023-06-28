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
import { InlineResponse20018 } from '../models';
import { InlineResponse20019 } from '../models';
import { InlineResponse20020 } from '../models';
import { InlineResponse20021 } from '../models';
import { InlineResponse2012 } from '../models';
import { InlineResponse4008 } from '../models';
import { InlineResponse4009 } from '../models';
import { InlineResponse401 } from '../models';
import { InlineResponse4043 } from '../models';
import { InlineResponse4044 } from '../models';
import { InlineResponse4045 } from '../models';
import { InlineResponse4221 } from '../models';
/**
 * ElevesApi - axios parameter creator
 * @export
 */
export const ElevesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a new eleve resource
         * @summary Create a new eleve
         * @param {string} email 
         * @param {string} firstName 
         * @param {string} lastName 
         * @param {string} dateDeNaissance 
         * @param {string} lieuDeNaissance 
         * @param {string} photo 
         * @param {string} sexe 
         * @param {string} telephone 
         * @param {boolean} solvable 
         * @param {boolean} redoublant 
         * @param {number} classeId 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEleve: async (email: string, firstName: string, lastName: string, dateDeNaissance: string, lieuDeNaissance: string, photo: string, sexe: string, telephone: string, solvable: boolean, redoublant: boolean, classeId: number, authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'email' is not null or undefined
            if (email === null || email === undefined) {
                throw new RequiredError('email','Required parameter email was null or undefined when calling createEleve.');
            }
            // verify required parameter 'firstName' is not null or undefined
            if (firstName === null || firstName === undefined) {
                throw new RequiredError('firstName','Required parameter firstName was null or undefined when calling createEleve.');
            }
            // verify required parameter 'lastName' is not null or undefined
            if (lastName === null || lastName === undefined) {
                throw new RequiredError('lastName','Required parameter lastName was null or undefined when calling createEleve.');
            }
            // verify required parameter 'dateDeNaissance' is not null or undefined
            if (dateDeNaissance === null || dateDeNaissance === undefined) {
                throw new RequiredError('dateDeNaissance','Required parameter dateDeNaissance was null or undefined when calling createEleve.');
            }
            // verify required parameter 'lieuDeNaissance' is not null or undefined
            if (lieuDeNaissance === null || lieuDeNaissance === undefined) {
                throw new RequiredError('lieuDeNaissance','Required parameter lieuDeNaissance was null or undefined when calling createEleve.');
            }
            // verify required parameter 'photo' is not null or undefined
            if (photo === null || photo === undefined) {
                throw new RequiredError('photo','Required parameter photo was null or undefined when calling createEleve.');
            }
            // verify required parameter 'sexe' is not null or undefined
            if (sexe === null || sexe === undefined) {
                throw new RequiredError('sexe','Required parameter sexe was null or undefined when calling createEleve.');
            }
            // verify required parameter 'telephone' is not null or undefined
            if (telephone === null || telephone === undefined) {
                throw new RequiredError('telephone','Required parameter telephone was null or undefined when calling createEleve.');
            }
            // verify required parameter 'solvable' is not null or undefined
            if (solvable === null || solvable === undefined) {
                throw new RequiredError('solvable','Required parameter solvable was null or undefined when calling createEleve.');
            }
            // verify required parameter 'redoublant' is not null or undefined
            if (redoublant === null || redoublant === undefined) {
                throw new RequiredError('redoublant','Required parameter redoublant was null or undefined when calling createEleve.');
            }
            // verify required parameter 'classeId' is not null or undefined
            if (classeId === null || classeId === undefined) {
                throw new RequiredError('classeId','Required parameter classeId was null or undefined when calling createEleve.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling createEleve.');
            }
            const localVarPath = `/api/eleves/create`;
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

            if (solvable !== undefined) { 
                localVarFormParams.append('solvable', solvable as any);
            }

            if (redoublant !== undefined) { 
                localVarFormParams.append('redoublant', redoublant as any);
            }

            if (classeId !== undefined) { 
                localVarFormParams.append('classeId', classeId as any);
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
         * Delete an eleve resource
         * @summary Delete an eleve
         * @param {string} authorization JWT token
         * @param {number} id ID of eleve to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteEleve: async (authorization: string, id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling deleteEleve.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteEleve.');
            }
            const localVarPath = `/api/eleves/delete/{id}`
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
         * Retrieve a list of all eleves
         * @summary Get all eleves
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        elevesIndex: async (authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling elevesIndex.');
            }
            const localVarPath = `/api/eleves/findAll`;
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
         * Update a eleve's information
         * @summary Update a eleve's information
         * @param {string} email 
         * @param {string} firstName 
         * @param {string} lastName 
         * @param {string} dateDeNaissance 
         * @param {string} lieuDeNaissance 
         * @param {string} photo 
         * @param {string} sexe 
         * @param {string} telephone 
         * @param {boolean} solvable 
         * @param {boolean} redoublant 
         * @param {number} classeId 
         * @param {string} authorization JWT token
         * @param {number} eleveId ID of eleve to update in this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateEleve: async (email: string, firstName: string, lastName: string, dateDeNaissance: string, lieuDeNaissance: string, photo: string, sexe: string, telephone: string, solvable: boolean, redoublant: boolean, classeId: number, authorization: string, eleveId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'email' is not null or undefined
            if (email === null || email === undefined) {
                throw new RequiredError('email','Required parameter email was null or undefined when calling updateEleve.');
            }
            // verify required parameter 'firstName' is not null or undefined
            if (firstName === null || firstName === undefined) {
                throw new RequiredError('firstName','Required parameter firstName was null or undefined when calling updateEleve.');
            }
            // verify required parameter 'lastName' is not null or undefined
            if (lastName === null || lastName === undefined) {
                throw new RequiredError('lastName','Required parameter lastName was null or undefined when calling updateEleve.');
            }
            // verify required parameter 'dateDeNaissance' is not null or undefined
            if (dateDeNaissance === null || dateDeNaissance === undefined) {
                throw new RequiredError('dateDeNaissance','Required parameter dateDeNaissance was null or undefined when calling updateEleve.');
            }
            // verify required parameter 'lieuDeNaissance' is not null or undefined
            if (lieuDeNaissance === null || lieuDeNaissance === undefined) {
                throw new RequiredError('lieuDeNaissance','Required parameter lieuDeNaissance was null or undefined when calling updateEleve.');
            }
            // verify required parameter 'photo' is not null or undefined
            if (photo === null || photo === undefined) {
                throw new RequiredError('photo','Required parameter photo was null or undefined when calling updateEleve.');
            }
            // verify required parameter 'sexe' is not null or undefined
            if (sexe === null || sexe === undefined) {
                throw new RequiredError('sexe','Required parameter sexe was null or undefined when calling updateEleve.');
            }
            // verify required parameter 'telephone' is not null or undefined
            if (telephone === null || telephone === undefined) {
                throw new RequiredError('telephone','Required parameter telephone was null or undefined when calling updateEleve.');
            }
            // verify required parameter 'solvable' is not null or undefined
            if (solvable === null || solvable === undefined) {
                throw new RequiredError('solvable','Required parameter solvable was null or undefined when calling updateEleve.');
            }
            // verify required parameter 'redoublant' is not null or undefined
            if (redoublant === null || redoublant === undefined) {
                throw new RequiredError('redoublant','Required parameter redoublant was null or undefined when calling updateEleve.');
            }
            // verify required parameter 'classeId' is not null or undefined
            if (classeId === null || classeId === undefined) {
                throw new RequiredError('classeId','Required parameter classeId was null or undefined when calling updateEleve.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling updateEleve.');
            }
            // verify required parameter 'eleveId' is not null or undefined
            if (eleveId === null || eleveId === undefined) {
                throw new RequiredError('eleveId','Required parameter eleveId was null or undefined when calling updateEleve.');
            }
            const localVarPath = `/api/eleves/update/{eleveId}`
                .replace(`{${"eleveId"}}`, encodeURIComponent(String(eleveId)));
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

            if (solvable !== undefined) { 
                localVarFormParams.append('solvable', solvable as any);
            }

            if (redoublant !== undefined) { 
                localVarFormParams.append('redoublant', redoublant as any);
            }

            if (classeId !== undefined) { 
                localVarFormParams.append('classeId', classeId as any);
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
         * Get information about a specific eleve
         * @summary Get eleve information
         * @param {string} authorization JWT token
         * @param {number} id ID of eleve to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewEleve: async (authorization: string, id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling viewEleve.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling viewEleve.');
            }
            const localVarPath = `/api/eleves/findOne/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
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
 * ElevesApi - functional programming interface
 * @export
 */
export const ElevesApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Create a new eleve resource
         * @summary Create a new eleve
         * @param {string} email 
         * @param {string} firstName 
         * @param {string} lastName 
         * @param {string} dateDeNaissance 
         * @param {string} lieuDeNaissance 
         * @param {string} photo 
         * @param {string} sexe 
         * @param {string} telephone 
         * @param {boolean} solvable 
         * @param {boolean} redoublant 
         * @param {number} classeId 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createEleve(email: string, firstName: string, lastName: string, dateDeNaissance: string, lieuDeNaissance: string, photo: string, sexe: string, telephone: string, solvable: boolean, redoublant: boolean, classeId: number, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2012>> {
            const localVarAxiosArgs = await ElevesApiAxiosParamCreator(configuration).createEleve(email, firstName, lastName, dateDeNaissance, lieuDeNaissance, photo, sexe, telephone, solvable, redoublant, classeId, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Delete an eleve resource
         * @summary Delete an eleve
         * @param {string} authorization JWT token
         * @param {number} id ID of eleve to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteEleve(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20021>> {
            const localVarAxiosArgs = await ElevesApiAxiosParamCreator(configuration).deleteEleve(authorization, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieve a list of all eleves
         * @summary Get all eleves
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async elevesIndex(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20018>> {
            const localVarAxiosArgs = await ElevesApiAxiosParamCreator(configuration).elevesIndex(authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update a eleve's information
         * @summary Update a eleve's information
         * @param {string} email 
         * @param {string} firstName 
         * @param {string} lastName 
         * @param {string} dateDeNaissance 
         * @param {string} lieuDeNaissance 
         * @param {string} photo 
         * @param {string} sexe 
         * @param {string} telephone 
         * @param {boolean} solvable 
         * @param {boolean} redoublant 
         * @param {number} classeId 
         * @param {string} authorization JWT token
         * @param {number} eleveId ID of eleve to update in this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateEleve(email: string, firstName: string, lastName: string, dateDeNaissance: string, lieuDeNaissance: string, photo: string, sexe: string, telephone: string, solvable: boolean, redoublant: boolean, classeId: number, authorization: string, eleveId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20020>> {
            const localVarAxiosArgs = await ElevesApiAxiosParamCreator(configuration).updateEleve(email, firstName, lastName, dateDeNaissance, lieuDeNaissance, photo, sexe, telephone, solvable, redoublant, classeId, authorization, eleveId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get information about a specific eleve
         * @summary Get eleve information
         * @param {string} authorization JWT token
         * @param {number} id ID of eleve to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async viewEleve(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20019>> {
            const localVarAxiosArgs = await ElevesApiAxiosParamCreator(configuration).viewEleve(authorization, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ElevesApi - factory interface
 * @export
 */
export const ElevesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Create a new eleve resource
         * @summary Create a new eleve
         * @param {string} email 
         * @param {string} firstName 
         * @param {string} lastName 
         * @param {string} dateDeNaissance 
         * @param {string} lieuDeNaissance 
         * @param {string} photo 
         * @param {string} sexe 
         * @param {string} telephone 
         * @param {boolean} solvable 
         * @param {boolean} redoublant 
         * @param {number} classeId 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEleve(email: string, firstName: string, lastName: string, dateDeNaissance: string, lieuDeNaissance: string, photo: string, sexe: string, telephone: string, solvable: boolean, redoublant: boolean, classeId: number, authorization: string, options?: any): AxiosPromise<InlineResponse2012> {
            return ElevesApiFp(configuration).createEleve(email, firstName, lastName, dateDeNaissance, lieuDeNaissance, photo, sexe, telephone, solvable, redoublant, classeId, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete an eleve resource
         * @summary Delete an eleve
         * @param {string} authorization JWT token
         * @param {number} id ID of eleve to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteEleve(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20021> {
            return ElevesApiFp(configuration).deleteEleve(authorization, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieve a list of all eleves
         * @summary Get all eleves
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        elevesIndex(authorization: string, options?: any): AxiosPromise<InlineResponse20018> {
            return ElevesApiFp(configuration).elevesIndex(authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Update a eleve's information
         * @summary Update a eleve's information
         * @param {string} email 
         * @param {string} firstName 
         * @param {string} lastName 
         * @param {string} dateDeNaissance 
         * @param {string} lieuDeNaissance 
         * @param {string} photo 
         * @param {string} sexe 
         * @param {string} telephone 
         * @param {boolean} solvable 
         * @param {boolean} redoublant 
         * @param {number} classeId 
         * @param {string} authorization JWT token
         * @param {number} eleveId ID of eleve to update in this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateEleve(email: string, firstName: string, lastName: string, dateDeNaissance: string, lieuDeNaissance: string, photo: string, sexe: string, telephone: string, solvable: boolean, redoublant: boolean, classeId: number, authorization: string, eleveId: number, options?: any): AxiosPromise<InlineResponse20020> {
            return ElevesApiFp(configuration).updateEleve(email, firstName, lastName, dateDeNaissance, lieuDeNaissance, photo, sexe, telephone, solvable, redoublant, classeId, authorization, eleveId, options).then((request) => request(axios, basePath));
        },
        /**
         * Get information about a specific eleve
         * @summary Get eleve information
         * @param {string} authorization JWT token
         * @param {number} id ID of eleve to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewEleve(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20019> {
            return ElevesApiFp(configuration).viewEleve(authorization, id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ElevesApi - object-oriented interface
 * @export
 * @class ElevesApi
 * @extends {BaseAPI}
 */
export class ElevesApi extends BaseAPI {
    /**
     * Create a new eleve resource
     * @summary Create a new eleve
     * @param {string} email 
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {string} dateDeNaissance 
     * @param {string} lieuDeNaissance 
     * @param {string} photo 
     * @param {string} sexe 
     * @param {string} telephone 
     * @param {boolean} solvable 
     * @param {boolean} redoublant 
     * @param {number} classeId 
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ElevesApi
     */
    public createEleve(email: string, firstName: string, lastName: string, dateDeNaissance: string, lieuDeNaissance: string, photo: string, sexe: string, telephone: string, solvable: boolean, redoublant: boolean, classeId: number, authorization: string, options?: any) {
        return ElevesApiFp(this.configuration).createEleve(email, firstName, lastName, dateDeNaissance, lieuDeNaissance, photo, sexe, telephone, solvable, redoublant, classeId, authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Delete an eleve resource
     * @summary Delete an eleve
     * @param {string} authorization JWT token
     * @param {number} id ID of eleve to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ElevesApi
     */
    public deleteEleve(authorization: string, id: number, options?: any) {
        return ElevesApiFp(this.configuration).deleteEleve(authorization, id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Retrieve a list of all eleves
     * @summary Get all eleves
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ElevesApi
     */
    public elevesIndex(authorization: string, options?: any) {
        return ElevesApiFp(this.configuration).elevesIndex(authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update a eleve's information
     * @summary Update a eleve's information
     * @param {string} email 
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {string} dateDeNaissance 
     * @param {string} lieuDeNaissance 
     * @param {string} photo 
     * @param {string} sexe 
     * @param {string} telephone 
     * @param {boolean} solvable 
     * @param {boolean} redoublant 
     * @param {number} classeId 
     * @param {string} authorization JWT token
     * @param {number} eleveId ID of eleve to update in this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ElevesApi
     */
    public updateEleve(email: string, firstName: string, lastName: string, dateDeNaissance: string, lieuDeNaissance: string, photo: string, sexe: string, telephone: string, solvable: boolean, redoublant: boolean, classeId: number, authorization: string, eleveId: number, options?: any) {
        return ElevesApiFp(this.configuration).updateEleve(email, firstName, lastName, dateDeNaissance, lieuDeNaissance, photo, sexe, telephone, solvable, redoublant, classeId, authorization, eleveId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get information about a specific eleve
     * @summary Get eleve information
     * @param {string} authorization JWT token
     * @param {number} id ID of eleve to get information for
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ElevesApi
     */
    public viewEleve(authorization: string, id: number, options?: any) {
        return ElevesApiFp(this.configuration).viewEleve(authorization, id, options).then((request) => request(this.axios, this.basePath));
    }
}
