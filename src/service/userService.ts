import { JsonWebToken } from "../auth/JsonWebToken";
import { verifyPassword } from "../auth/Utils";
import ForbiddenException from "../exceptions/ForbiddenException";
import HttpException from "../exceptions/HttpException";
import InternalServerErrorException from "../exceptions/InternalServerErrorException";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import { BuyerPermissions, SellerPermissions } from "../models/Authorization.dto";
import {
  CreateUserRequest,
  UserLoginRequest,
  UserTokenPayload,
  UserType,
} from "../models/User.dto";
import { UserRepository } from "../repository/UserRepository";


export class UserService {
  constructor() {}

  userRepository = new UserRepository();
  jsonWebToken = new JsonWebToken();
  async createUser(user: CreateUserRequest) {
    const checkExistingUser = await this.userRepository.getUser(
      user.username
    );
    if (!checkExistingUser) {
      const id = await this.userRepository.createUser(user);
      if (id) {
        const payload: UserTokenPayload = {
          userId: id,
          username: user.username,
          userType: user.type,
          permissions:
            user.type == UserType.Buyer
              ? Object.values(BuyerPermissions)
              : Object.values(SellerPermissions),
        };
        return this.jsonWebToken.generateToken(payload);
      } else {
        throw new InternalServerErrorException(
          500,
          `Could not create user for username: ${user.username}`
        );
      }
    } else {
      throw new ForbiddenException(
        403,
        `User with username: ${user.username} already exists`
      );
    }
  }

  async loginUser(user: UserLoginRequest) {
    const getUserResult = await this.userRepository.getUser(
      user.username
    );
    if (getUserResult) {
      const isVerifiedPassword = await verifyPassword(
        user.password,
        getUserResult.password
      );
      if (isVerifiedPassword) {
        const payload: UserTokenPayload = {
          userId: getUserResult.userId,
          username: getUserResult.username,
          userType: getUserResult.type,
          permissions:
            getUserResult.type == UserType.Buyer
            ? Object.values(BuyerPermissions)
            : Object.values(SellerPermissions),        };
        return this.jsonWebToken.generateToken(payload);
      } else {
        throw new UnauthorizedException(401, `Wrong credentials`);
      }
    } else {
      throw new UnauthorizedException(
        401,
        `User with ${user.username} not found`
      );
    }
  }
}
