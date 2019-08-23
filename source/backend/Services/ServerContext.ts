import Models, { ModelsType } from "./../Models";
import { Express } from "express";
export interface ServerContextType {
    Models: ModelsType
}



export default function ServerContext(server: Express): ServerContextType {
    return {
        Models: Models(server)
    }
}