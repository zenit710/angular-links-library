import { Request, Response, Router } from "express";

export class IndexController
{

    public indexAction(req: Request, res: Response): void
    {
        res.render("index.html");
    }

}