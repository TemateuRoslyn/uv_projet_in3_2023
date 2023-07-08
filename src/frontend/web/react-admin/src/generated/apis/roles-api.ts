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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c89ec69 (Closes #315 - Suggestion notification added succesfully)
=======
>>>>>>> 9608888 (Closes #303 - Personnel Api integrated)
import { InlineResponse20080 } from '../models';
import { InlineResponse20081 } from '../models';
import { InlineResponse20082 } from '../models';
import { InlineResponse20083 } from '../models';
<<<<<<< HEAD
=======
import { InlineResponse20079 } from '../models';
import { InlineResponse20080 } from '../models';
import { InlineResponse20081 } from '../models';
import { InlineResponse20082 } from '../models';
>>>>>>> 65dfea4 (Closes #299 - admin api integrated)
=======
<<<<<<< HEAD
>>>>>>> c89ec69 (Closes #315 - Suggestion notification added succesfully)
=======
import { InlineResponse20079 } from '../models';
import { InlineResponse20080 } from '../models';
import { InlineResponse20081 } from '../models';
import { InlineResponse20082 } from '../models';
>>>>>>> 605364c (mainmaim)
>>>>>>> 9608888 (Closes #303 - Personnel Api integrated)
import { InlineResponse20111 } from '../models';
import { InlineResponse40032 } from '../models';
import { InlineResponse40033 } from '../models';
import { InlineResponse4004 } from '../models';
import { InlineResponse401 } from '../models';
import { InlineResponse40438 } from '../models';
import { InlineResponse40439 } from '../models';
import { InlineResponse40440 } from '../models';
import { InlineResponse4226 } from '../models';
import { RolesCreateBody } from '../models';
import { StatusRoleIdBody } from '../models';
import { UpdateRoleIdBody } from '../models';
/**
 * RolesApi - axios parameter creator
 * @export
 */
export const RolesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a new role resource
         * @summary Create a new role
         * @param {RolesCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createRole: async (body: RolesCreateBody, authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling createRole.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling createRole.');
            }
            const localVarPath = `/api/roles/create`;
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
         * Delete an role resource
         * @summary Delete an role
         * @param {string} authorization JWT token
         * @param {number} roleId ID of role to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteRole: async (authorization: string, roleId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling deleteRole.');
            }
            // verify required parameter 'roleId' is not null or undefined
            if (roleId === null || roleId === undefined) {
                throw new RequiredError('roleId','Required parameter roleId was null or undefined when calling deleteRole.');
            }
            const localVarPath = `/api/roles/delete/{roleId}`
                .replace(`{${"roleId"}}`, encodeURIComponent(String(roleId)));
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
         * Update the specified role.
         * @summary Update a specific role
         * @param {StatusRoleIdBody} body 
         * @param {string} authorization JWT token
         * @param {number} roleId Role ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        roleUpdateStatus: async (body: StatusRoleIdBody, authorization: string, roleId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling roleUpdateStatus.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling roleUpdateStatus.');
            }
            // verify required parameter 'roleId' is not null or undefined
            if (roleId === null || roleId === undefined) {
                throw new RequiredError('roleId','Required parameter roleId was null or undefined when calling roleUpdateStatus.');
            }
            const localVarPath = `/api/roles/update/status/{roleId}`
                .replace(`{${"roleId"}}`, encodeURIComponent(String(roleId)));
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
         * Retrieve a list of all roles
         * @summary Get all roles
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        rolesIndex: async (authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling rolesIndex.');
            }
            const localVarPath = `/api/roles/findAll`;
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
         * 
         * @summary Update a specific role
         * @param {UpdateRoleIdBody} body 
         * @param {string} authorization JWT token
         * @param {number} roleId ID of eleve to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateRole: async (body: UpdateRoleIdBody, authorization: string, roleId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateRole.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling updateRole.');
            }
            // verify required parameter 'roleId' is not null or undefined
            if (roleId === null || roleId === undefined) {
                throw new RequiredError('roleId','Required parameter roleId was null or undefined when calling updateRole.');
            }
            const localVarPath = `/api/roles/update/{roleId}`
                .replace(`{${"roleId"}}`, encodeURIComponent(String(roleId)));
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
         * Get information about a specific role
         * @summary Get role information
         * @param {string} authorization JWT token
         * @param {number} roleId ID of role to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewRole: async (authorization: string, roleId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling viewRole.');
            }
            // verify required parameter 'roleId' is not null or undefined
            if (roleId === null || roleId === undefined) {
                throw new RequiredError('roleId','Required parameter roleId was null or undefined when calling viewRole.');
            }
            const localVarPath = `/api/roles/findOne/{roleId}`
                .replace(`{${"roleId"}}`, encodeURIComponent(String(roleId)));
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
 * RolesApi - functional programming interface
 * @export
 */
export const RolesApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Create a new role resource
         * @summary Create a new role
         * @param {RolesCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createRole(body: RolesCreateBody, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20111>> {
            const localVarAxiosArgs = await RolesApiAxiosParamCreator(configuration).createRole(body, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Delete an role resource
         * @summary Delete an role
         * @param {string} authorization JWT token
         * @param {number} roleId ID of role to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
<<<<<<< HEAD
        async deleteRole(authorization: string, roleId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20083>> {
=======
        async deleteRole(authorization: string, roleId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20082>> {
>>>>>>> 65dfea4 (Closes #299 - admin api integrated)
=======
<<<<<<< HEAD
        async deleteRole(authorization: string, roleId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20083>> {
>>>>>>> c89ec69 (Closes #315 - Suggestion notification added succesfully)
=======
        async deleteRole(authorization: string, roleId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20082>> {
>>>>>>> 605364c (mainmaim)
>>>>>>> 9608888 (Closes #303 - Personnel Api integrated)
            const localVarAxiosArgs = await RolesApiAxiosParamCreator(configuration).deleteRole(authorization, roleId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update the specified role.
         * @summary Update a specific role
         * @param {StatusRoleIdBody} body 
         * @param {string} authorization JWT token
         * @param {number} roleId Role ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
<<<<<<< HEAD
        async roleUpdateStatus(body: StatusRoleIdBody, authorization: string, roleId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20082>> {
=======
        async roleUpdateStatus(body: StatusRoleIdBody, authorization: string, roleId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20081>> {
>>>>>>> 65dfea4 (Closes #299 - admin api integrated)
=======
<<<<<<< HEAD
        async roleUpdateStatus(body: StatusRoleIdBody, authorization: string, roleId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20082>> {
>>>>>>> c89ec69 (Closes #315 - Suggestion notification added succesfully)
=======
        async roleUpdateStatus(body: StatusRoleIdBody, authorization: string, roleId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20081>> {
>>>>>>> 605364c (mainmaim)
>>>>>>> 9608888 (Closes #303 - Personnel Api integrated)
            const localVarAxiosArgs = await RolesApiAxiosParamCreator(configuration).roleUpdateStatus(body, authorization, roleId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieve a list of all roles
         * @summary Get all roles
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
<<<<<<< HEAD
        async rolesIndex(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20080>> {
=======
        async rolesIndex(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20079>> {
>>>>>>> 65dfea4 (Closes #299 - admin api integrated)
=======
<<<<<<< HEAD
        async rolesIndex(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20080>> {
>>>>>>> c89ec69 (Closes #315 - Suggestion notification added succesfully)
=======
        async rolesIndex(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20079>> {
>>>>>>> 605364c (mainmaim)
>>>>>>> 9608888 (Closes #303 - Personnel Api integrated)
            const localVarAxiosArgs = await RolesApiAxiosParamCreator(configuration).rolesIndex(authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Update a specific role
         * @param {UpdateRoleIdBody} body 
         * @param {string} authorization JWT token
         * @param {number} roleId ID of eleve to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
<<<<<<< HEAD
        async updateRole(body: UpdateRoleIdBody, authorization: string, roleId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20081>> {
=======
        async updateRole(body: UpdateRoleIdBody, authorization: string, roleId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20080>> {
>>>>>>> 65dfea4 (Closes #299 - admin api integrated)
=======
<<<<<<< HEAD
        async updateRole(body: UpdateRoleIdBody, authorization: string, roleId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20081>> {
>>>>>>> c89ec69 (Closes #315 - Suggestion notification added succesfully)
=======
        async updateRole(body: UpdateRoleIdBody, authorization: string, roleId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20080>> {
>>>>>>> 605364c (mainmaim)
>>>>>>> 9608888 (Closes #303 - Personnel Api integrated)
            const localVarAxiosArgs = await RolesApiAxiosParamCreator(configuration).updateRole(body, authorization, roleId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get information about a specific role
         * @summary Get role information
         * @param {string} authorization JWT token
         * @param {number} roleId ID of role to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async viewRole(authorization: string, roleId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20111>> {
            const localVarAxiosArgs = await RolesApiAxiosParamCreator(configuration).viewRole(authorization, roleId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * RolesApi - factory interface
 * @export
 */
export const RolesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Create a new role resource
         * @summary Create a new role
         * @param {RolesCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createRole(body: RolesCreateBody, authorization: string, options?: any): AxiosPromise<InlineResponse20111> {
            return RolesApiFp(configuration).createRole(body, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete an role resource
         * @summary Delete an role
         * @param {string} authorization JWT token
         * @param {number} roleId ID of role to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
<<<<<<< HEAD
        deleteRole(authorization: string, roleId: number, options?: any): AxiosPromise<InlineResponse20083> {
=======
        deleteRole(authorization: string, roleId: number, options?: any): AxiosPromise<InlineResponse20082> {
>>>>>>> 65dfea4 (Closes #299 - admin api integrated)
=======
<<<<<<< HEAD
        deleteRole(authorization: string, roleId: number, options?: any): AxiosPromise<InlineResponse20083> {
>>>>>>> c89ec69 (Closes #315 - Suggestion notification added succesfully)
=======
        deleteRole(authorization: string, roleId: number, options?: any): AxiosPromise<InlineResponse20082> {
>>>>>>> 605364c (mainmaim)
>>>>>>> 9608888 (Closes #303 - Personnel Api integrated)
            return RolesApiFp(configuration).deleteRole(authorization, roleId, options).then((request) => request(axios, basePath));
        },
        /**
         * Update the specified role.
         * @summary Update a specific role
         * @param {StatusRoleIdBody} body 
         * @param {string} authorization JWT token
         * @param {number} roleId Role ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
<<<<<<< HEAD
        roleUpdateStatus(body: StatusRoleIdBody, authorization: string, roleId: number, options?: any): AxiosPromise<InlineResponse20082> {
=======
        roleUpdateStatus(body: StatusRoleIdBody, authorization: string, roleId: number, options?: any): AxiosPromise<InlineResponse20081> {
>>>>>>> 65dfea4 (Closes #299 - admin api integrated)
=======
<<<<<<< HEAD
        roleUpdateStatus(body: StatusRoleIdBody, authorization: string, roleId: number, options?: any): AxiosPromise<InlineResponse20082> {
>>>>>>> c89ec69 (Closes #315 - Suggestion notification added succesfully)
=======
        roleUpdateStatus(body: StatusRoleIdBody, authorization: string, roleId: number, options?: any): AxiosPromise<InlineResponse20081> {
>>>>>>> 605364c (mainmaim)
>>>>>>> 9608888 (Closes #303 - Personnel Api integrated)
            return RolesApiFp(configuration).roleUpdateStatus(body, authorization, roleId, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieve a list of all roles
         * @summary Get all roles
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
<<<<<<< HEAD
        rolesIndex(authorization: string, options?: any): AxiosPromise<InlineResponse20080> {
=======
        rolesIndex(authorization: string, options?: any): AxiosPromise<InlineResponse20079> {
>>>>>>> 65dfea4 (Closes #299 - admin api integrated)
=======
<<<<<<< HEAD
        rolesIndex(authorization: string, options?: any): AxiosPromise<InlineResponse20080> {
>>>>>>> c89ec69 (Closes #315 - Suggestion notification added succesfully)
=======
        rolesIndex(authorization: string, options?: any): AxiosPromise<InlineResponse20079> {
>>>>>>> 605364c (mainmaim)
>>>>>>> 9608888 (Closes #303 - Personnel Api integrated)
            return RolesApiFp(configuration).rolesIndex(authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a specific role
         * @param {UpdateRoleIdBody} body 
         * @param {string} authorization JWT token
         * @param {number} roleId ID of eleve to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
<<<<<<< HEAD
        updateRole(body: UpdateRoleIdBody, authorization: string, roleId: number, options?: any): AxiosPromise<InlineResponse20081> {
=======
        updateRole(body: UpdateRoleIdBody, authorization: string, roleId: number, options?: any): AxiosPromise<InlineResponse20080> {
>>>>>>> 65dfea4 (Closes #299 - admin api integrated)
=======
<<<<<<< HEAD
        updateRole(body: UpdateRoleIdBody, authorization: string, roleId: number, options?: any): AxiosPromise<InlineResponse20081> {
>>>>>>> c89ec69 (Closes #315 - Suggestion notification added succesfully)
=======
        updateRole(body: UpdateRoleIdBody, authorization: string, roleId: number, options?: any): AxiosPromise<InlineResponse20080> {
>>>>>>> 605364c (mainmaim)
>>>>>>> 9608888 (Closes #303 - Personnel Api integrated)
            return RolesApiFp(configuration).updateRole(body, authorization, roleId, options).then((request) => request(axios, basePath));
        },
        /**
         * Get information about a specific role
         * @summary Get role information
         * @param {string} authorization JWT token
         * @param {number} roleId ID of role to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewRole(authorization: string, roleId: number, options?: any): AxiosPromise<InlineResponse20111> {
            return RolesApiFp(configuration).viewRole(authorization, roleId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * RolesApi - object-oriented interface
 * @export
 * @class RolesApi
 * @extends {BaseAPI}
 */
export class RolesApi extends BaseAPI {
    /**
     * Create a new role resource
     * @summary Create a new role
     * @param {RolesCreateBody} body 
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RolesApi
     */
    public createRole(body: RolesCreateBody, authorization: string, options?: any) {
        return RolesApiFp(this.configuration).createRole(body, authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Delete an role resource
     * @summary Delete an role
     * @param {string} authorization JWT token
     * @param {number} roleId ID of role to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RolesApi
     */
    public deleteRole(authorization: string, roleId: number, options?: any) {
        return RolesApiFp(this.configuration).deleteRole(authorization, roleId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update the specified role.
     * @summary Update a specific role
     * @param {StatusRoleIdBody} body 
     * @param {string} authorization JWT token
     * @param {number} roleId Role ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RolesApi
     */
    public roleUpdateStatus(body: StatusRoleIdBody, authorization: string, roleId: number, options?: any) {
        return RolesApiFp(this.configuration).roleUpdateStatus(body, authorization, roleId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Retrieve a list of all roles
     * @summary Get all roles
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RolesApi
     */
    public rolesIndex(authorization: string, options?: any) {
        return RolesApiFp(this.configuration).rolesIndex(authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary Update a specific role
     * @param {UpdateRoleIdBody} body 
     * @param {string} authorization JWT token
     * @param {number} roleId ID of eleve to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RolesApi
     */
    public updateRole(body: UpdateRoleIdBody, authorization: string, roleId: number, options?: any) {
        return RolesApiFp(this.configuration).updateRole(body, authorization, roleId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get information about a specific role
     * @summary Get role information
     * @param {string} authorization JWT token
     * @param {number} roleId ID of role to get information for
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RolesApi
     */
    public viewRole(authorization: string, roleId: number, options?: any) {
        return RolesApiFp(this.configuration).viewRole(authorization, roleId, options).then((request) => request(this.axios, this.basePath));
    }
}
