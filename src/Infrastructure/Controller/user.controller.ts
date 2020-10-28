import { Controller, Get, Param, Query } from "@nestjs/common";

@Controller('users')
export class UserController {

  @Get(':userId')
  getUserById(@Param() params): string {
    return `Hello ${params.userId}!`;
  }

  @Get()
  getUserByUsername(@Query('username') username): string {
    //TODO: Check username before use it.
    return `Hello ${username}!`;
  }
}
