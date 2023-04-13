import { environment } from "src/environments/environment.development"

export class ApiPath {
    public static Token = environment.apiUrl + 'token/';

    public static RefreashToken = environment.apiUrl + 'refresh/'

    public static VerifyToken = environment.apiUrl + 'verify/'

    public static GetAllVoyages = environment.apiUrl + 'v1/voyage/';
}

export class LocalStorageConstants {
    public static Token = 'token';
}

export class SitePath {
    public static TicketBuyer = 'ticket-buyer';

    public static BuyResult = 'buy-result';
}