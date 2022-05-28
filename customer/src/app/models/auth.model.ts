export interface UserRegisterModel {
    email: string,
    password: string,
    phone?: string,
    firstName?: string,
    lastName?: string,
    dob?: string,
    gender?: string
}

export interface UserLoginModel {
    username: string,
    password: string
}