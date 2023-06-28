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
import { InlineResponse20025 } from '../models';
import { InlineResponse20026 } from '../models';
import { InlineResponse20027 } from '../models';
import { InlineResponse2014 } from '../models';
import { InlineResponse40012 } from '../models';
import { InlineResponse40013 } from '../models';
import { InlineResponse401 } from '../models';
import { InlineResponse40410 } from '../models';
import { InlineResponse4049 } from '../models';
import { ParentsCreateBody } from '../models';
import { ParentsUpdateBody } from '../models';
/**
 * ParentsApi - axios parameter creator
 * @export
 */
export const ParentsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Delete a parent resource
         * @summary Delete a parent
         * @param {number} id ID of parent to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteParent: async (id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteParent.');
            }
            const localVarPath = `/api/parents/delete/{id}`
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
         * Retrieve a list of all parents
         * @summary Get all parents
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        showAllParent: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/parents/findAll`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

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
         * Get information about a specific parent
         * @summary Get parent information
         * @param {number} parentId ID of the parent to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        showOneParent: async (parentId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'parentId' is not null or undefined
            if (parentId === null || parentId === undefined) {
                throw new RequiredError('parentId','Required parameter parentId was null or undefined when calling showOneParent.');
            }
            const localVarPath = `/api/parents/findOne/{parentId}`
                .replace(`{${"parentId"}}`, encodeURIComponent(String(parentId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

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
         * Create a new parent resource
         * @summary Create a new parent
         * @param {ParentsCreateBody} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeParent: async (body: ParentsCreateBody, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling storeParent.');
            }
            const localVarPath = `/api/parents/create`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

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
         * Update a parent's information
         * @summary Update a parent's information
         * @param {ParentsUpdateBody} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateParent: async (body: ParentsUpdateBody, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateParent.');
            }
            const localVarPath = `/api/parents/update`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

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
 * ParentsApi - functional programming interface
 * @export
 */
export const ParentsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Delete a parent resource
         * @summary Delete a parent
         * @param {number} id ID of parent to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteParent(id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await ParentsApiAxiosParamCreator(configuration).deleteParent(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieve a list of all parents
         * @summary Get all parents
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async showAllParent(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20025>> {
            const localVarAxiosArgs = await ParentsApiAxiosParamCreator(configuration).showAllParent(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get information about a specific parent
         * @summary Get parent information
         * @param {number} parentId ID of the parent to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async showOneParent(parentId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20026>> {
            const localVarAxiosArgs = await ParentsApiAxiosParamCreator(configuration).showOneParent(parentId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Create a new parent resource
         * @summary Create a new parent
         * @param {ParentsCreateBody} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storeParent(body: ParentsCreateBody, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2014>> {
            const localVarAxiosArgs = await ParentsApiAxiosParamCreator(configuration).storeParent(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update a parent's information
         * @summary Update a parent's information
         * @param {ParentsUpdateBody} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateParent(body: ParentsUpdateBody, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20027>> {
            const localVarAxiosArgs = await ParentsApiAxiosParamCreator(configuration).updateParent(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ParentsApi - factory interface
 * @export
 */
export const ParentsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Delete a parent resource
         * @summary Delete a parent
         * @param {number} id ID of parent to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteParent(id: number, options?: any): AxiosPromise<void> {
            return ParentsApiFp(configuration).deleteParent(id, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieve a list of all parents
         * @summary Get all parents
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        showAllParent(options?: any): AxiosPromise<InlineResponse20025> {
            return ParentsApiFp(configuration).showAllParent(options).then((request) => request(axios, basePath));
        },
        /**
         * Get information about a specific parent
         * @summary Get parent information
         * @param {number} parentId ID of the parent to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        showOneParent(parentId: number, options?: any): AxiosPromise<InlineResponse20026> {
            return ParentsApiFp(configuration).showOneParent(parentId, options).then((request) => request(axios, basePath));
        },
        /**
         * Create a new parent resource
         * @summary Create a new parent
         * @param {ParentsCreateBody} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeParent(body: ParentsCreateBody, options?: any): AxiosPromise<InlineResponse2014> {
            return ParentsApiFp(configuration).storeParent(body, options).then((request) => request(axios, basePath));
        },
        /**
         * Update a parent's information
         * @summary Update a parent's information
         * @param {ParentsUpdateBody} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateParent(body: ParentsUpdateBody, options?: any): AxiosPromise<InlineResponse20027> {
            return ParentsApiFp(configuration).updateParent(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ParentsApi - object-oriented interface
 * @export
 * @class ParentsApi
 * @extends {BaseAPI}
 */
export class ParentsApi extends BaseAPI {
    /**
     * Delete a parent resource
     * @summary Delete a parent
     * @param {number} id ID of parent to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParentsApi
     */
    public deleteParent(id: number, options?: any) {
        return ParentsApiFp(this.configuration).deleteParent(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Retrieve a list of all parents
     * @summary Get all parents
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParentsApi
     */
    public showAllParent(options?: any) {
        return ParentsApiFp(this.configuration).showAllParent(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get information about a specific parent
     * @summary Get parent information
     * @param {number} parentId ID of the parent to get information for
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParentsApi
     */
    public showOneParent(parentId: number, options?: any) {
        return ParentsApiFp(this.configuration).showOneParent(parentId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Create a new parent resource
     * @summary Create a new parent
     * @param {ParentsCreateBody} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParentsApi
     */
    public storeParent(body: ParentsCreateBody, options?: any) {
        return ParentsApiFp(this.configuration).storeParent(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update a parent's information
     * @summary Update a parent's information
     * @param {ParentsUpdateBody} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParentsApi
     */
    public updateParent(body: ParentsUpdateBody, options?: any) {
        return ParentsApiFp(this.configuration).updateParent(body, options).then((request) => request(this.axios, this.basePath));
    }
}
