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
import { InlineResponse20044 } from '../models';
import { InlineResponse20045 } from '../models';
import { InlineResponse20046 } from '../models';
import { InlineResponse20047 } from '../models';
import { InlineResponse2016 } from '../models';
import { InlineResponse40019 } from '../models';
import { InlineResponse4002 } from '../models';
import { InlineResponse401 } from '../models';
import { InlineResponse40420 } from '../models';
import { PermissionsCreateBody } from '../models';
import { StatusPermissionIdBody } from '../models';
import { UpdatePermissionIdBody } from '../models';
/**
 * PermissionsApi - axios parameter creator
 * @export
 */
export const PermissionsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a new permission.
         * @summary Create a new permission
         * @param {PermissionsCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        permissionCreate: async (body: PermissionsCreateBody, authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling permissionCreate.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling permissionCreate.');
            }
            const localVarPath = `/api/permissions/create`;
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
         * Remove the specified permission from storage.
         * @summary Delete a specific permission
         * @param {number} permissionId Permission ID
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        permissionDelete: async (permissionId: number, authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'permissionId' is not null or undefined
            if (permissionId === null || permissionId === undefined) {
                throw new RequiredError('permissionId','Required parameter permissionId was null or undefined when calling permissionDelete.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling permissionDelete.');
            }
            const localVarPath = `/api/permissions/delete/{permissionId}`
                .replace(`{${"permissionId"}}`, encodeURIComponent(String(permissionId)));
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
         * Display the specified permission.
         * @summary Get a specific permission
         * @param {string} authorization JWT token
         * @param {number} id Permission ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        permissionShow: async (authorization: string, id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling permissionShow.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling permissionShow.');
            }
            const localVarPath = `/api/permissions/findOne/{permissionId}`
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
         * Update the specified permission.
         * @summary Update a specific permission
         * @param {UpdatePermissionIdBody} body 
         * @param {string} authorization JWT token
         * @param {number} permissionId Permission ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        permissionUpdate: async (body: UpdatePermissionIdBody, authorization: string, permissionId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling permissionUpdate.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling permissionUpdate.');
            }
            // verify required parameter 'permissionId' is not null or undefined
            if (permissionId === null || permissionId === undefined) {
                throw new RequiredError('permissionId','Required parameter permissionId was null or undefined when calling permissionUpdate.');
            }
            const localVarPath = `/api/permissions/update/{permissionId}`
                .replace(`{${"permissionId"}}`, encodeURIComponent(String(permissionId)));
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
         * Update the specified permission.
         * @summary Update a specific permission
         * @param {StatusPermissionIdBody} body 
         * @param {string} authorization JWT token
         * @param {number} permissionId Permission ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        permissionUpdateStatus: async (body: StatusPermissionIdBody, authorization: string, permissionId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling permissionUpdateStatus.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling permissionUpdateStatus.');
            }
            // verify required parameter 'permissionId' is not null or undefined
            if (permissionId === null || permissionId === undefined) {
                throw new RequiredError('permissionId','Required parameter permissionId was null or undefined when calling permissionUpdateStatus.');
            }
            const localVarPath = `/api/permissions/update/status/{permissionId}`
                .replace(`{${"permissionId"}}`, encodeURIComponent(String(permissionId)));
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
         * Display a listing of the permissions.
         * @summary Get a list of permissions
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        permissionsIndex: async (authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling permissionsIndex.');
            }
            const localVarPath = `/api/permissions/findAll`;
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
 * PermissionsApi - functional programming interface
 * @export
 */
export const PermissionsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Create a new permission.
         * @summary Create a new permission
         * @param {PermissionsCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async permissionCreate(body: PermissionsCreateBody, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2016>> {
            const localVarAxiosArgs = await PermissionsApiAxiosParamCreator(configuration).permissionCreate(body, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Remove the specified permission from storage.
         * @summary Delete a specific permission
         * @param {number} permissionId Permission ID
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async permissionDelete(permissionId: number, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20047>> {
            const localVarAxiosArgs = await PermissionsApiAxiosParamCreator(configuration).permissionDelete(permissionId, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Display the specified permission.
         * @summary Get a specific permission
         * @param {string} authorization JWT token
         * @param {number} id Permission ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async permissionShow(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20045>> {
            const localVarAxiosArgs = await PermissionsApiAxiosParamCreator(configuration).permissionShow(authorization, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update the specified permission.
         * @summary Update a specific permission
         * @param {UpdatePermissionIdBody} body 
         * @param {string} authorization JWT token
         * @param {number} permissionId Permission ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async permissionUpdate(body: UpdatePermissionIdBody, authorization: string, permissionId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20046>> {
            const localVarAxiosArgs = await PermissionsApiAxiosParamCreator(configuration).permissionUpdate(body, authorization, permissionId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update the specified permission.
         * @summary Update a specific permission
         * @param {StatusPermissionIdBody} body 
         * @param {string} authorization JWT token
         * @param {number} permissionId Permission ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async permissionUpdateStatus(body: StatusPermissionIdBody, authorization: string, permissionId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20046>> {
            const localVarAxiosArgs = await PermissionsApiAxiosParamCreator(configuration).permissionUpdateStatus(body, authorization, permissionId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Display a listing of the permissions.
         * @summary Get a list of permissions
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async permissionsIndex(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20044>> {
            const localVarAxiosArgs = await PermissionsApiAxiosParamCreator(configuration).permissionsIndex(authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * PermissionsApi - factory interface
 * @export
 */
export const PermissionsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Create a new permission.
         * @summary Create a new permission
         * @param {PermissionsCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        permissionCreate(body: PermissionsCreateBody, authorization: string, options?: any): AxiosPromise<InlineResponse2016> {
            return PermissionsApiFp(configuration).permissionCreate(body, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Remove the specified permission from storage.
         * @summary Delete a specific permission
         * @param {number} permissionId Permission ID
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        permissionDelete(permissionId: number, authorization: string, options?: any): AxiosPromise<InlineResponse20047> {
            return PermissionsApiFp(configuration).permissionDelete(permissionId, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Display the specified permission.
         * @summary Get a specific permission
         * @param {string} authorization JWT token
         * @param {number} id Permission ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        permissionShow(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20045> {
            return PermissionsApiFp(configuration).permissionShow(authorization, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Update the specified permission.
         * @summary Update a specific permission
         * @param {UpdatePermissionIdBody} body 
         * @param {string} authorization JWT token
         * @param {number} permissionId Permission ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        permissionUpdate(body: UpdatePermissionIdBody, authorization: string, permissionId: number, options?: any): AxiosPromise<InlineResponse20046> {
            return PermissionsApiFp(configuration).permissionUpdate(body, authorization, permissionId, options).then((request) => request(axios, basePath));
        },
        /**
         * Update the specified permission.
         * @summary Update a specific permission
         * @param {StatusPermissionIdBody} body 
         * @param {string} authorization JWT token
         * @param {number} permissionId Permission ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        permissionUpdateStatus(body: StatusPermissionIdBody, authorization: string, permissionId: number, options?: any): AxiosPromise<InlineResponse20046> {
            return PermissionsApiFp(configuration).permissionUpdateStatus(body, authorization, permissionId, options).then((request) => request(axios, basePath));
        },
        /**
         * Display a listing of the permissions.
         * @summary Get a list of permissions
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        permissionsIndex(authorization: string, options?: any): AxiosPromise<InlineResponse20044> {
            return PermissionsApiFp(configuration).permissionsIndex(authorization, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PermissionsApi - object-oriented interface
 * @export
 * @class PermissionsApi
 * @extends {BaseAPI}
 */
export class PermissionsApi extends BaseAPI {
    /**
     * Create a new permission.
     * @summary Create a new permission
     * @param {PermissionsCreateBody} body 
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PermissionsApi
     */
    public permissionCreate(body: PermissionsCreateBody, authorization: string, options?: any) {
        return PermissionsApiFp(this.configuration).permissionCreate(body, authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Remove the specified permission from storage.
     * @summary Delete a specific permission
     * @param {number} permissionId Permission ID
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PermissionsApi
     */
    public permissionDelete(permissionId: number, authorization: string, options?: any) {
        return PermissionsApiFp(this.configuration).permissionDelete(permissionId, authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Display the specified permission.
     * @summary Get a specific permission
     * @param {string} authorization JWT token
     * @param {number} id Permission ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PermissionsApi
     */
    public permissionShow(authorization: string, id: number, options?: any) {
        return PermissionsApiFp(this.configuration).permissionShow(authorization, id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update the specified permission.
     * @summary Update a specific permission
     * @param {UpdatePermissionIdBody} body 
     * @param {string} authorization JWT token
     * @param {number} permissionId Permission ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PermissionsApi
     */
    public permissionUpdate(body: UpdatePermissionIdBody, authorization: string, permissionId: number, options?: any) {
        return PermissionsApiFp(this.configuration).permissionUpdate(body, authorization, permissionId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update the specified permission.
     * @summary Update a specific permission
     * @param {StatusPermissionIdBody} body 
     * @param {string} authorization JWT token
     * @param {number} permissionId Permission ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PermissionsApi
     */
    public permissionUpdateStatus(body: StatusPermissionIdBody, authorization: string, permissionId: number, options?: any) {
        return PermissionsApiFp(this.configuration).permissionUpdateStatus(body, authorization, permissionId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Display a listing of the permissions.
     * @summary Get a list of permissions
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PermissionsApi
     */
    public permissionsIndex(authorization: string, options?: any) {
        return PermissionsApiFp(this.configuration).permissionsIndex(authorization, options).then((request) => request(this.axios, this.basePath));
    }
}
