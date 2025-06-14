// Utility type to extract the type of the first parameter of a function
export type FirstParameter<F extends Function> = F extends (firstArgs: infer U, ...restArgs: any[]) => any ? U : any;

