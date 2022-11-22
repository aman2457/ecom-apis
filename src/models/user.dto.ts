export interface CreateUserRequest{
    username: string,
    password: string,
    type: UserType
}

export interface User{
    userId: string,
    username: string,
    password: string,
    type: UserType
}

export enum UserType {
    Buyer = 'buyer',
    Seller = 'seller'
  }

  export interface UserTokenPayload{
    userId: string,
    username: string,
    userType: UserType
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