import DatabaseManager from "@vwp/database-manager";
import Database from "./../Services/Database";
//let TodoListInstance: DatabaseManager;
export default class TodoList extends DatabaseManager {
    constructor() {
        super({
            schema: { label: String, complete: Boolean },
            collection: "TodoList"
        }, { getDatabaseService: () => Database() });
        this.init();
    }

    static getInstance() {
        return new TodoList();
    }
}