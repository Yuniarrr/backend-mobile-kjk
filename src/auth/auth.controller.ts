import {
  Controller,
  Get,
  NotFoundException,
  Post,
  ValidationPipe,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from './dto/index';
import { AuthService } from './auth.service';
import { JwtGuard } from './guard';
import { GetUser } from './decorators';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOkResponse({
    description: 'Get user by id',
  })
  @Get('me')
  async getMe(@GetUser('id') user_id: number) {
    try {
      const user = await this.authService.getUserById({ id: user_id });

      return {
        status: 'success',
        data: user,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          status: 'error',
          message: error.message,
        };
      }

      console.error('Error in getMe AuthController:', error);

      return {
        status: 'error',
        message: 'Internal server error',
      };
    }
  }

  @ApiOkResponse({
    description: 'Create user',
  })
  @Post('register')
  async createUser(@Body(ValidationPipe) data: CreateUserDto) {
    try {
      const user = await this.authService.createUser(data);

      return {
        status: 'success',
        data: user,
      };
    } catch (error) {
      console.error('Error in createUser AuthController:', error);

      return {
        status: 'error',
        message: 'Internal server error',
      };
    }
  }

  @ApiOkResponse({
    description: 'Login user',
  })
  @Post('login')
  async login(@Body(ValidationPipe) data: LoginUserDto) {
    try {
      const user = await this.authService.login(data);

      return {
        status: 'success',
        data: user,
      };
    } catch (error) {
      console.error('Error in login AuthController:', error);

      return {
        status: 'error',
        message: 'Internal server error',
      };
    }
  }
}
