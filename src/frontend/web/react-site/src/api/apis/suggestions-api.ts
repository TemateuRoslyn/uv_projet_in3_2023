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
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
=======
<<<<<<< HEAD:src/frontend/web/react-site/src/api/apis/suggestions-api.ts
=======
<<<<<<< HEAD
import { InlineResponse20086 } from '../models';
import { InlineResponse20087 } from '../models';
>>>>>>> fa5994b (maj reglement interieur):src/frontend/web/react-site/src/generated/apis/suggestions-api.ts
>>>>>>> 0b7e9d7 (Testing)
<<<<<<< HEAD
=======
>>>>>>> 707866f4 (Closes #318 -présentation du website)
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
import { InlineResponse20088 } from '../models';
import { InlineResponse20089 } from '../models';
import { InlineResponse20090 } from '../models';
import { InlineResponse20091 } from '../models';
import { InlineResponse40035 } from '../models';
import { InlineResponse40036 } from '../models';
import { InlineResponse401 } from '../models';
import { InlineResponse40445 } from '../models';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
import { InlineResponse40446 } from '../models';
=======
<<<<<<< HEAD:src/frontend/web/react-site/src/api/apis/suggestions-api.ts
import { InlineResponse40446 } from '../models';
=======
=======
import { InlineResponse20085 } from '../models';
import { InlineResponse20086 } from '../models';
import { InlineResponse20087 } from '../models';
import { InlineResponse20088 } from '../models';
import { InlineResponse40036 } from '../models';
import { InlineResponse40037 } from '../models';
import { InlineResponse401 } from '../models';
import { InlineResponse40443 } from '../models';
import { InlineResponse40444 } from '../models';
>>>>>>> 7faa1c6 (maj reglement interieur)
>>>>>>> fa5994b (maj reglement interieur):src/frontend/web/react-site/src/generated/apis/suggestions-api.ts
>>>>>>> 0b7e9d7 (Testing)
<<<<<<< HEAD
=======
import { InlineResponse40446 } from '../models';
>>>>>>> 707866f4 (Closes #318 -présentation du website)
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
import { SuggestionCreateBody } from '../models';
import { UpdateCoursIdBody1 } from '../models';
/**
 * SuggestionsApi - axios parameter creator
 * @export
 */
export const SuggestionsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a new suggestion resource
         * @summary Create a new suggestion
         * @param {SuggestionCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createSuggestion: async (body: SuggestionCreateBody, authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling createSuggestion.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling createSuggestion.');
            }
            const localVarPath = `/api/suggestion/create`;
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
         * Retrieve a list of all suggestions
         * @summary Get all suggestions
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAllSuggestion: async (authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling findAllSuggestion.');
            }
            const localVarPath = `/api/suggestion/findAll`;
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
         * Get information about a specific suggestion
         * @summary Get suggestion information
         * @param {string} authorization JWT token
         * @param {number} id ID of suggestion to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findOneSuggestion: async (authorization: string, id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling findOneSuggestion.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling findOneSuggestion.');
            }
            const localVarPath = `/api/suggestion/findOne/{id}`
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
         * Update a suggestion's information
         * @summary Update a suggestion's information
         * @param {UpdateCoursIdBody1} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateSuggestion: async (body: UpdateCoursIdBody1, authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateSuggestion.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling updateSuggestion.');
            }
            const localVarPath = `/api/suggestion/update/{coursId}`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
=======
<<<<<<< HEAD
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
=======
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
>>>>>>> 7faa1c6 (maj reglement interieur)
>>>>>>> 0b7e9d7 (Testing)
<<<<<<< HEAD
=======
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
>>>>>>> 707866f4 (Closes #318 -présentation du website)
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
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
 * SuggestionsApi - functional programming interface
 * @export
 */
export const SuggestionsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Create a new suggestion resource
         * @summary Create a new suggestion
         * @param {SuggestionCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
        async createSuggestion(body: SuggestionCreateBody, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20090>> {
=======
<<<<<<< HEAD:src/frontend/web/react-site/src/api/apis/suggestions-api.ts
        async createSuggestion(body: SuggestionCreateBody, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20090>> {
=======
<<<<<<< HEAD
        async createSuggestion(body: SuggestionCreateBody, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20088>> {
=======
        async createSuggestion(body: SuggestionCreateBody, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20087>> {
>>>>>>> 7faa1c6 (maj reglement interieur)
>>>>>>> fa5994b (maj reglement interieur):src/frontend/web/react-site/src/generated/apis/suggestions-api.ts
>>>>>>> 0b7e9d7 (Testing)
<<<<<<< HEAD
=======
        async createSuggestion(body: SuggestionCreateBody, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20090>> {
>>>>>>> 707866f4 (Closes #318 -présentation du website)
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
            const localVarAxiosArgs = await SuggestionsApiAxiosParamCreator(configuration).createSuggestion(body, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieve a list of all suggestions
         * @summary Get all suggestions
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
        async findAllSuggestion(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20088>> {
=======
<<<<<<< HEAD:src/frontend/web/react-site/src/api/apis/suggestions-api.ts
        async findAllSuggestion(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20088>> {
=======
<<<<<<< HEAD
        async findAllSuggestion(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20086>> {
=======
        async findAllSuggestion(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20085>> {
>>>>>>> 7faa1c6 (maj reglement interieur)
>>>>>>> fa5994b (maj reglement interieur):src/frontend/web/react-site/src/generated/apis/suggestions-api.ts
>>>>>>> 0b7e9d7 (Testing)
<<<<<<< HEAD
=======
        async findAllSuggestion(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20088>> {
>>>>>>> 707866f4 (Closes #318 -présentation du website)
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
            const localVarAxiosArgs = await SuggestionsApiAxiosParamCreator(configuration).findAllSuggestion(authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get information about a specific suggestion
         * @summary Get suggestion information
         * @param {string} authorization JWT token
         * @param {number} id ID of suggestion to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
        async findOneSuggestion(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20089>> {
=======
<<<<<<< HEAD:src/frontend/web/react-site/src/api/apis/suggestions-api.ts
        async findOneSuggestion(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20089>> {
=======
<<<<<<< HEAD
        async findOneSuggestion(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20087>> {
=======
        async findOneSuggestion(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20086>> {
>>>>>>> 7faa1c6 (maj reglement interieur)
>>>>>>> fa5994b (maj reglement interieur):src/frontend/web/react-site/src/generated/apis/suggestions-api.ts
>>>>>>> 0b7e9d7 (Testing)
<<<<<<< HEAD
=======
        async findOneSuggestion(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20089>> {
>>>>>>> 707866f4 (Closes #318 -présentation du website)
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
            const localVarAxiosArgs = await SuggestionsApiAxiosParamCreator(configuration).findOneSuggestion(authorization, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update a suggestion's information
         * @summary Update a suggestion's information
         * @param {UpdateCoursIdBody1} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
        async updateSuggestion(body: UpdateCoursIdBody1, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20091>> {
=======
<<<<<<< HEAD:src/frontend/web/react-site/src/api/apis/suggestions-api.ts
        async updateSuggestion(body: UpdateCoursIdBody1, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20091>> {
=======
<<<<<<< HEAD
        async updateSuggestion(body: UpdateCoursIdBody1, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20089>> {
=======
        async updateSuggestion(body: UpdateCoursIdBody1, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20088>> {
>>>>>>> 7faa1c6 (maj reglement interieur)
>>>>>>> fa5994b (maj reglement interieur):src/frontend/web/react-site/src/generated/apis/suggestions-api.ts
>>>>>>> 0b7e9d7 (Testing)
<<<<<<< HEAD
=======
        async updateSuggestion(body: UpdateCoursIdBody1, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20091>> {
>>>>>>> 707866f4 (Closes #318 -présentation du website)
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
            const localVarAxiosArgs = await SuggestionsApiAxiosParamCreator(configuration).updateSuggestion(body, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * SuggestionsApi - factory interface
 * @export
 */
export const SuggestionsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Create a new suggestion resource
         * @summary Create a new suggestion
         * @param {SuggestionCreateBody} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
        createSuggestion(body: SuggestionCreateBody, authorization: string, options?: any): AxiosPromise<InlineResponse20090> {
=======
<<<<<<< HEAD:src/frontend/web/react-site/src/api/apis/suggestions-api.ts
        createSuggestion(body: SuggestionCreateBody, authorization: string, options?: any): AxiosPromise<InlineResponse20090> {
=======
<<<<<<< HEAD
        createSuggestion(body: SuggestionCreateBody, authorization: string, options?: any): AxiosPromise<InlineResponse20088> {
=======
        createSuggestion(body: SuggestionCreateBody, authorization: string, options?: any): AxiosPromise<InlineResponse20087> {
>>>>>>> 7faa1c6 (maj reglement interieur)
>>>>>>> fa5994b (maj reglement interieur):src/frontend/web/react-site/src/generated/apis/suggestions-api.ts
>>>>>>> 0b7e9d7 (Testing)
<<<<<<< HEAD
=======
        createSuggestion(body: SuggestionCreateBody, authorization: string, options?: any): AxiosPromise<InlineResponse20090> {
>>>>>>> 707866f4 (Closes #318 -présentation du website)
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
            return SuggestionsApiFp(configuration).createSuggestion(body, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieve a list of all suggestions
         * @summary Get all suggestions
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
        findAllSuggestion(authorization: string, options?: any): AxiosPromise<InlineResponse20088> {
=======
<<<<<<< HEAD:src/frontend/web/react-site/src/api/apis/suggestions-api.ts
        findAllSuggestion(authorization: string, options?: any): AxiosPromise<InlineResponse20088> {
=======
<<<<<<< HEAD
        findAllSuggestion(authorization: string, options?: any): AxiosPromise<InlineResponse20086> {
=======
        findAllSuggestion(authorization: string, options?: any): AxiosPromise<InlineResponse20085> {
>>>>>>> 7faa1c6 (maj reglement interieur)
>>>>>>> fa5994b (maj reglement interieur):src/frontend/web/react-site/src/generated/apis/suggestions-api.ts
>>>>>>> 0b7e9d7 (Testing)
<<<<<<< HEAD
=======
        findAllSuggestion(authorization: string, options?: any): AxiosPromise<InlineResponse20088> {
>>>>>>> 707866f4 (Closes #318 -présentation du website)
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
            return SuggestionsApiFp(configuration).findAllSuggestion(authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Get information about a specific suggestion
         * @summary Get suggestion information
         * @param {string} authorization JWT token
         * @param {number} id ID of suggestion to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
        findOneSuggestion(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20089> {
=======
<<<<<<< HEAD:src/frontend/web/react-site/src/api/apis/suggestions-api.ts
        findOneSuggestion(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20089> {
=======
<<<<<<< HEAD
        findOneSuggestion(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20087> {
=======
        findOneSuggestion(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20086> {
>>>>>>> 7faa1c6 (maj reglement interieur)
>>>>>>> fa5994b (maj reglement interieur):src/frontend/web/react-site/src/generated/apis/suggestions-api.ts
>>>>>>> 0b7e9d7 (Testing)
<<<<<<< HEAD
=======
        findOneSuggestion(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20089> {
>>>>>>> 707866f4 (Closes #318 -présentation du website)
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
            return SuggestionsApiFp(configuration).findOneSuggestion(authorization, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Update a suggestion's information
         * @summary Update a suggestion's information
         * @param {UpdateCoursIdBody1} body 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
        updateSuggestion(body: UpdateCoursIdBody1, authorization: string, options?: any): AxiosPromise<InlineResponse20091> {
=======
<<<<<<< HEAD:src/frontend/web/react-site/src/api/apis/suggestions-api.ts
        updateSuggestion(body: UpdateCoursIdBody1, authorization: string, options?: any): AxiosPromise<InlineResponse20091> {
=======
<<<<<<< HEAD
        updateSuggestion(body: UpdateCoursIdBody1, authorization: string, options?: any): AxiosPromise<InlineResponse20089> {
=======
        updateSuggestion(body: UpdateCoursIdBody1, authorization: string, options?: any): AxiosPromise<InlineResponse20088> {
>>>>>>> 7faa1c6 (maj reglement interieur)
>>>>>>> fa5994b (maj reglement interieur):src/frontend/web/react-site/src/generated/apis/suggestions-api.ts
>>>>>>> 0b7e9d7 (Testing)
<<<<<<< HEAD
=======
        updateSuggestion(body: UpdateCoursIdBody1, authorization: string, options?: any): AxiosPromise<InlineResponse20091> {
>>>>>>> 707866f4 (Closes #318 -présentation du website)
=======
>>>>>>> da80021 (Closes #327 - Sanction prevu integrated)
            return SuggestionsApiFp(configuration).updateSuggestion(body, authorization, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SuggestionsApi - object-oriented interface
 * @export
 * @class SuggestionsApi
 * @extends {BaseAPI}
 */
export class SuggestionsApi extends BaseAPI {
    /**
     * Create a new suggestion resource
     * @summary Create a new suggestion
     * @param {SuggestionCreateBody} body 
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SuggestionsApi
     */
    public createSuggestion(body: SuggestionCreateBody, authorization: string, options?: any) {
        return SuggestionsApiFp(this.configuration).createSuggestion(body, authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Retrieve a list of all suggestions
     * @summary Get all suggestions
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SuggestionsApi
     */
    public findAllSuggestion(authorization: string, options?: any) {
        return SuggestionsApiFp(this.configuration).findAllSuggestion(authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get information about a specific suggestion
     * @summary Get suggestion information
     * @param {string} authorization JWT token
     * @param {number} id ID of suggestion to get information for
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SuggestionsApi
     */
    public findOneSuggestion(authorization: string, id: number, options?: any) {
        return SuggestionsApiFp(this.configuration).findOneSuggestion(authorization, id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update a suggestion's information
     * @summary Update a suggestion's information
     * @param {UpdateCoursIdBody1} body 
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SuggestionsApi
     */
    public updateSuggestion(body: UpdateCoursIdBody1, authorization: string, options?: any) {
        return SuggestionsApiFp(this.configuration).updateSuggestion(body, authorization, options).then((request) => request(this.axios, this.basePath));
    }
}
