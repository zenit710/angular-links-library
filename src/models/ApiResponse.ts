import { ApiResponseInterface } from "./ApiResponseInterface";

enum API_STATUS_CODE {
    OK = 0,
    ERROR = 1
}

export class ApiResponse
{

    private response: ApiResponseInterface = {
        statusCode: API_STATUS_CODE.OK,
        errors: null,
        result: null
    };

    constructor(errors: any, result: any = null) {
        this.response.errors = errors;
        this.response.result = result;
        this.response.statusCode = errors ? API_STATUS_CODE.ERROR : API_STATUS_CODE.OK;
    }

    public getResponse(): ApiResponseInterface
    {
        return this.response;
    }

}