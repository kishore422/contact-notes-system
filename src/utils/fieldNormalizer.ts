interface NoteInput {
    [key: string]: any;
    note_body?: string;
    note_text?: string;
    note_content?: string;
    body?: string;
  }
  
  export const normalizeNoteFields = (data: NoteInput): NoteInput => {
    const result: NoteInput = { ...data };

    if (data.note_body !== undefined) {
      result.body = data.note_body;
      delete result.note_body;
    }
    
    if (data.note_text !== undefined) {
      result.body = data.note_text;
      delete result.note_text;
    }
    
    if (data.note_content !== undefined) {
      result.body = data.note_content;
      delete result.note_content;
    }
    
    return result;
  };