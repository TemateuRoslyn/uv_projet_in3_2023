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
import { ClassesCreateBody } from '../models';
import { InlineResponse2002 } from '../models';
import { InlineResponse2003 } from '../models';
import { InlineResponse2004 } from '../models';
import { InlineResponse2005 } from '../models';
import { InlineResponse2006 } from '../models';
import { InlineResponse2011 } from '../models';
import { InlineResponse4001 } from '../models';
import { InlineResponse4002 } from '../models';
import { InlineResponse4003 } from '../models';
import { InlineResponse401 } from '../models';
import { InlineResponse404 } from '../models';
import { UpdateClasseIdBody } from '../models';
/**
 * ClassesApi - axios parameter creator
 * @export
 */
export const ClassesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a new classe.
         * @summary Create a new classe
         * @param {ClassesCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        classeCreate: async (body: ClassesCreateBody, authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling classeCreate.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling classeCreate.');
            }
            const localVarPath = `/api/classes/create`;
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
         * Remove the specified classe from storage.
         * @summary Delete a specific classe
         * @param {number} classeId Classe ID
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        classeDelete: async (classeId: number, authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'classeId' is not null or undefined
            if (classeId === null || classeId === undefined) {
                throw new RequiredError('classeId','Required parameter classeId was null or undefined when calling classeDelete.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling classeDelete.');
            }
            const localVarPath = `/api/classes/delete/{classeId}`
                .replace(`{${"classeId"}}`, encodeURIComponent(String(classeId)));
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
         * Display the specified classe.
         * @summary Get a specific classe
         * @param {string} authorization JWT token
         * @param {number} id Classe ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        classeShow: async (authorization: string, id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling classeShow.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling classeShow.');
            }
            const localVarPath = `/api/classes/findOne/{classeId}`
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
         * Update the specified classe.
         * @summary Update a specific classe
         * @param {UpdateClasseIdBody} body 
         * @param {string} authorization JWT token
         * @param {number} classeId Classe ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        classeUpdate: async (body: UpdateClasseIdBody, authorization: string, classeId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling classeUpdate.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling classeUpdate.');
            }
            // verify required parameter 'classeId' is not null or undefined
            if (classeId === null || classeId === undefined) {
                throw new RequiredError('classeId','Required parameter classeId was null or undefined when calling classeUpdate.');
            }
            const localVarPath = `/api/classes/update/{classeId}`
                .replace(`{${"classeId"}}`, encodeURIComponent(String(classeId)));
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
         * Display a listing of the nbClase.
         * @summary Get a list of classes
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        classesIndex: async (authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling classesIndex.');
            }
            const localVarPath = `/api/classes/findAll`;
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
         * Get the filtered list of classes.
         * @summary Get filtered list of classes
         * @param {string} keyword Keyword to filter classes
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        classesRecords: async (keyword: string, authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'keyword' is not null or undefined
            if (keyword === null || keyword === undefined) {
                throw new RequiredError('keyword','Required parameter keyword was null or undefined when calling classesRecords.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling classesRecords.');
            }
            const localVarPath = `/api/classes/records/{keyword}`
                .replace(`{${"keyword"}}`, encodeURIComponent(String(keyword)));
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
 * ClassesApi - functional programming interface
 * @export
 */
export const ClassesApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Create a new classe.
         * @summary Create a new classe
         * @param {ClassesCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async classeCreate(body: ClassesCreateBody, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2011>> {
            const localVarAxiosArgs = await ClassesApiAxiosParamCreator(configuration).classeCreate(body, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Remove the specified classe from storage.
         * @summary Delete a specific classe
         * @param {number} classeId Classe ID
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async classeDelete(classeId: number, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2005>> {
            const localVarAxiosArgs = await ClassesApiAxiosParamCreator(configuration).classeDelete(classeId, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Display the specified classe.
         * @summary Get a specific classe
         * @param {string} authorization JWT token
         * @param {number} id Classe ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async classeShow(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2003>> {
            const localVarAxiosArgs = await ClassesApiAxiosParamCreator(configuration).classeShow(authorization, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update the specified classe.
         * @summary Update a specific classe
         * @param {UpdateClasseIdBody} body 
         * @param {string} authorization JWT token
         * @param {number} classeId Classe ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async classeUpdate(body: UpdateClasseIdBody, authorization: string, classeId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2004>> {
            const localVarAxiosArgs = await ClassesApiAxiosParamCreator(configuration).classeUpdate(body, authorization, classeId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Display a listing of the nbClase.
         * @summary Get a list of classes
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async classesIndex(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2002>> {
            const localVarAxiosArgs = await ClassesApiAxiosParamCreator(configuration).classesIndex(authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get the filtered list of classes.
         * @summary Get filtered list of classes
         * @param {string} keyword Keyword to filter classes
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async classesRecords(keyword: string, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2006>> {
            const localVarAxiosArgs = await ClassesApiAxiosParamCreator(configuration).classesRecords(keyword, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ClassesApi - factory interface
 * @export
 */
export const ClassesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Create a new classe.
         * @summary Create a new classe
         * @param {ClassesCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        classeCreate(body: ClassesCreateBody, authorization: string, options?: any): AxiosPromise<InlineResponse2011> {
            return ClassesApiFp(configuration).classeCreate(body, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Remove the specified classe from storage.
         * @summary Delete a specific classe
         * @param {number} classeId Classe ID
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        classeDelete(classeId: number, authorization: string, options?: any): AxiosPromise<InlineResponse2005> {
            return ClassesApiFp(configuration).classeDelete(classeId, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Display the specified classe.
         * @summary Get a specific classe
         * @param {string} authorization JWT token
         * @param {number} id Classe ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        classeShow(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse2003> {
            return ClassesApiFp(configuration).classeShow(authorization, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Update the specified classe.
         * @summary Update a specific classe
         * @param {UpdateClasseIdBody} body 
         * @param {string} authorization JWT token
         * @param {number} classeId Classe ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        classeUpdate(body: UpdateClasseIdBody, authorization: string, classeId: number, options?: any): AxiosPromise<InlineResponse2004> {
            return ClassesApiFp(configuration).classeUpdate(body, authorization, classeId, options).then((request) => request(axios, basePath));
        },
        /**
         * Display a listing of the nbClase.
         * @summary Get a list of classes
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        classesIndex(authorization: string, options?: any): AxiosPromise<InlineResponse2002> {
            return ClassesApiFp(configuration).classesIndex(authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Get the filtered list of classes.
         * @summary Get filtered list of classes
         * @param {string} keyword Keyword to filter classes
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        classesRecords(keyword: string, authorization: string, options?: any): AxiosPromise<InlineResponse2006> {
            return ClassesApiFp(configuration).classesRecords(keyword, authorization, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ClassesApi - object-oriented interface
 * @export
 * @class ClassesApi
 * @extends {BaseAPI}
 */
export class ClassesApi extends BaseAPI {
    /**
     * Create a new classe.
     * @summary Create a new classe
     * @param {ClassesCreateBody} body 
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ClassesApi
     */
    public classeCreate(body: ClassesCreateBody, authorization: string, options?: any) {
        return ClassesApiFp(this.configuration).classeCreate(body, authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Remove the specified classe from storage.
     * @summary Delete a specific classe
     * @param {number} classeId Classe ID
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ClassesApi
     */
    public classeDelete(classeId: number, authorization: string, options?: any) {
        return ClassesApiFp(this.configuration).classeDelete(classeId, authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Display the specified classe.
     * @summary Get a specific classe
     * @param {string} authorization JWT token
     * @param {number} id Classe ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ClassesApi
     */
    public classeShow(authorization: string, id: number, options?: any) {
        return ClassesApiFp(this.configuration).classeShow(authorization, id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update the specified classe.
     * @summary Update a specific classe
     * @param {UpdateClasseIdBody} body 
     * @param {string} authorization JWT token
     * @param {number} classeId Classe ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ClassesApi
     */
    public classeUpdate(body: UpdateClasseIdBody, authorization: string, classeId: number, options?: any) {
        return ClassesApiFp(this.configuration).classeUpdate(body, authorization, classeId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Display a listing of the nbClase.
     * @summary Get a list of classes
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ClassesApi
     */
    public classesIndex(authorization: string, options?: any) {
        return ClassesApiFp(this.configuration).classesIndex(authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get the filtered list of classes.
     * @summary Get filtered list of classes
     * @param {string} keyword Keyword to filter classes
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ClassesApi
     */
    public classesRecords(keyword: string, authorization: string, options?: any) {
        return ClassesApiFp(this.configuration).classesRecords(keyword, authorization, options).then((request) => request(this.axios, this.basePath));
    }
}
