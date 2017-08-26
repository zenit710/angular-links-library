export interface Link
{
  _id?: string;
  name: string;
  url: string;
  description: string;
  status?: number;
  favourite?: boolean;
  createdAt?: Date;
}
