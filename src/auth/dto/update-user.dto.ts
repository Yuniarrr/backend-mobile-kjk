import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @ApiPropertyOptional({
    description: 'Full name of the user.',
    example: 'John Doe',
  })
  name?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'Full name of the user.',
    example: 'John Doe',
  })
  username?: string;

  @IsEmail()
  @ApiPropertyOptional({
    description: 'Email of the user.',
    example: 'example@mail.com ',
  })
  email?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'Password of the user.',
    example: 'AbCd12345678',
  })
  password?: string;
}
