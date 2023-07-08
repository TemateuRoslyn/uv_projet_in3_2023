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
import { InlineResponse20012 } from '../models';
import { InlineResponse20013 } from '../models';
import { InlineResponse20014 } from '../models';
import { InlineResponse20015 } from '../models';
import { InlineResponse20016 } from '../models';
import { InlineResponse20017 } from '../models';
import { InlineResponse4006 } from '../models';
import { InlineResponse4007 } from '../models';
import { InlineResponse401 } from '../models';
import { InlineResponse4044 } from '../models';
import { InlineResponse4045 } from '../models';
import { UpdateConseilDisciplineIdBody } from '../models';
/**
 * ConseilDisciplinesApi - axios parameter creator
 * @export
 */
export const ConseilDisciplinesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Retrieve a list of all disciplinary councils with associated eleve
         * @summary Get all disciplinary councils
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        conseilDisciplinesIndex: async (authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling conseilDisciplinesIndex.');
            }
            const localVarPath = `/api/conseil_discipline/findAll`;
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
         * Create a new disciplinary council resource
         * @summary Create a new disciplinary council
         * @param {string} dateCd 
         * @param {string} heureDebutCd 
         * @param {string} heureFinCd 
         * @param {number} eleveId 
         * @param {number} fauteId 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createConseilDiscipline: async (dateCd: string, heureDebutCd: string, heureFinCd: string, eleveId: number, fauteId: number, authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'dateCd' is not null or undefined
            if (dateCd === null || dateCd === undefined) {
                throw new RequiredError('dateCd','Required parameter dateCd was null or undefined when calling createConseilDiscipline.');
            }
            // verify required parameter 'heureDebutCd' is not null or undefined
            if (heureDebutCd === null || heureDebutCd === undefined) {
                throw new RequiredError('heureDebutCd','Required parameter heureDebutCd was null or undefined when calling createConseilDiscipline.');
            }
            // verify required parameter 'heureFinCd' is not null or undefined
            if (heureFinCd === null || heureFinCd === undefined) {
                throw new RequiredError('heureFinCd','Required parameter heureFinCd was null or undefined when calling createConseilDiscipline.');
            }
            // verify required parameter 'eleveId' is not null or undefined
            if (eleveId === null || eleveId === undefined) {
                throw new RequiredError('eleveId','Required parameter eleveId was null or undefined when calling createConseilDiscipline.');
            }
            // verify required parameter 'fauteId' is not null or undefined
            if (fauteId === null || fauteId === undefined) {
                throw new RequiredError('fauteId','Required parameter fauteId was null or undefined when calling createConseilDiscipline.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling createConseilDiscipline.');
            }
            const localVarPath = `/api/conseil_discipline/create`;
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


            if (dateCd !== undefined) { 
                localVarFormParams.append('dateCd', dateCd as any);
            }

            if (heureDebutCd !== undefined) { 
                localVarFormParams.append('heureDebutCd', heureDebutCd as any);
            }

            if (heureFinCd !== undefined) { 
                localVarFormParams.append('heureFinCd', heureFinCd as any);
            }

            if (eleveId !== undefined) { 
                localVarFormParams.append('eleveId', eleveId as any);
            }

            if (fauteId !== undefined) { 
                localVarFormParams.append('fauteId', fauteId as any);
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
         * Delete a disciplinary council resource
         * @summary Delete a disciplinary council
         * @param {string} authorization JWT token
         * @param {number} id ID of disciplinary council to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteConseilDiscipline: async (authorization: string, id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling deleteConseilDiscipline.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteConseilDiscipline.');
            }
            const localVarPath = `/api/conseil_discipline/delete/{id}`
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
         * Update a disciplinary council's information
         * @summary Update a disciplinary council's information
         * @param {UpdateConseilDisciplineIdBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateConseilDiscipline: async (body: UpdateConseilDisciplineIdBody, authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateConseilDiscipline.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling updateConseilDiscipline.');
            }
            const localVarPath = `/api/conseil_discipline/update/{conseilDisciplineId}`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

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
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get information about a specific disciplinary council
         * @summary Get disciplinary council information
         * @param {string} authorization JWT token
         * @param {number} id ID of disciplinary council to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewConseilDiscipline: async (authorization: string, id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling viewConseilDiscipline.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling viewConseilDiscipline.');
            }
            const localVarPath = `/api/conseil_discipline/findOne/{id}`
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
        /**
         * Get information about all specific conseil_discipline to a student
         * @summary Get conseil_discipline information for a student
         * @param {string} authorization JWT token
         * @param {number} id ID of Eleve to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewConseilDisciplineEleve: async (authorization: string, id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling viewConseilDisciplineEleve.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling viewConseilDisciplineEleve.');
            }
            const localVarPath = `/api/conseil_discipline/findAll/eleve/{eleveId}`
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
 * ConseilDisciplinesApi - functional programming interface
 * @export
 */
export const ConseilDisciplinesApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Retrieve a list of all disciplinary councils with associated eleve
         * @summary Get all disciplinary councils
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async conseilDisciplinesIndex(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20012>> {
            const localVarAxiosArgs = await ConseilDisciplinesApiAxiosParamCreator(configuration).conseilDisciplinesIndex(authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Create a new disciplinary council resource
         * @summary Create a new disciplinary council
         * @param {string} dateCd 
         * @param {string} heureDebutCd 
         * @param {string} heureFinCd 
         * @param {number} eleveId 
         * @param {number} fauteId 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createConseilDiscipline(dateCd: string, heureDebutCd: string, heureFinCd: string, eleveId: number, fauteId: number, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20015>> {
            const localVarAxiosArgs = await ConseilDisciplinesApiAxiosParamCreator(configuration).createConseilDiscipline(dateCd, heureDebutCd, heureFinCd, eleveId, fauteId, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Delete a disciplinary council resource
         * @summary Delete a disciplinary council
         * @param {string} authorization JWT token
         * @param {number} id ID of disciplinary council to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteConseilDiscipline(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20017>> {
            const localVarAxiosArgs = await ConseilDisciplinesApiAxiosParamCreator(configuration).deleteConseilDiscipline(authorization, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update a disciplinary council's information
         * @summary Update a disciplinary council's information
         * @param {UpdateConseilDisciplineIdBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateConseilDiscipline(body: UpdateConseilDisciplineIdBody, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20016>> {
            const localVarAxiosArgs = await ConseilDisciplinesApiAxiosParamCreator(configuration).updateConseilDiscipline(body, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get information about a specific disciplinary council
         * @summary Get disciplinary council information
         * @param {string} authorization JWT token
         * @param {number} id ID of disciplinary council to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async viewConseilDiscipline(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20013>> {
            const localVarAxiosArgs = await ConseilDisciplinesApiAxiosParamCreator(configuration).viewConseilDiscipline(authorization, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get information about all specific conseil_discipline to a student
         * @summary Get conseil_discipline information for a student
         * @param {string} authorization JWT token
         * @param {number} id ID of Eleve to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async viewConseilDisciplineEleve(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20014>> {
            const localVarAxiosArgs = await ConseilDisciplinesApiAxiosParamCreator(configuration).viewConseilDisciplineEleve(authorization, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ConseilDisciplinesApi - factory interface
 * @export
 */
export const ConseilDisciplinesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Retrieve a list of all disciplinary councils with associated eleve
         * @summary Get all disciplinary councils
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        conseilDisciplinesIndex(authorization: string, options?: any): AxiosPromise<InlineResponse20012> {
            return ConseilDisciplinesApiFp(configuration).conseilDisciplinesIndex(authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Create a new disciplinary council resource
         * @summary Create a new disciplinary council
         * @param {string} dateCd 
         * @param {string} heureDebutCd 
         * @param {string} heureFinCd 
         * @param {number} eleveId 
         * @param {number} fauteId 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createConseilDiscipline(dateCd: string, heureDebutCd: string, heureFinCd: string, eleveId: number, fauteId: number, authorization: string, options?: any): AxiosPromise<InlineResponse20015> {
            return ConseilDisciplinesApiFp(configuration).createConseilDiscipline(dateCd, heureDebutCd, heureFinCd, eleveId, fauteId, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete a disciplinary council resource
         * @summary Delete a disciplinary council
         * @param {string} authorization JWT token
         * @param {number} id ID of disciplinary council to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteConseilDiscipline(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20017> {
            return ConseilDisciplinesApiFp(configuration).deleteConseilDiscipline(authorization, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Update a disciplinary council's information
         * @summary Update a disciplinary council's information
         * @param {UpdateConseilDisciplineIdBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateConseilDiscipline(body: UpdateConseilDisciplineIdBody, authorization: string, options?: any): AxiosPromise<InlineResponse20016> {
            return ConseilDisciplinesApiFp(configuration).updateConseilDiscipline(body, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Get information about a specific disciplinary council
         * @summary Get disciplinary council information
         * @param {string} authorization JWT token
         * @param {number} id ID of disciplinary council to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewConseilDiscipline(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20013> {
            return ConseilDisciplinesApiFp(configuration).viewConseilDiscipline(authorization, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Get information about all specific conseil_discipline to a student
         * @summary Get conseil_discipline information for a student
         * @param {string} authorization JWT token
         * @param {number} id ID of Eleve to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewConseilDisciplineEleve(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20014> {
            return ConseilDisciplinesApiFp(configuration).viewConseilDisciplineEleve(authorization, id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ConseilDisciplinesApi - object-oriented interface
 * @export
 * @class ConseilDisciplinesApi
 * @extends {BaseAPI}
 */
export class ConseilDisciplinesApi extends BaseAPI {
    /**
     * Retrieve a list of all disciplinary councils with associated eleve
     * @summary Get all disciplinary councils
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConseilDisciplinesApi
     */
    public conseilDisciplinesIndex(authorization: string, options?: any) {
        return ConseilDisciplinesApiFp(this.configuration).conseilDisciplinesIndex(authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Create a new disciplinary council resource
     * @summary Create a new disciplinary council
     * @param {string} dateCd 
     * @param {string} heureDebutCd 
     * @param {string} heureFinCd 
     * @param {number} eleveId 
     * @param {number} fauteId 
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConseilDisciplinesApi
     */
    public createConseilDiscipline(dateCd: string, heureDebutCd: string, heureFinCd: string, eleveId: number, fauteId: number, authorization: string, options?: any) {
        return ConseilDisciplinesApiFp(this.configuration).createConseilDiscipline(dateCd, heureDebutCd, heureFinCd, eleveId, fauteId, authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Delete a disciplinary council resource
     * @summary Delete a disciplinary council
     * @param {string} authorization JWT token
     * @param {number} id ID of disciplinary council to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConseilDisciplinesApi
     */
    public deleteConseilDiscipline(authorization: string, id: number, options?: any) {
        return ConseilDisciplinesApiFp(this.configuration).deleteConseilDiscipline(authorization, id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update a disciplinary council's information
     * @summary Update a disciplinary council's information
     * @param {UpdateConseilDisciplineIdBody} body 
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConseilDisciplinesApi
     */
    public updateConseilDiscipline(body: UpdateConseilDisciplineIdBody, authorization: string, options?: any) {
        return ConseilDisciplinesApiFp(this.configuration).updateConseilDiscipline(body, authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get information about a specific disciplinary council
     * @summary Get disciplinary council information
     * @param {string} authorization JWT token
     * @param {number} id ID of disciplinary council to get information for
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConseilDisciplinesApi
     */
    public viewConseilDiscipline(authorization: string, id: number, options?: any) {
        return ConseilDisciplinesApiFp(this.configuration).viewConseilDiscipline(authorization, id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get information about all specific conseil_discipline to a student
     * @summary Get conseil_discipline information for a student
     * @param {string} authorization JWT token
     * @param {number} id ID of Eleve to get information for
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConseilDisciplinesApi
     */
    public viewConseilDisciplineEleve(authorization: string, id: number, options?: any) {
        return ConseilDisciplinesApiFp(this.configuration).viewConseilDisciplineEleve(authorization, id, options).then((request) => request(this.axios, this.basePath));
    }
}
