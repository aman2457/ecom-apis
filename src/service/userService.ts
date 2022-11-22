import CommonHttpException from "../exceptions/CommonHttpException";
import { buyerPermission, sellerPermission } from "../models/authorization";
import {
  CreateUserRequest,
  UserLoginRequest,
  UserTokenPayload,
  UserType,
} from "../models/user.dto";
import { userRepository } from "../repository/userRepository";
import { jsonWebToken } from "../security/jsonWebToken";
import { verifyPassword } from "../security/utils";

export class userService {
  constructor() {}

  userRepositoryObject = new userRepository();
  jsonWebTokenObject = new jsonWebToken();
  async createUser(user: CreateUserRequest) {
    const checkExistingUser = await this.userRepositoryObject.getUser(
      user.username
    );
    if (!checkExistingUser) {
      const id = await this.userRepositoryObject.createUser(user);
      if (id) {
        const payload: UserTokenPayload = {
          userId: id,
          username: user.username,
          userType: user.type,
          permissions:
            user.type == UserType.Buyer
              ? buyerPermission.permissions
              : sellerPermission.permissions,
        };
        return this.jsonWebTokenObject.generateToken(payload);
      } else {
        throw new CommonHttpException(
          500,
          `Could not create user for username: ${user.username}`
        );
      }
    } else {
      throw new CommonHttpException(
        403,
        `User with username: ${user.username} already exists`
      );
    }
  }

  async loginUser(user: UserLoginRequest) {
    const getUserResult = await this.userRepositoryObject.getUser(
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
              ? buyerPermission.permissions
              : sellerPermission.permissions,
        };
        return this.jsonWebTokenObject.generateToken(payload);
      } else {
        throw new CommonHttpException(401, `Wrong credentials`);
      }
    } else {
      throw new CommonHttpException(
        401,
        `User with ${user.username} not found`
      );
    }
  }
}
