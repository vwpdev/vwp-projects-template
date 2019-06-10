import TodoList from "./TodoList";
import fs from "fs";
import path from "path";
import { Express } from "express";

// import TodoList from './TodoList';


// export { default as TodoList } from "./TodoList";

/*
 fs
        .readdirSync(__dirname)
        .filter(dir => !(/^(index)/).test(dir))
        .map(dir => {
*/


export interface ModelsType {
    TodoList: typeof TodoList;
    [key: string]: any;
}
let ServerModels: any = {};
export default function Models(server: Express): ModelsType {
    // if (ServerModels) {
    //     return ServerModels;
    // }
    fs
        .readdirSync(__dirname)
        .filter((dir: string) => !(/^(index)/).test(dir))
        .map((dir: string) => {
            console.log("REGISTERING MODEL   : =>", dir);
            const Module = require(path.join(__dirname, dir)).default;
            ServerModels[dir.replace(/(\.js|\.ts)/ig, '').trim()] = Module;
        })
    server.set('Models', ServerModels);
    return ServerModels;
}