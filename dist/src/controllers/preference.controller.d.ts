import { PreferenceService } from "../services/preference.service";
export declare class PreferenceController {
    private pref;
    constructor(pref: PreferenceService);
    get(req: any): Promise<import("../entities/preference.entity").Preference>;
    setFee(req: any, body: {
        sessionFee: number;
    }): Promise<import("../entities/preference.entity").Preference>;
    setName(req: any, body: {
        sessionName: string;
    }): Promise<import("../entities/preference.entity").Preference>;
    reset(req: any): Promise<{
        ok: boolean;
        preference: import("../entities/preference.entity").Preference;
    }>;
}
