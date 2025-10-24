import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { JwtGuard } from '../auth/jwt.guard';

interface FileObject {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
  size: number;
}

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('bearer')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file to upload',
        },
      },
      required: ['file'],
    },
  })
  @ApiOperation({ summary: 'Upload image to Cloudinary' })
  @ApiResponse({
    status: 200,
    description: 'Image uploaded successfully',
    schema: {
      example: {
        url: 'https://res.cloudinary.com/...',
        publicId: 'portfolio/1234567890-filename',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'No file provided' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  async uploadImage(@UploadedFile() file: FileObject) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds 5MB limit');
    }

    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedMimes.includes(file.mimetype)) {
      throw new BadRequestException('Only JPEG, PNG, WebP, and GIF images are allowed');
    }

    try {
      const result = await this.uploadService.uploadImage(file.buffer, file.originalname);
      return result;
    } catch (error) {
      throw new BadRequestException(`Upload failed: ${error.message}`);
    }
  }
}
