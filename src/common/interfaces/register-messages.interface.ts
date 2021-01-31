export interface IResponseBody {
    error: boolean;
    message: string;
};

export interface ICrudResponse {
   failure: IResponseBody;
   success: IResponseBody;
};

export interface IRegisterMessages {
    create: ICrudResponse;
    update: ICrudResponse;
    delete: ICrudResponse;
    notFound: IResponseBody;
    invalidID: IResponseBody;
    noRecords: IResponseBody;
    alreadyExists: IResponseBody;
    incompleteData: IResponseBody;
}
