import { Repository } from "typeorm";
import { Preference } from "../entities/preference.entity";
import { Student } from "../entities/student.entity";
export declare class PreferenceService {
    private prefs;
    private students;
    constructor(prefs: Repository<Preference>, students: Repository<Student>);
    get(): Promise<Preference>;
    setSessionFee(sessionFee: number): Promise<Preference>;
    setSessionName(sessionName: string): Promise<Preference>;
    resetSession(): Promise<{
        ok: boolean;
        preference: Preference;
    }>;
}
