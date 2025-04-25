import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import * as bcrypt from 'bcrypt';
  import { JwtService } from '@nestjs/jwt';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { User } from './entities/user.entity';
  import { RedisService } from 'src/common/utils/redis.service';
  import { MailerService } from 'src/common/utils/mailer.service';
  
  @Injectable()
  export class UsersService {
    constructor(
      private jwtService: JwtService,
      private redisService: RedisService,
      private mailerService: MailerService,
    ) {}
  
    async signup(createUserDto: CreateUserDto) {
      const existingUser = await User.findOne({ where: { email: createUserDto.email } });
      if (existingUser) throw new ConflictException('User already exists');
  
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = await User.create({ ...createUserDto, password: hashedPassword });
  
      const otp = this.generateOtp();
      await this.redisService.set(`otp:${user.email}`, otp, 300); // expires in 5 mins
      await this.mailerService.sendVerificationEmail(user.email, otp);
  
      return { message: 'OTP sent to email' };
    }
  
    async login(email: string, password: string) {
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }
      if (!user.isVerified) {
        throw new UnauthorizedException('Account not verified');
      }
  
      return this.generateAuthToken(user.email);
    }
  
    async verifyOtp(email: string, otp: string) {
      const storedOtp = await this.redisService.get(`otp:${email}`);
      if (!storedOtp || storedOtp !== otp) {
        throw new UnauthorizedException('Invalid OTP');
      }
  
      await User.update({ isVerified: true }, { where: { email } });
      await this.redisService.del(`otp:${email}`);
  
      return this.generateAuthToken(email);
    }
  
    async sendOtp(email: string) {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new NotFoundException('User not found');
  
      const otp = this.generateOtp();
      await this.redisService.set(`otp:${email}`, otp, 300); // 5 mins
      await this.mailerService.sendVerificationEmail(email, otp);
  
      return { message: 'OTP sent successfully' };
    }
  
    async forgotPassword(email: string) {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new NotFoundException('User not found');
  
      const token = Math.random().toString(36).slice(-8);
      await this.redisService.set(`reset:${email}`, token, 900); // 15 minutes
      await this.mailerService.sendPasswordResetEmail(email, token);
  
      return { message: 'Reset instructions sent to email' };
    }
  
    async getProfile(email: string) {
      return User.findOne({
        where: { email },
        attributes: ['id', 'name', 'email', 'profilePicture'],
      });
    }
  
    async updateProfile(email: string, updateDto: UpdateUserDto) {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new NotFoundException('User not found');
  
      if (updateDto.password) {
        updateDto.password = await bcrypt.hash(updateDto.password, 10);
      }
  
      return user.update(updateDto);
    }
  
    private generateAuthToken(email: string) {
      return {
        access_token: this.jwtService.sign({ email }),
      };
    }
  
    private generateOtp(): string {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }
  }
  