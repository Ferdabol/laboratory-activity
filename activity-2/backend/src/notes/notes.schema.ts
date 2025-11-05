import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Note {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  content: string;
}

export type NoteDocument = Note & Document;
export const NoteSchema = SchemaFactory.createForClass(Note);