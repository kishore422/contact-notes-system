import Queue from 'bull';
import { INote } from '../models/Note';
import config from '../config';

const noteQueue = new Queue('note-processing', config.redisUrl);

export const addNoteToQueue = async (note: any): Promise<void> => {
  const jobData = {
    noteId: note._id?.toString() || '',
    body: note.body,
    contactId: note.contact?.toString() || '',
    tags: note.tags
  };

  try {
    await noteQueue.add(jobData, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000
      }
    });
    console.log(`Note ${note._id} added to processing queue`);
  } catch (error) {
    console.error('Error adding note to queue:', error);
    throw error;
  }
};

export default noteQueue;