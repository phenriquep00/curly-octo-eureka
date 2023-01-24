// user attributes based on the database values;
export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  pictureUrl: string;
  created_at: Date;
}
