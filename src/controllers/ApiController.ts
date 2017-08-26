import { Request, Response } from "express";
import { default as Link, LinkModel, LINK_STATUS } from "../models/Link";
import { ApiResponse } from "../models/ApiResponse";

export class ApiController
{

    public getLinks(req: Request, res: Response): void
    {
        Link.find({}, null, {sort: {favourite: -1}}, (err: any, results: LinkModel[]) => {
            res.json(new ApiResponse(err, results).getResponse());
        });
    }

    public addLink(req: Request, res: Response): void
    {
        let link: LinkModel = req.body;
        link.status = LINK_STATUS.TO_READ;

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

    public updateLink(req: Request, res: Response): void
    {
        let link: LinkModel = req.body;

        Link.update({ _id: link._id }, { $set: link }, function (err: any, result: LinkModel) {
            res.json(new ApiResponse(err, result).getResponse());
        })
    }

}