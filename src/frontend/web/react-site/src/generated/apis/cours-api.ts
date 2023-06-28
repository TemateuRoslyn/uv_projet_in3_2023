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
import { CoursCreateBody } from '../models';
import { CoursUpdateBody } from '../models';
import { InlineResponse20013 } from '../models';
import { InlineResponse20014 } from '../models';
import { InlineResponse20015 } from '../models';
import { InlineResponse20016 } from '../models';
import { InlineResponse20017 } from '../models';
import { InlineResponse4006 } from '../models';
import { InlineResponse4007 } from '../models';
import { InlineResponse401 } from '../models';
import { InlineResponse4042 } from '../models';
/**
 * CoursApi - axios parameter creator
 * @export
 */
export const CoursApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a new course resource
         * @summary Create a new course
         * @param {CoursCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createCours: async (body: CoursCreateBody, authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling createCours.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling createCours.');
            }
            const localVarPath = `/api/cours/create`;
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
         * Delete a cour resource
         * @summary Delete a cour
         * @param {string} authorization JWT token
         * @param {number} id ID of cour to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteCours: async (authorization: string, id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling deleteCours.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteCours.');
            }
            const localVarPath = `/api/cours/delete/{id}`
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
         * Retrieve a list of all cours
         * @summary Get all cours
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAllcours: async (authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling findAllcours.');
            }
            const localVarPath = `/api/cours/findAll`;
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
         * Get information about a specific cour
         * @summary Get cour information
         * @param {string} authorization JWT token
         * @param {number} id ID of cour to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findOneCours: async (authorization: string, id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling findOneCours.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling findOneCours.');
            }
            const localVarPath = `/api/cours/findOne/{id}`
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
         * Update a cour's information
         * @summary Update a cour's information
         * @param {CoursUpdateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateCours: async (body: CoursUpdateBody, authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateCours.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling updateCours.');
            }
            const localVarPath = `/api/cours/update`;
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
 * CoursApi - functional programming interface
 * @export
 */
export const CoursApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Create a new course resource
         * @summary Create a new course
         * @param {CoursCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createCours(body: CoursCreateBody, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20015>> {
            const localVarAxiosArgs = await CoursApiAxiosParamCreator(configuration).createCours(body, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Delete a cour resource
         * @summary Delete a cour
         * @param {string} authorization JWT token
         * @param {number} id ID of cour to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteCours(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20017>> {
            const localVarAxiosArgs = await CoursApiAxiosParamCreator(configuration).deleteCours(authorization, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieve a list of all cours
         * @summary Get all cours
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findAllcours(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20013>> {
            const localVarAxiosArgs = await CoursApiAxiosParamCreator(configuration).findAllcours(authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get information about a specific cour
         * @summary Get cour information
         * @param {string} authorization JWT token
         * @param {number} id ID of cour to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findOneCours(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20014>> {
            const localVarAxiosArgs = await CoursApiAxiosParamCreator(configuration).findOneCours(authorization, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update a cour's information
         * @summary Update a cour's information
         * @param {CoursUpdateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateCours(body: CoursUpdateBody, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20016>> {
            const localVarAxiosArgs = await CoursApiAxiosParamCreator(configuration).updateCours(body, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * CoursApi - factory interface
 * @export
 */
export const CoursApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Create a new course resource
         * @summary Create a new course
         * @param {CoursCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createCours(body: CoursCreateBody, authorization: string, options?: any): AxiosPromise<InlineResponse20015> {
            return CoursApiFp(configuration).createCours(body, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete a cour resource
         * @summary Delete a cour
         * @param {string} authorization JWT token
         * @param {number} id ID of cour to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteCours(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20017> {
            return CoursApiFp(configuration).deleteCours(authorization, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieve a list of all cours
         * @summary Get all cours
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAllcours(authorization: string, options?: any): AxiosPromise<InlineResponse20013> {
            return CoursApiFp(configuration).findAllcours(authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Get information about a specific cour
         * @summary Get cour information
         * @param {string} authorization JWT token
         * @param {number} id ID of cour to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findOneCours(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20014> {
            return CoursApiFp(configuration).findOneCours(authorization, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Update a cour's information
         * @summary Update a cour's information
         * @param {CoursUpdateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateCours(body: CoursUpdateBody, authorization: string, options?: any): AxiosPromise<InlineResponse20016> {
            return CoursApiFp(configuration).updateCours(body, authorization, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CoursApi - object-oriented interface
 * @export
 * @class CoursApi
 * @extends {BaseAPI}
 */
export class CoursApi extends BaseAPI {
    /**
     * Create a new course resource
     * @summary Create a new course
     * @param {CoursCreateBody} body 
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CoursApi
     */
    public createCours(body: CoursCreateBody, authorization: string, options?: any) {
        return CoursApiFp(this.configuration).createCours(body, authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Delete a cour resource
     * @summary Delete a cour
     * @param {string} authorization JWT token
     * @param {number} id ID of cour to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CoursApi
     */
    public deleteCours(authorization: string, id: number, options?: any) {
        return CoursApiFp(this.configuration).deleteCours(authorization, id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Retrieve a list of all cours
     * @summary Get all cours
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CoursApi
     */
    public findAllcours(authorization: string, options?: any) {
        return CoursApiFp(this.configuration).findAllcours(authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get information about a specific cour
     * @summary Get cour information
     * @param {string} authorization JWT token
     * @param {number} id ID of cour to get information for
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CoursApi
     */
    public findOneCours(authorization: string, id: number, options?: any) {
        return CoursApiFp(this.configuration).findOneCours(authorization, id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update a cour's information
     * @summary Update a cour's information
     * @param {CoursUpdateBody} body 
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CoursApi
     */
    public updateCours(body: CoursUpdateBody, authorization: string, options?: any) {
        return CoursApiFp(this.configuration).updateCours(body, authorization, options).then((request) => request(this.axios, this.basePath));
    }
}
