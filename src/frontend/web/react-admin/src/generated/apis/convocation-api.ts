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
import { ConvocationCreateBody } from '../models';
import { InlineResponse20018 } from '../models';
import { InlineResponse20019 } from '../models';
import { InlineResponse20020 } from '../models';
import { InlineResponse20021 } from '../models';
import { InlineResponse20022 } from '../models';
import { InlineResponse2013 } from '../models';
import { InlineResponse4008 } from '../models';
import { InlineResponse4009 } from '../models';
import { InlineResponse401 } from '../models';
import { InlineResponse4046 } from '../models';
import { InlineResponse4047 } from '../models';
import { InlineResponse4048 } from '../models';
import { InlineResponse4049 } from '../models';
import { UpdateConvocationIdBody } from '../models';
/**
 * ConvocationApi - axios parameter creator
 * @export
 */
export const ConvocationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a new convocation resource
         * @summary Create a new convocation
         * @param {ConvocationCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createConvocation: async (body: ConvocationCreateBody, authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling createConvocation.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling createConvocation.');
            }
            const localVarPath = `/api/convocation/create`;
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
         * Delete an convocation resource
         * @summary Delete an convocation
         * @param {string} authorization JWT token
         * @param {number} id ID of convocation to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteConvocation: async (authorization: string, id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling deleteConvocation.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteConvocation.');
            }
            const localVarPath = `/api/convocation/delete/{id}`
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
         * Retrieve a list of all convocation
         * @summary Get all convocation
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        indexConvocation: async (authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling indexConvocation.');
            }
            const localVarPath = `/api/convocation/findAll`;
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
         * Update a convocation's information
         * @summary Update a convocation's information
         * @param {UpdateConvocationIdBody} body 
         * @param {string} authorization JWT token
         * @param {number} convocationId ID of convocation to update in this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateConvocation: async (body: UpdateConvocationIdBody, authorization: string, convocationId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateConvocation.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling updateConvocation.');
            }
            // verify required parameter 'convocationId' is not null or undefined
            if (convocationId === null || convocationId === undefined) {
                throw new RequiredError('convocationId','Required parameter convocationId was null or undefined when calling updateConvocation.');
            }
            const localVarPath = `/api/convocation/update/{convocationId}`
                .replace(`{${"convocationId"}}`, encodeURIComponent(String(convocationId)));
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
         * Get information about a specific convocation
         * @summary Get convocation information
         * @param {string} authorization JWT token
         * @param {number} id ID of Convocation to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewConvocation: async (authorization: string, id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling viewConvocation.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling viewConvocation.');
            }
            const localVarPath = `/api/convocation/findOne/{id}`
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
         * Get information about all specific convocation to a student
         * @summary Get convocation information for a student
         * @param {string} authorization JWT token
         * @param {number} eleveId ID of Eleve to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewConvocationEleve: async (authorization: string, eleveId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling viewConvocationEleve.');
            }
            // verify required parameter 'eleveId' is not null or undefined
            if (eleveId === null || eleveId === undefined) {
                throw new RequiredError('eleveId','Required parameter eleveId was null or undefined when calling viewConvocationEleve.');
            }
            const localVarPath = `/api/convocation/findAll/eleve/{eleveId}`
                .replace(`{${"eleveId"}}`, encodeURIComponent(String(eleveId)));
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
 * ConvocationApi - functional programming interface
 * @export
 */
export const ConvocationApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Create a new convocation resource
         * @summary Create a new convocation
         * @param {ConvocationCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createConvocation(body: ConvocationCreateBody, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2013>> {
            const localVarAxiosArgs = await ConvocationApiAxiosParamCreator(configuration).createConvocation(body, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Delete an convocation resource
         * @summary Delete an convocation
         * @param {string} authorization JWT token
         * @param {number} id ID of convocation to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteConvocation(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20022>> {
            const localVarAxiosArgs = await ConvocationApiAxiosParamCreator(configuration).deleteConvocation(authorization, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieve a list of all convocation
         * @summary Get all convocation
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async indexConvocation(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20018>> {
            const localVarAxiosArgs = await ConvocationApiAxiosParamCreator(configuration).indexConvocation(authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update a convocation's information
         * @summary Update a convocation's information
         * @param {UpdateConvocationIdBody} body 
         * @param {string} authorization JWT token
         * @param {number} convocationId ID of convocation to update in this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateConvocation(body: UpdateConvocationIdBody, authorization: string, convocationId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20021>> {
            const localVarAxiosArgs = await ConvocationApiAxiosParamCreator(configuration).updateConvocation(body, authorization, convocationId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get information about a specific convocation
         * @summary Get convocation information
         * @param {string} authorization JWT token
         * @param {number} id ID of Convocation to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async viewConvocation(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20019>> {
            const localVarAxiosArgs = await ConvocationApiAxiosParamCreator(configuration).viewConvocation(authorization, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get information about all specific convocation to a student
         * @summary Get convocation information for a student
         * @param {string} authorization JWT token
         * @param {number} eleveId ID of Eleve to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async viewConvocationEleve(authorization: string, eleveId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20020>> {
            const localVarAxiosArgs = await ConvocationApiAxiosParamCreator(configuration).viewConvocationEleve(authorization, eleveId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ConvocationApi - factory interface
 * @export
 */
export const ConvocationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Create a new convocation resource
         * @summary Create a new convocation
         * @param {ConvocationCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createConvocation(body: ConvocationCreateBody, authorization: string, options?: any): AxiosPromise<InlineResponse2013> {
            return ConvocationApiFp(configuration).createConvocation(body, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete an convocation resource
         * @summary Delete an convocation
         * @param {string} authorization JWT token
         * @param {number} id ID of convocation to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteConvocation(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20022> {
            return ConvocationApiFp(configuration).deleteConvocation(authorization, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieve a list of all convocation
         * @summary Get all convocation
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        indexConvocation(authorization: string, options?: any): AxiosPromise<InlineResponse20018> {
            return ConvocationApiFp(configuration).indexConvocation(authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Update a convocation's information
         * @summary Update a convocation's information
         * @param {UpdateConvocationIdBody} body 
         * @param {string} authorization JWT token
         * @param {number} convocationId ID of convocation to update in this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateConvocation(body: UpdateConvocationIdBody, authorization: string, convocationId: number, options?: any): AxiosPromise<InlineResponse20021> {
            return ConvocationApiFp(configuration).updateConvocation(body, authorization, convocationId, options).then((request) => request(axios, basePath));
        },
        /**
         * Get information about a specific convocation
         * @summary Get convocation information
         * @param {string} authorization JWT token
         * @param {number} id ID of Convocation to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewConvocation(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20019> {
            return ConvocationApiFp(configuration).viewConvocation(authorization, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Get information about all specific convocation to a student
         * @summary Get convocation information for a student
         * @param {string} authorization JWT token
         * @param {number} eleveId ID of Eleve to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewConvocationEleve(authorization: string, eleveId: number, options?: any): AxiosPromise<InlineResponse20020> {
            return ConvocationApiFp(configuration).viewConvocationEleve(authorization, eleveId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ConvocationApi - object-oriented interface
 * @export
 * @class ConvocationApi
 * @extends {BaseAPI}
 */
export class ConvocationApi extends BaseAPI {
    /**
     * Create a new convocation resource
     * @summary Create a new convocation
     * @param {ConvocationCreateBody} body 
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConvocationApi
     */
    public createConvocation(body: ConvocationCreateBody, authorization: string, options?: any) {
        return ConvocationApiFp(this.configuration).createConvocation(body, authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Delete an convocation resource
     * @summary Delete an convocation
     * @param {string} authorization JWT token
     * @param {number} id ID of convocation to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConvocationApi
     */
    public deleteConvocation(authorization: string, id: number, options?: any) {
        return ConvocationApiFp(this.configuration).deleteConvocation(authorization, id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Retrieve a list of all convocation
     * @summary Get all convocation
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConvocationApi
     */
    public indexConvocation(authorization: string, options?: any) {
        return ConvocationApiFp(this.configuration).indexConvocation(authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update a convocation's information
     * @summary Update a convocation's information
     * @param {UpdateConvocationIdBody} body 
     * @param {string} authorization JWT token
     * @param {number} convocationId ID of convocation to update in this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConvocationApi
     */
    public updateConvocation(body: UpdateConvocationIdBody, authorization: string, convocationId: number, options?: any) {
        return ConvocationApiFp(this.configuration).updateConvocation(body, authorization, convocationId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get information about a specific convocation
     * @summary Get convocation information
     * @param {string} authorization JWT token
     * @param {number} id ID of Convocation to get information for
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConvocationApi
     */
    public viewConvocation(authorization: string, id: number, options?: any) {
        return ConvocationApiFp(this.configuration).viewConvocation(authorization, id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get information about all specific convocation to a student
     * @summary Get convocation information for a student
     * @param {string} authorization JWT token
     * @param {number} eleveId ID of Eleve to get information for
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConvocationApi
     */
    public viewConvocationEleve(authorization: string, eleveId: number, options?: any) {
        return ConvocationApiFp(this.configuration).viewConvocationEleve(authorization, eleveId, options).then((request) => request(this.axios, this.basePath));
    }
}
