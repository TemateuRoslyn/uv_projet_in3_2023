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
import { InlineResponse20064 } from '../models';
import { InlineResponse20065 } from '../models';
import { InlineResponse20066 } from '../models';
import { InlineResponse20067 } from '../models';
import { InlineResponse20110 } from '../models';
import { InlineResponse40024 } from '../models';
import { InlineResponse40025 } from '../models';
import { InlineResponse401 } from '../models';
import { InlineResponse40429 } from '../models';
import { InlineResponse40430 } from '../models';
import { InlineResponse4046 } from '../models';
/**
 * ReparationsApi - axios parameter creator
 * @export
 */
export const ReparationsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a new reparation resource
         * @summary Create a new reparation
         * @param {string} demarcheMediation 
         * @param {number} fauteId 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createReparation: async (demarcheMediation: string, fauteId: number, authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'demarcheMediation' is not null or undefined
            if (demarcheMediation === null || demarcheMediation === undefined) {
                throw new RequiredError('demarcheMediation','Required parameter demarcheMediation was null or undefined when calling createReparation.');
            }
            // verify required parameter 'fauteId' is not null or undefined
            if (fauteId === null || fauteId === undefined) {
                throw new RequiredError('fauteId','Required parameter fauteId was null or undefined when calling createReparation.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling createReparation.');
            }
            const localVarPath = `/api/reparations/create`;
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


            if (demarcheMediation !== undefined) { 
                localVarFormParams.append('demarcheMediation', demarcheMediation as any);
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
         * Delete an reparation resource
         * @summary Delete an reparation
         * @param {string} authorization JWT token
         * @param {number} id ID of reparation to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteReparation: async (authorization: string, id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling deleteReparation.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteReparation.');
            }
            const localVarPath = `/api/reparations/delete/{id}`
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
         * Retrieve a list of all reparations
         * @summary Get all reparations
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        reparationsIndex: async (authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling reparationsIndex.');
            }
            const localVarPath = `/api/reparations/findAll`;
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
         * Update a reparation's information
         * @summary Update a reparation's information
         * @param {string} demarcheMediation 
         * @param {number} fauteId 
         * @param {string} authorization JWT token
         * @param {number} reparationId ID of reparation to update in this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatReparation: async (demarcheMediation: string, fauteId: number, authorization: string, reparationId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'demarcheMediation' is not null or undefined
            if (demarcheMediation === null || demarcheMediation === undefined) {
                throw new RequiredError('demarcheMediation','Required parameter demarcheMediation was null or undefined when calling updatReparation.');
            }
            // verify required parameter 'fauteId' is not null or undefined
            if (fauteId === null || fauteId === undefined) {
                throw new RequiredError('fauteId','Required parameter fauteId was null or undefined when calling updatReparation.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling updatReparation.');
            }
            // verify required parameter 'reparationId' is not null or undefined
            if (reparationId === null || reparationId === undefined) {
                throw new RequiredError('reparationId','Required parameter reparationId was null or undefined when calling updatReparation.');
            }
            const localVarPath = `/api/reparations/update/{reparationId}`
                .replace(`{${"reparationId"}}`, encodeURIComponent(String(reparationId)));
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


            if (demarcheMediation !== undefined) { 
                localVarFormParams.append('demarcheMediation', demarcheMediation as any);
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
         * Get information about a specific reparation
         * @summary Get reparation information
         * @param {string} authorization JWT token
         * @param {number} id ID of reparation to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewReparation: async (authorization: string, id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling viewReparation.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling viewReparation.');
            }
            const localVarPath = `/api/reparations/findOne/{id}`
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
 * ReparationsApi - functional programming interface
 * @export
 */
export const ReparationsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Create a new reparation resource
         * @summary Create a new reparation
         * @param {string} demarcheMediation 
         * @param {number} fauteId 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createReparation(demarcheMediation: string, fauteId: number, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20110>> {
            const localVarAxiosArgs = await ReparationsApiAxiosParamCreator(configuration).createReparation(demarcheMediation, fauteId, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Delete an reparation resource
         * @summary Delete an reparation
         * @param {string} authorization JWT token
         * @param {number} id ID of reparation to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteReparation(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20067>> {
            const localVarAxiosArgs = await ReparationsApiAxiosParamCreator(configuration).deleteReparation(authorization, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieve a list of all reparations
         * @summary Get all reparations
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async reparationsIndex(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20064>> {
            const localVarAxiosArgs = await ReparationsApiAxiosParamCreator(configuration).reparationsIndex(authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update a reparation's information
         * @summary Update a reparation's information
         * @param {string} demarcheMediation 
         * @param {number} fauteId 
         * @param {string} authorization JWT token
         * @param {number} reparationId ID of reparation to update in this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updatReparation(demarcheMediation: string, fauteId: number, authorization: string, reparationId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20066>> {
            const localVarAxiosArgs = await ReparationsApiAxiosParamCreator(configuration).updatReparation(demarcheMediation, fauteId, authorization, reparationId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get information about a specific reparation
         * @summary Get reparation information
         * @param {string} authorization JWT token
         * @param {number} id ID of reparation to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async viewReparation(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20065>> {
            const localVarAxiosArgs = await ReparationsApiAxiosParamCreator(configuration).viewReparation(authorization, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ReparationsApi - factory interface
 * @export
 */
export const ReparationsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Create a new reparation resource
         * @summary Create a new reparation
         * @param {string} demarcheMediation 
         * @param {number} fauteId 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createReparation(demarcheMediation: string, fauteId: number, authorization: string, options?: any): AxiosPromise<InlineResponse20110> {
            return ReparationsApiFp(configuration).createReparation(demarcheMediation, fauteId, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete an reparation resource
         * @summary Delete an reparation
         * @param {string} authorization JWT token
         * @param {number} id ID of reparation to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteReparation(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20067> {
            return ReparationsApiFp(configuration).deleteReparation(authorization, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieve a list of all reparations
         * @summary Get all reparations
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        reparationsIndex(authorization: string, options?: any): AxiosPromise<InlineResponse20064> {
            return ReparationsApiFp(configuration).reparationsIndex(authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Update a reparation's information
         * @summary Update a reparation's information
         * @param {string} demarcheMediation 
         * @param {number} fauteId 
         * @param {string} authorization JWT token
         * @param {number} reparationId ID of reparation to update in this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatReparation(demarcheMediation: string, fauteId: number, authorization: string, reparationId: number, options?: any): AxiosPromise<InlineResponse20066> {
            return ReparationsApiFp(configuration).updatReparation(demarcheMediation, fauteId, authorization, reparationId, options).then((request) => request(axios, basePath));
        },
        /**
         * Get information about a specific reparation
         * @summary Get reparation information
         * @param {string} authorization JWT token
         * @param {number} id ID of reparation to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewReparation(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20065> {
            return ReparationsApiFp(configuration).viewReparation(authorization, id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ReparationsApi - object-oriented interface
 * @export
 * @class ReparationsApi
 * @extends {BaseAPI}
 */
export class ReparationsApi extends BaseAPI {
    /**
     * Create a new reparation resource
     * @summary Create a new reparation
     * @param {string} demarcheMediation 
     * @param {number} fauteId 
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReparationsApi
     */
    public createReparation(demarcheMediation: string, fauteId: number, authorization: string, options?: any) {
        return ReparationsApiFp(this.configuration).createReparation(demarcheMediation, fauteId, authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Delete an reparation resource
     * @summary Delete an reparation
     * @param {string} authorization JWT token
     * @param {number} id ID of reparation to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReparationsApi
     */
    public deleteReparation(authorization: string, id: number, options?: any) {
        return ReparationsApiFp(this.configuration).deleteReparation(authorization, id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Retrieve a list of all reparations
     * @summary Get all reparations
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReparationsApi
     */
    public reparationsIndex(authorization: string, options?: any) {
        return ReparationsApiFp(this.configuration).reparationsIndex(authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update a reparation's information
     * @summary Update a reparation's information
     * @param {string} demarcheMediation 
     * @param {number} fauteId 
     * @param {string} authorization JWT token
     * @param {number} reparationId ID of reparation to update in this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReparationsApi
     */
    public updatReparation(demarcheMediation: string, fauteId: number, authorization: string, reparationId: number, options?: any) {
        return ReparationsApiFp(this.configuration).updatReparation(demarcheMediation, fauteId, authorization, reparationId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get information about a specific reparation
     * @summary Get reparation information
     * @param {string} authorization JWT token
     * @param {number} id ID of reparation to get information for
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReparationsApi
     */
    public viewReparation(authorization: string, id: number, options?: any) {
        return ReparationsApiFp(this.configuration).viewReparation(authorization, id, options).then((request) => request(this.axios, this.basePath));
    }
}
