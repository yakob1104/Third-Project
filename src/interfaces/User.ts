export default interface User {
    id?: number;
    name?: string;
    password: string;
    email: string;
    isAdmin?: boolean;
}