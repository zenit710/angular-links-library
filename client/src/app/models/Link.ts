export enum LinkStatus
{
  "TO_READ",
  "READ"
}

export interface Link
{
  _id?: string;
  name: string;
  url: string;
  description: string;
  status?: LinkStatus;
  favourite?: boolean;
  createdAt?: Date;
}
