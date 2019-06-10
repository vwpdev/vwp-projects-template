import { DatabaseService } from "@vwp/database-manager";
let DatabseInstance: DatabaseService;
export default function Database(): DatabaseService {
    if (DatabseInstance) {
        return DatabseInstance;
    }
    DatabseInstance = new DatabaseService({
        getDatabaseSettings() {
            return "mongodb://localhost:27017/TestDB"
        },
        getVersion() {
            return "test"
        },
        getEnvSettings() {
            return { port: "", host: "", api: "", app: "", entry: "", database: "" }
        },
        getKey: () => "TestDB",
    });
    return DatabseInstance;
}