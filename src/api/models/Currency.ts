/* tslint:disable */
/* eslint-disable */
/**
 * Mock Entities API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Currency
 */
export interface Currency {
    /**
     * 
     * @type {string}
     * @memberof Currency
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof Currency
     */
    code: string;
    /**
     * 
     * @type {string}
     * @memberof Currency
     */
    name: string;
}

/**
 * Check if a given object implements the Currency interface.
 */
export function instanceOfCurrency(value: object): value is Currency {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('code' in value) || value['code'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    return true;
}

export function CurrencyFromJSON(json: any): Currency {
    return CurrencyFromJSONTyped(json, false);
}

export function CurrencyFromJSONTyped(json: any, ignoreDiscriminator: boolean): Currency {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'code': json['code'],
        'name': json['name'],
    };
}

export function CurrencyToJSON(json: any): Currency {
    return CurrencyToJSONTyped(json, false);
}

export function CurrencyToJSONTyped(value?: Currency | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'code': value['code'],
        'name': value['name'],
    };
}

