import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
  contact: mongoose.Types.ObjectId;
  body: string;
  tags?: string[];
}

const NoteSchema: Schema = new Schema({
  contact: { 
    type: Schema.Types.ObjectId, 
    ref: 'Contact', 
    required: true 
  },
  body: { type: String, required: true },
  tags: [{ type: String }]
}, { timestamps: true });

export default mongoose.model<INote>('Note', NoteSchema);