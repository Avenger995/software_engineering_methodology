export interface Token {
    refresh: string | null | undefined;
    access: string | null | undefined;
    groups: Array<string | null | undefined>;
}