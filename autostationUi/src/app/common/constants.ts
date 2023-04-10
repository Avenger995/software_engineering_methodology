import { environment } from "src/environments/environment.development"

export class ApiPath {
    public static Token = environment.apiUrl + 'token/';

    public static RefreashToken = environment.apiUrl + 'refresh/'

    public static VerifyToken = environment.apiUrl + 'verify/'
}

export class LocalStorageConstants {
    public static Token = 'token';
}