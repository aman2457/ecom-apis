export interface User{
    username: string,
    password: string,
    type: UserType
}

export enum UserType {
    Buyer = 'buyer',
    Seller = 'seller'
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