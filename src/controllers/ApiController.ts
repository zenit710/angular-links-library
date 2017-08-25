import { Request, Response } from "express";
import { default as Link, LinkModel, STATUS_TO_READ } from "../models/Link";
import { ApiResponse } from "../models/ApiResponse";

export class ApiController
{

    public getLinks(req: Request, res: Response): void
    {
        Link.find({}, (err: any, results: LinkModel[]) => {
            res.json(new ApiResponse(err, results).getResponse());
        });
    }

    public addLink(req: Request, res: Response): void
    {
        let link: LinkModel = req.body;
        link.status = STATUS_TO_READ;

        new Link(link).save((err: any, result: LinkModel) => {
            res.json(new ApiResponse(err, result).getResponse());
        });
    }

    public removeLink(req: Request, res: Response): void
    {
        let id: string = req.params.id;
        Link.remove({_id: id}, (err: any) => {
            res.json(new ApiResponse(err).getResponse());
        });
    }

}