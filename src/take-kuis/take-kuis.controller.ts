import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { TakeKuisService } from './take-kuis.service';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorators';
import { CreateAnswerDto } from './dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@ApiTags('Take Kuis')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
@UseGuards(JwtGuard)
@Controller('take-kuis')
export class TakeKuisController {
  constructor(private readonly takeKuisService: TakeKuisService) {}

  @ApiOkResponse({
    description: 'Take kuis',
  })
  @Post()
  async createKuis(@GetUser('id') user_id: number, topic_id: number) {
    try {
      const kuis = await this.takeKuisService.createKuis(user_id, topic_id);

      return {
        status: 'success',
        data: kuis,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          status: 'error',
          message: error.message,
        };
      }

      console.error('Error in create TakeKuisController:', error);

      return {
        status: 'error',
        message: 'Internal server error',
      };
    }
  }

  @ApiOkResponse({
    description: 'Send answer',
  })
  @Post(':take_kuis_id/:kuis_id')
  async createAnswer(
    @Param('take_kuis_id') take_kuis_id: number,
    @Param('kuis_id') kuis_id: number,
    @Body(ValidationPipe) data: CreateAnswerDto,
  ) {
    try {
      const kuis = await this.takeKuisService.createAnswer(
        take_kuis_id,
        kuis_id,
        data,
      );

      return {
        status: 'success',
        data: kuis,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          status: 'error',
          message: error.message,
        };
      }

      console.error('Error in create TakeKuisController:', error);

      return {
        status: 'error',
        message: 'Internal server error',
      };
    }
  }

  @ApiOkResponse({
    description: 'Get answer',
  })
  @Get(':detail_take_kuis_id')
  async findOne(@Param('detail_take_kuis_id') id: number) {
    try {
      const kuis = await this.takeKuisService.findOne(id);

      return {
        status: 'success',
        data: kuis,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          status: 'error',
          message: error.message,
        };
      }

      console.error('Error in findOne TakeKuisController:', error);

      return {
        status: 'error',
        message: 'Internal server error',
      };
    }
  }

  @ApiOkResponse({
    description: 'Update answer',
  })
  @Patch(':detail_take_kuis_id')
  async update(
    @Param('detail_take_kuis_id') id: number,
    @Body() data: UpdateAnswerDto,
  ) {
    try {
      const detail_take_kuis = await this.takeKuisService.update(id, data);

      return {
        status: 'success',
        data: detail_take_kuis,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          status: 'error',
          message: error.message,
        };
      }

      console.error('Error in update TakeKuisController:', error);

      return {
        status: 'error',
        message: 'Internal server error',
      };
    }
  }

  @ApiOkResponse({
    description: 'Finish kuis',
  })
  @Patch('finish/:take_kuis_id')
  async finish(@Param('take_kuis_id') id: number) {
    try {
      const detail_take_kuis = await this.takeKuisService.finish(id);

      return {
        status: 'success',
        data: detail_take_kuis,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          status: 'error',
          message: error.message,
        };
      }

      console.error('Error in finish TakeKuisController:', error);

      return {
        status: 'error',
        message: 'Internal server error',
      };
    }
  }

  @ApiOkResponse({
    description: 'Get all kuis',
  })
  @Get(':topic_id')
  async getAllKuis(@Param('topic_id') topic_id: number) {
    try {
      const all_kuis = await this.takeKuisService.getAllKuis(topic_id);

      return {
        status: 'success',
        data: all_kuis,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          status: 'error',
          message: error.message,
        };
      }

      console.error('Error in finish TakeKuisController:', error);

      return {
        status: 'error',
        message: 'Internal server error',
      };
    }
  }
}
