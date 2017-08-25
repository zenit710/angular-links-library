import * as express from "express";
import * as morgan from "morgan";
import * as http from "http";
import * as bodyParser from "body-parser";
import * as path from "path";
import mongoose = require("mongoose");
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");

// routes
import * as IndexRouter from "./routes/IndexRoutes";
import * as ApiRouter from "./routes/ApiRoutes";

/**
 * @class Server
 */
export class Server {

    private app: express.Application;

    constructor()
    {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void
    {
        this.app.use(express.static(path.join(__dirname, "../client/dist")));

        this.app.set("views", path.join(__dirname, "../client/dist/views"));
        this.app.set("view engine", "ejs");
        this.app.engine("html", require("ejs").renderFile);

        this.app.use(morgan("dev"));

        global.Promise = require("q").Promise;
        mongoose.Promise = global.Promise;

        const DB: string = "mongodb://localhost/angularLibrary";
        mongoose.connect(DB, {useMongoClient: true}, (err: any) => {
            if (err) {
                return err;
            } else {
                console.log("connected to " + DB);
            }
        });

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        this.app.use(methodOverride());

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            err.status = 404;
            next(err);
        });

        this.app.use(errorHandler());
    }

    private routes(): void
    {
        let router: express.Router;
        router = express.Router();

        router.use("/", IndexRouter);
        router.use("/api", ApiRouter);

        this.app.use(router);
    }

    public getApp(): express.Application
    {
        return this.app;
    }
}

const PORT: number = 8080; //process.env.PORT || 8080
let httpserver: Server = new Server();
let app: express.Application = httpserver.getApp();
app.set("port", PORT);

const server: http.Server = http.createServer(app);
server.listen(PORT);
server.on("error", onError);
server.on("listening", onListening);

function onListening(): void
{
    let addr: any = server.address();
    let bind: string = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;

    console.log("Listening on " + bind);
}

function onError(error: any): void
{
    if (error.syscall !== "listen") {
        throw error;
    }

    let bind: string = typeof PORT === "string"
        ? "Pipe " + PORT
        : "Port " + PORT;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
