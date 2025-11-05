import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './notes.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async findAll(username: string) {
    return this.noteModel.find({ username }).sort({ createdAt: -1 }).exec();
  }

  async create(username: string, dto: { title: string; content?: string }) {
    const note = new this.noteModel({ ...dto, username });
    return note.save();
  }

  async update(id: string, username: string, dto: { title?: string; content?: string }) {
    const note = await this.noteModel
      .findOneAndUpdate({ _id: id, username }, dto, { new: true })
      .exec();
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  async delete(id: string, username: string) {
    const result = await this.noteModel.deleteOne({ _id: id, username }).exec();
    if (result.deletedCount === 0) throw new NotFoundException('Note not found');
    return { message: 'Note deleted' };
  }
}