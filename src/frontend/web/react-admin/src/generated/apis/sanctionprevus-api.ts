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
import { InlineResponse20082 } from '../models';
import { InlineResponse20083 } from '../models';
import { InlineResponse20084 } from '../models';
import { InlineResponse20085 } from '../models';
import { InlineResponse20112 } from '../models';
import { InlineResponse40034 } from '../models';
import { InlineResponse40035 } from '../models';
import { InlineResponse401 } from '../models';
import { InlineResponse40440 } from '../models';
import { InlineResponse40441 } from '../models';
import { InlineResponse40442 } from '../models';
import { InlineResponse4227 } from '../models';
/**
 * SanctionprevusApi - axios parameter creator
 * @export
 */
export const SanctionprevusApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a new sanctionprevu resource
         * @summary Create a new sanctionprevu
         * @param {string} libelle 
         * @param {string} niveauGravite 
         * @param {string} motif 
         * @param {string} dureeValidite 
         * @param {number} eleveId 
         * @param {number} convocationId 
         * @param {number} regleId 
         * @param {number} fauteId 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createSanctionPrevu: async (libelle: string, niveauGravite: string, motif: string, dureeValidite: string, eleveId: number, convocationId: number, regleId: number, fauteId: number, authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'libelle' is not null or undefined
            if (libelle === null || libelle === undefined) {
                throw new RequiredError('libelle','Required parameter libelle was null or undefined when calling createSanctionPrevu.');
            }
            // verify required parameter 'niveauGravite' is not null or undefined
            if (niveauGravite === null || niveauGravite === undefined) {
                throw new RequiredError('niveauGravite','Required parameter niveauGravite was null or undefined when calling createSanctionPrevu.');
            }
            // verify required parameter 'motif' is not null or undefined
            if (motif === null || motif === undefined) {
                throw new RequiredError('motif','Required parameter motif was null or undefined when calling createSanctionPrevu.');
            }
            // verify required parameter 'dureeValidite' is not null or undefined
            if (dureeValidite === null || dureeValidite === undefined) {
                throw new RequiredError('dureeValidite','Required parameter dureeValidite was null or undefined when calling createSanctionPrevu.');
            }
            // verify required parameter 'eleveId' is not null or undefined
            if (eleveId === null || eleveId === undefined) {
                throw new RequiredError('eleveId','Required parameter eleveId was null or undefined when calling createSanctionPrevu.');
            }
            // verify required parameter 'convocationId' is not null or undefined
            if (convocationId === null || convocationId === undefined) {
                throw new RequiredError('convocationId','Required parameter convocationId was null or undefined when calling createSanctionPrevu.');
            }
            // verify required parameter 'regleId' is not null or undefined
            if (regleId === null || regleId === undefined) {
                throw new RequiredError('regleId','Required parameter regleId was null or undefined when calling createSanctionPrevu.');
            }
            // verify required parameter 'fauteId' is not null or undefined
            if (fauteId === null || fauteId === undefined) {
                throw new RequiredError('fauteId','Required parameter fauteId was null or undefined when calling createSanctionPrevu.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling createSanctionPrevu.');
            }
            const localVarPath = `/api/sanctionprevus/create`;
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


            if (libelle !== undefined) { 
                localVarFormParams.append('libelle', libelle as any);
            }

            if (niveauGravite !== undefined) { 
                localVarFormParams.append('niveauGravite', niveauGravite as any);
            }

            if (motif !== undefined) { 
                localVarFormParams.append('motif', motif as any);
            }

            if (dureeValidite !== undefined) { 
                localVarFormParams.append('dureeValidite', dureeValidite as any);
            }

            if (eleveId !== undefined) { 
                localVarFormParams.append('eleveId', eleveId as any);
            }

            if (convocationId !== undefined) { 
                localVarFormParams.append('convocationId', convocationId as any);
            }

            if (regleId !== undefined) { 
                localVarFormParams.append('regleId', regleId as any);
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
         * Delete an sanctionprevu resource
         * @summary Delete an sanctionprevu
         * @param {string} authorization JWT token
         * @param {number} id ID of sanctionprevu to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteSanctionPrevu: async (authorization: string, id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling deleteSanctionPrevu.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteSanctionPrevu.');
            }
            const localVarPath = `/api/sanctionprevus/delete/{id}`
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
         * Retrieve a list of all sanctionprevus
         * @summary Get all sanctionprevus
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sanctionprevusIndex: async (authorization: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling sanctionprevusIndex.');
            }
            const localVarPath = `/api/sanctionprevus/findAll`;
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
         * Update a sanctionprevu's information
         * @summary Update a sanctionprevu's information
         * @param {string} libelle 
         * @param {string} niveauGravite 
         * @param {string} motif 
         * @param {string} dureeValidite 
         * @param {number} eleveId 
         * @param {number} convocationId 
         * @param {number} regleId 
         * @param {number} fauteId 
         * @param {string} authorization JWT token
         * @param {number} sanctionprevuId ID of sanctionprevu to update in this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateSanctionPrevu: async (libelle: string, niveauGravite: string, motif: string, dureeValidite: string, eleveId: number, convocationId: number, regleId: number, fauteId: number, authorization: string, sanctionprevuId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'libelle' is not null or undefined
            if (libelle === null || libelle === undefined) {
                throw new RequiredError('libelle','Required parameter libelle was null or undefined when calling updateSanctionPrevu.');
            }
            // verify required parameter 'niveauGravite' is not null or undefined
            if (niveauGravite === null || niveauGravite === undefined) {
                throw new RequiredError('niveauGravite','Required parameter niveauGravite was null or undefined when calling updateSanctionPrevu.');
            }
            // verify required parameter 'motif' is not null or undefined
            if (motif === null || motif === undefined) {
                throw new RequiredError('motif','Required parameter motif was null or undefined when calling updateSanctionPrevu.');
            }
            // verify required parameter 'dureeValidite' is not null or undefined
            if (dureeValidite === null || dureeValidite === undefined) {
                throw new RequiredError('dureeValidite','Required parameter dureeValidite was null or undefined when calling updateSanctionPrevu.');
            }
            // verify required parameter 'eleveId' is not null or undefined
            if (eleveId === null || eleveId === undefined) {
                throw new RequiredError('eleveId','Required parameter eleveId was null or undefined when calling updateSanctionPrevu.');
            }
            // verify required parameter 'convocationId' is not null or undefined
            if (convocationId === null || convocationId === undefined) {
                throw new RequiredError('convocationId','Required parameter convocationId was null or undefined when calling updateSanctionPrevu.');
            }
            // verify required parameter 'regleId' is not null or undefined
            if (regleId === null || regleId === undefined) {
                throw new RequiredError('regleId','Required parameter regleId was null or undefined when calling updateSanctionPrevu.');
            }
            // verify required parameter 'fauteId' is not null or undefined
            if (fauteId === null || fauteId === undefined) {
                throw new RequiredError('fauteId','Required parameter fauteId was null or undefined when calling updateSanctionPrevu.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling updateSanctionPrevu.');
            }
            // verify required parameter 'sanctionprevuId' is not null or undefined
            if (sanctionprevuId === null || sanctionprevuId === undefined) {
                throw new RequiredError('sanctionprevuId','Required parameter sanctionprevuId was null or undefined when calling updateSanctionPrevu.');
            }
            const localVarPath = `/api/sanctionprevus/update/{sanctionprevuId}`
                .replace(`{${"sanctionprevuId"}}`, encodeURIComponent(String(sanctionprevuId)));
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


            if (libelle !== undefined) { 
                localVarFormParams.append('libelle', libelle as any);
            }

            if (niveauGravite !== undefined) { 
                localVarFormParams.append('niveauGravite', niveauGravite as any);
            }

            if (motif !== undefined) { 
                localVarFormParams.append('motif', motif as any);
            }

            if (dureeValidite !== undefined) { 
                localVarFormParams.append('dureeValidite', dureeValidite as any);
            }

            if (eleveId !== undefined) { 
                localVarFormParams.append('eleveId', eleveId as any);
            }

            if (convocationId !== undefined) { 
                localVarFormParams.append('convocationId', convocationId as any);
            }

            if (regleId !== undefined) { 
                localVarFormParams.append('regleId', regleId as any);
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
         * Get information about a specific sanctionprevu
         * @summary Get sanctionprevu information
         * @param {string} authorization JWT token
         * @param {number} id ID of sanctionprevu to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewSanctionPrevu: async (authorization: string, id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization','Required parameter authorization was null or undefined when calling viewSanctionPrevu.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling viewSanctionPrevu.');
            }
            const localVarPath = `/api/sanctionprevus/findOne/{id}`
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
 * SanctionprevusApi - functional programming interface
 * @export
 */
export const SanctionprevusApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Create a new sanctionprevu resource
         * @summary Create a new sanctionprevu
         * @param {string} libelle 
         * @param {string} niveauGravite 
         * @param {string} motif 
         * @param {string} dureeValidite 
         * @param {number} eleveId 
         * @param {number} convocationId 
         * @param {number} regleId 
         * @param {number} fauteId 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createSanctionPrevu(libelle: string, niveauGravite: string, motif: string, dureeValidite: string, eleveId: number, convocationId: number, regleId: number, fauteId: number, authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20112>> {
            const localVarAxiosArgs = await SanctionprevusApiAxiosParamCreator(configuration).createSanctionPrevu(libelle, niveauGravite, motif, dureeValidite, eleveId, convocationId, regleId, fauteId, authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Delete an sanctionprevu resource
         * @summary Delete an sanctionprevu
         * @param {string} authorization JWT token
         * @param {number} id ID of sanctionprevu to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteSanctionPrevu(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20085>> {
            const localVarAxiosArgs = await SanctionprevusApiAxiosParamCreator(configuration).deleteSanctionPrevu(authorization, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieve a list of all sanctionprevus
         * @summary Get all sanctionprevus
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sanctionprevusIndex(authorization: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20082>> {
            const localVarAxiosArgs = await SanctionprevusApiAxiosParamCreator(configuration).sanctionprevusIndex(authorization, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update a sanctionprevu's information
         * @summary Update a sanctionprevu's information
         * @param {string} libelle 
         * @param {string} niveauGravite 
         * @param {string} motif 
         * @param {string} dureeValidite 
         * @param {number} eleveId 
         * @param {number} convocationId 
         * @param {number} regleId 
         * @param {number} fauteId 
         * @param {string} authorization JWT token
         * @param {number} sanctionprevuId ID of sanctionprevu to update in this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateSanctionPrevu(libelle: string, niveauGravite: string, motif: string, dureeValidite: string, eleveId: number, convocationId: number, regleId: number, fauteId: number, authorization: string, sanctionprevuId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20084>> {
            const localVarAxiosArgs = await SanctionprevusApiAxiosParamCreator(configuration).updateSanctionPrevu(libelle, niveauGravite, motif, dureeValidite, eleveId, convocationId, regleId, fauteId, authorization, sanctionprevuId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get information about a specific sanctionprevu
         * @summary Get sanctionprevu information
         * @param {string} authorization JWT token
         * @param {number} id ID of sanctionprevu to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async viewSanctionPrevu(authorization: string, id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20083>> {
            const localVarAxiosArgs = await SanctionprevusApiAxiosParamCreator(configuration).viewSanctionPrevu(authorization, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * SanctionprevusApi - factory interface
 * @export
 */
export const SanctionprevusApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Create a new sanctionprevu resource
         * @summary Create a new sanctionprevu
         * @param {string} libelle 
         * @param {string} niveauGravite 
         * @param {string} motif 
         * @param {string} dureeValidite 
         * @param {number} eleveId 
         * @param {number} convocationId 
         * @param {number} regleId 
         * @param {number} fauteId 
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createSanctionPrevu(libelle: string, niveauGravite: string, motif: string, dureeValidite: string, eleveId: number, convocationId: number, regleId: number, fauteId: number, authorization: string, options?: any): AxiosPromise<InlineResponse20112> {
            return SanctionprevusApiFp(configuration).createSanctionPrevu(libelle, niveauGravite, motif, dureeValidite, eleveId, convocationId, regleId, fauteId, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete an sanctionprevu resource
         * @summary Delete an sanctionprevu
         * @param {string} authorization JWT token
         * @param {number} id ID of sanctionprevu to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteSanctionPrevu(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20085> {
            return SanctionprevusApiFp(configuration).deleteSanctionPrevu(authorization, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieve a list of all sanctionprevus
         * @summary Get all sanctionprevus
         * @param {string} authorization JWT token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sanctionprevusIndex(authorization: string, options?: any): AxiosPromise<InlineResponse20082> {
            return SanctionprevusApiFp(configuration).sanctionprevusIndex(authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * Update a sanctionprevu's information
         * @summary Update a sanctionprevu's information
         * @param {string} libelle 
         * @param {string} niveauGravite 
         * @param {string} motif 
         * @param {string} dureeValidite 
         * @param {number} eleveId 
         * @param {number} convocationId 
         * @param {number} regleId 
         * @param {number} fauteId 
         * @param {string} authorization JWT token
         * @param {number} sanctionprevuId ID of sanctionprevu to update in this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateSanctionPrevu(libelle: string, niveauGravite: string, motif: string, dureeValidite: string, eleveId: number, convocationId: number, regleId: number, fauteId: number, authorization: string, sanctionprevuId: number, options?: any): AxiosPromise<InlineResponse20084> {
            return SanctionprevusApiFp(configuration).updateSanctionPrevu(libelle, niveauGravite, motif, dureeValidite, eleveId, convocationId, regleId, fauteId, authorization, sanctionprevuId, options).then((request) => request(axios, basePath));
        },
        /**
         * Get information about a specific sanctionprevu
         * @summary Get sanctionprevu information
         * @param {string} authorization JWT token
         * @param {number} id ID of sanctionprevu to get information for
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewSanctionPrevu(authorization: string, id: number, options?: any): AxiosPromise<InlineResponse20083> {
            return SanctionprevusApiFp(configuration).viewSanctionPrevu(authorization, id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SanctionprevusApi - object-oriented interface
 * @export
 * @class SanctionprevusApi
 * @extends {BaseAPI}
 */
export class SanctionprevusApi extends BaseAPI {
    /**
     * Create a new sanctionprevu resource
     * @summary Create a new sanctionprevu
     * @param {string} libelle 
     * @param {string} niveauGravite 
     * @param {string} motif 
     * @param {string} dureeValidite 
     * @param {number} eleveId 
     * @param {number} convocationId 
     * @param {number} regleId 
     * @param {number} fauteId 
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SanctionprevusApi
     */
    public createSanctionPrevu(libelle: string, niveauGravite: string, motif: string, dureeValidite: string, eleveId: number, convocationId: number, regleId: number, fauteId: number, authorization: string, options?: any) {
        return SanctionprevusApiFp(this.configuration).createSanctionPrevu(libelle, niveauGravite, motif, dureeValidite, eleveId, convocationId, regleId, fauteId, authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Delete an sanctionprevu resource
     * @summary Delete an sanctionprevu
     * @param {string} authorization JWT token
     * @param {number} id ID of sanctionprevu to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SanctionprevusApi
     */
    public deleteSanctionPrevu(authorization: string, id: number, options?: any) {
        return SanctionprevusApiFp(this.configuration).deleteSanctionPrevu(authorization, id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Retrieve a list of all sanctionprevus
     * @summary Get all sanctionprevus
     * @param {string} authorization JWT token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SanctionprevusApi
     */
    public sanctionprevusIndex(authorization: string, options?: any) {
        return SanctionprevusApiFp(this.configuration).sanctionprevusIndex(authorization, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update a sanctionprevu's information
     * @summary Update a sanctionprevu's information
     * @param {string} libelle 
     * @param {string} niveauGravite 
     * @param {string} motif 
     * @param {string} dureeValidite 
     * @param {number} eleveId 
     * @param {number} convocationId 
     * @param {number} regleId 
     * @param {number} fauteId 
     * @param {string} authorization JWT token
     * @param {number} sanctionprevuId ID of sanctionprevu to update in this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SanctionprevusApi
     */
    public updateSanctionPrevu(libelle: string, niveauGravite: string, motif: string, dureeValidite: string, eleveId: number, convocationId: number, regleId: number, fauteId: number, authorization: string, sanctionprevuId: number, options?: any) {
        return SanctionprevusApiFp(this.configuration).updateSanctionPrevu(libelle, niveauGravite, motif, dureeValidite, eleveId, convocationId, regleId, fauteId, authorization, sanctionprevuId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get information about a specific sanctionprevu
     * @summary Get sanctionprevu information
     * @param {string} authorization JWT token
     * @param {number} id ID of sanctionprevu to get information for
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SanctionprevusApi
     */
    public viewSanctionPrevu(authorization: string, id: number, options?: any) {
        return SanctionprevusApiFp(this.configuration).viewSanctionPrevu(authorization, id, options).then((request) => request(this.axios, this.basePath));
    }
}
