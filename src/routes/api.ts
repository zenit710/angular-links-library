import { Router, Response, Request } from "express";
import { ApiController } from "../controllers/ApiController";

let apiController: ApiController = new ApiController();
let router: Router = Router();

router.get("/link", (req: Request, res: Response) => {
    apiController.getLinks(req, res);
});

router.post("/link", (req: Request, res: Response) => {
    apiController.addLink(req, res);
});

router.delete("/link/:id", (req: Request, res: Response) => {
    apiController.removeLink(req, res);
});

export = router;