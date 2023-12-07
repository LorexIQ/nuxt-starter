export interface UserType {
    id: number;
    name: string;
    login: string;
}
export interface UserExtendedType extends UserType {
    password: string;
}
