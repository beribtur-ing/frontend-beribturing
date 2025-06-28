export const I18N_LANGUAGE = 'I18N_LANGUAGE';


export interface FailureMessage {
    exceptionName: string;
    exceptionMessage: string;
    exceptionCode?: string;
}

export declare const SortDirection: {
    readonly ASCENDING: "ASCENDING";
    readonly DESCENDING: "DESCENDING";
};


export interface Offset<T = any> {
    offset?: number;
    limit?: number;
    totalCount?: number;
    previous?: boolean;
    next?: boolean;
}

export interface FetchResponse<T = any> {
    fetchResult: T;
    requestFailed: boolean;
    failureMessage?: FailureMessage;
    offset: Offset<T extends Array<infer U> ? U : T>;
}

export interface QueryResponse<T> {
    result: T;
    offset: Offset;
  } 
