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
import { InlineResponse20029 } from '../models';
import { InlineResponse20030 } from '../models';
import { InlineResponse20031 } from '../models';
import { InlineResponse20032 } from '../models';
import { InlineResponse40011 } from '../models';
import { InlineResponse40012 } from '../models';
import { InlineResponse401 } from '../models';
import { InlineResponse40410 } from '../models';
import { InlineResponse40411 } from '../models';
import { ReglementCreateBody } from '../models';
import { ReglementUpdateBody } from '../models';
/**
 * ReglementInterieurApi - axios parameter creator
 * @export
 */
export const ReglementInterieurApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a new reglementInterieur resource
         * @summary Create a new reglementInterieur
         * @param {ReglementCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createreglementInterieur: async (body: ReglementCreateBody, authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling createreglementInterieur.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling createreglementInterieur.');
            }
            const localVarPath = `/api/reglement/create`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
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
         * Delete a reglementInterieur resource
         * @summary Delete a reglementInterieur
         * @param {string} authorization JWT token
         * @param {number} id ID of reglementInterieur to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteReglementInterieur: async (authorization: string, id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling deleteReglementInterieur.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteReglementInterieur.');
            }
            const localVarPath = `/api/reglement/delete/{id}`
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
         * Retrieve a list of all reglementInterieur
         * @summary Get all reglementInterieur
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAllreglementInterieurs: async (authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling findAllreglementInterieurs.');
            }
            const localVarPath = `/api/reglement/findAll`;
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
         * Get information about a specific reglementInterieur
         * @summary Get reglement information
         * @param {string} authorization JWT token
         * @param {number} id ID of reglementInterieur to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        showOneReglementInterieur: async (authorization: string, id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling showOneReglementInterieur.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling showOneReglementInterieur.');
            }
            const localVarPath = `/api/reglement/findOne/{id}`
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
         * Update a reglementInterieur's information
         * @summary Update a reglementInterieur's information
         * @param {ReglementUpdateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatereglementInterieur: async (body: ReglementUpdateBody, authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updatereglementInterieur.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling updatereglementInterieur.');
            }
            const localVarPath = `/api/reglement/update`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
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
    }
};

/**
 * ReglementInterieurApi - functional programming interface
 * @export
 */
export const ReglementInterieurApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Create a new reglementInterieur resource
         * @summary Create a new reglementInterieur
         * @param {ReglementCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createreglementInterieur(body: ReglementCreateBody, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20030>> {
            const localVarAxiosArgs = await ReglementInterieurApiAxiosParamCreator(configuration).createreglementInterieur(body, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Delete a reglementInterieur resource
         * @summary Delete a reglementInterieur
         * @param {string} authorization JWT token
         * @param {number} id ID of reglementInterieur to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteReglementInterieur(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await ReglementInterieurApiAxiosParamCreator(configuration).deleteReglementInterieur(authorization, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieve a list of all reglementInterieur
         * @summary Get all reglementInterieur
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findAllreglementInterieurs(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20029>> {
            const localVarAxiosArgs = await ReglementInterieurApiAxiosParamCreator(configuration).findAllreglementInterieurs(authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get information about a specific reglementInterieur
         * @summary Get reglement information
         * @param {string} authorization JWT token
         * @param {number} id ID of reglementInterieur to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async showOneReglementInterieur(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20031>> {
            const localVarAxiosArgs = await ReglementInterieurApiAxiosParamCreator(configuration).showOneReglementInterieur(authorization, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update a reglementInterieur's information
         * @summary Update a reglementInterieur's information
         * @param {ReglementUpdateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updatereglementInterieur(body: ReglementUpdateBody, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20032>> {
            const localVarAxiosArgs = await ReglementInterieurApiAxiosParamCreator(configuration).updatereglementInterieur(body, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ReglementInterieurApi - factory interface
 * @export
 */
export const ReglementInterieurApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Create a new reglementInterieur resource
         * @summary Create a new reglementInterieur
         * @param {ReglementCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createreglementInterieur(body: ReglementCreateBody, authorization: string, options?: any): AxiosPromise<InlineResponse20030> {
            return ReglementInterieurApiFp(configuration).createreglementInterieur(body, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete a reglementInterieur resource
         * @summary Delete a reglementInterieur
         * @param {string} authorization JWT token
         * @param {number} id ID of reglementInterieur to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteReglementInterieur(authorization: string, id: number, options?: any): AxiosPromise<void> {
            return ReglementInterieurApiFp(configuration).deleteReglementInterieur(authorization, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieve a list of all reglementInterieur
         * @summary Get all reglementInterieur
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAllreglementInterieurs(authorization: string, options?: any): AxiosPromise<InlineResponse20029> {
            return ReglementInterieurApiFp(configuration).findAllreglementInterieurs(authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Get information about a specific reglementInterieur
         * @summary Get reglement information
         * @param {string} authorization JWT token
         * @param {number} id ID of reglementInterieur to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        showOneReglementInterieur(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20031> {
            return ReglementInterieurApiFp(configuration).showOneReglementInterieur(authorization, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Update a reglementInterieur's information
         * @summary Update a reglementInterieur's information
         * @param {ReglementUpdateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatereglementInterieur(body: ReglementUpdateBody, authorization: string, options?: any): AxiosPromise<InlineResponse20032> {
            return ReglementInterieurApiFp(configuration).updatereglementInterieur(body, authorization, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ReglementInterieurApi - object-oriented interface
 * @export
 * @class ReglementInterieurApi
 * @extends {BaseAPI}
 */
export class ReglementInterieurApi extends BaseAPI {
    /**
     * Create a new reglementInterieur resource
     * @summary Create a new reglementInterieur
     * @param {ReglementCreateBody} body 
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReglementInterieurApi
     */
    public createreglementInterieur(body: ReglementCreateBody, authorization: string, options?: any) {
        return ReglementInterieurApiFp(this.configuration).createreglementInterieur(body, authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Delete a reglementInterieur resource
     * @summary Delete a reglementInterieur
     * @param {string} authorization JWT token
     * @param {number} id ID of reglementInterieur to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReglementInterieurApi
     */
    public deleteReglementInterieur(authorization: string, id: number, options?: any) {
        return ReglementInterieurApiFp(this.configuration).deleteReglementInterieur(authorization, id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Retrieve a list of all reglementInterieur
     * @summary Get all reglementInterieur
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReglementInterieurApi
     */
    public findAllreglementInterieurs(authorization: string, options?: any) {
        return ReglementInterieurApiFp(this.configuration).findAllreglementInterieurs(authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get information about a specific reglementInterieur
     * @summary Get reglement information
     * @param {string} authorization JWT token
     * @param {number} id ID of reglementInterieur to get information for
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReglementInterieurApi
     */
    public showOneReglementInterieur(authorization: string, id: number, options?: any) {
        return ReglementInterieurApiFp(this.configuration).showOneReglementInterieur(authorization, id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update a reglementInterieur's information
     * @summary Update a reglementInterieur's information
     * @param {ReglementUpdateBody} body 
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReglementInterieurApi
     */
    public updatereglementInterieur(body: ReglementUpdateBody, authorization: string, options?: any) {
        return ReglementInterieurApiFp(this.configuration).updatereglementInterieur(body, authorization, options).then((request) => request(this.axios, this.basePath));
    }
}