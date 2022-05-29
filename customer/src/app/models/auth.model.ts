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

export interface UserUpdateModel {
    phone?: string,
    firstName?: string,
    lastName?: string,
    avatar?: string,
    dob?: string,
    gender?: string
}