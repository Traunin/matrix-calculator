export interface RationalRoot {
    k: string;
    rationalSubtraction: { [key: string]: string };
}

export type Root = { k: 'R' } | RationalRoot;