import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(dto: CreateUserDto) {
    try {
      const exists = await this.userModel.findOne({ username: dto.username }).exec();
      if (exists) {
        throw new ConflictException('Username already registered');
      }
      
      const hash = await bcrypt.hash(dto.password, 10);
      const user = new this.userModel({ 
        name: dto.name,
        username: dto.username,
        password: hash 
      });
      
      await user.save();
      console.log('✅ User saved to MongoDB:', { id: user._id, username: user.username });
      return { id: user._id, name: user.name, username: user.username };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      // Handle MongoDB duplicate key error
      if (error.code === 11000) {
        throw new ConflictException('Username already registered');
      }
      throw error;
    }
  }

  async validateUser(username: string, password: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return { 
      token: `fake-token-${user._id}`, 
      user: { id: user._id, username: user.username, name: user.name } 
    };
  }
}