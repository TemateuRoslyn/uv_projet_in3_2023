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
import { AuthLoginBody } from '../models';
import { AuthRegisterBody } from '../models';
import { InlineResponse200 } from '../models';
import { InlineResponse2001 } from '../models';
import { InlineResponse201 } from '../models';
import { InlineResponse400 } from '../models';
import { InlineResponse401 } from '../models';
import { InlineResponse4011 } from '../models';
import { InlineResponse422 } from '../models';
/**
 * AuthApi - axios parameter creator
 * @export
 */
export const AuthApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Login by email, password
         * @summary Sign in
         * @param {AuthLoginBody} body Pass user credentials
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authLogin: async (body: AuthLoginBody, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling authLogin.');
            }
            const localVarPath = `/api/auth/login`;
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
         * Invalidate token and log out user
         * @summary Logout
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authLogout: async (authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling authLogout.');
            }
            const localVarPath = `/api/auth/logout`;
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
         * Register a new user
         * @summary Register
         * @param {AuthRegisterBody} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authRegister: async (body: AuthRegisterBody, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling authRegister.');
            }
            const localVarPath = `/api/auth/register`;
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
         * Get details of the authenticated user
         * @summary Get user details
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authUser: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/auth/user`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
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
    }
};

/**
 * AuthApi - functional programming interface
 * @export
 */
export const AuthApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Login by email, password
         * @summary Sign in
         * @param {AuthLoginBody} body Pass user credentials
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authLogin(body: AuthLoginBody, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse201>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).authLogin(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Invalidate token and log out user
         * @summary Logout
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authLogout(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2001>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).authLogout(authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Register a new user
         * @summary Register
         * @param {AuthRegisterBody} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authRegister(body: AuthRegisterBody, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse201>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).authRegister(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get details of the authenticated user
         * @summary Get user details
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authUser(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse200>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).authUser(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * AuthApi - factory interface
 * @export
 */
export const AuthApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Login by email, password
         * @summary Sign in
         * @param {AuthLoginBody} body Pass user credentials
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authLogin(body: AuthLoginBody, options?: any): AxiosPromise<InlineResponse201> {
            return AuthApiFp(configuration).authLogin(body, options).then((request) => request(axios, basePath));
        },
        /**
         * Invalidate token and log out user
         * @summary Logout
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authLogout(authorization: string, options?: any): AxiosPromise<InlineResponse2001> {
            return AuthApiFp(configuration).authLogout(authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Register a new user
         * @summary Register
         * @param {AuthRegisterBody} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authRegister(body: AuthRegisterBody, options?: any): AxiosPromise<InlineResponse201> {
            return AuthApiFp(configuration).authRegister(body, options).then((request) => request(axios, basePath));
        },
        /**
         * Get details of the authenticated user
         * @summary Get user details
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authUser(options?: any): AxiosPromise<InlineResponse200> {
            return AuthApiFp(configuration).authUser(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AuthApi - object-oriented interface
 * @export
 * @class AuthApi
 * @extends {BaseAPI}
 */
export class AuthApi extends BaseAPI {
    /**
     * Login by email, password
     * @summary Sign in
     * @param {AuthLoginBody} body Pass user credentials
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authLogin(body: AuthLoginBody, options?: any) {
        return AuthApiFp(this.configuration).authLogin(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Invalidate token and log out user
     * @summary Logout
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authLogout(authorization: string, options?: any) {
        return AuthApiFp(this.configuration).authLogout(authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Register a new user
     * @summary Register
     * @param {AuthRegisterBody} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authRegister(body: AuthRegisterBody, options?: any) {
        return AuthApiFp(this.configuration).authRegister(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get details of the authenticated user
     * @summary Get user details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authUser(options?: any) {
        return AuthApiFp(this.configuration).authUser(options).then((request) => request(this.axios, this.basePath));
    }
}
