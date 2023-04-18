import { environment } from "src/environments/environment.development"

export class ApiPath {
    public static Token = environment.apiUrl + 'token';

    public static RefreashToken = environment.apiUrl + 'refresh'

    public static VerifyToken = environment.apiUrl + 'verify'

    public static GetAllVoyages = environment.apiUrl + 'v1/voyage';

    public static GetVoyagesByDate = environment.apiUrl + 'v1/voyages/by_time';

    public static GetQr = environment.apiUrl + 'v1/voyages/qr';

    public static Driver = environment.apiUrl + 'v1/driver';

    public static Bus = environment.apiUrl + 'v1/bus';
}

export class LocalStorageConstants {
    public static Token = 'token';
}

export class SitePath {
    public static TicketBuyer = 'ticket-buyer';

    public static BuyResult = 'buy-result';

    public static Viwer = 'viwer';

    public static Operator = 'operator';

    public static DriverEditor = 'driver-editor';

    public static BusEditor = 'bus-editor';

    public static VoyageEditor = 'voyage-editor';
}