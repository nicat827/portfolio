import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ 
    summary: 'Login with email and password',
    description: 'Returns JWT access token for authenticated requests',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Email and password credentials',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful, returns JWT token and user info',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 'user-id-here',
          email: 'admin@example.com',
        },
      },
    },
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid email or password format',
  })
  @ApiResponse({ 
    status: 401, 
    description: 'User not found or password incorrect',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
