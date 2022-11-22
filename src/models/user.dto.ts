import { Permissions } from "./authorization"

export interface CreateUserRequest{
    username: string,
    password: string,
    type: UserType
}

export interface User{
    getUserResult: any
    userId: string,
    username: string,
    password: string,
    type: UserType
}

export enum UserType {
    Buyer = 'BUYER',
    Seller = 'SELLER'
  }

  export interface UserTokenPayload{
    userId: string,
    username: string,
    userType: UserType,
    permissions: string[]
  }

export interface UserCreatedResponse{
    id: string
}

export interface UserLoggedInResponse{
    token: string
}

export interface UserLoginRequest{
    username: string,
    password: string
}

export interface DefaultMessage{
    message: string
}
