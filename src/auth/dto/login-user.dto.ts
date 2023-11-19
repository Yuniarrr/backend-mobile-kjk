import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty, IsEmail, IsDefined } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({ description: 'Full name of the user.', example: 'John Doe' })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({
    description: 'Email of the user.',
    example: 'example@mail.com ',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({
    description: 'Password of the user.',
    example: 'AbCd12345678',
  })
  password: string;
}
