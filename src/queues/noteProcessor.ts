import noteQueue from './noteQueue';


noteQueue.process(async (job) => {
  const { noteId, body, contactId, tags } = job.data;
  
  console.log(`Processing note ${noteId} for contact ${contactId}`);
  

  await new Promise(resolve => setTimeout(resolve, 2000));
  

  console.log(`Note processed: ${noteId}`);
  console.log(`Note content: ${body}`);
  
  console.log(`[ANALYTICS] Note for contact ${contactId} indexed`);
  console.log(`[ANALYTICS] Tags analyzed: ${tags ? tags.join(', ') : 'none'}`);
  
  if (body.length > 100) {
    console.log(`[ENRICHMENT] Long note detected, triggering additional processing`);
  }
  
  return { success: true, message: 'Note processed successfully' };
});

noteQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed with result:`, result);
});

noteQueue.on('failed', (job, error) => {
  console.error(`Job ${job.id} failed with error:`, error);
});

noteQueue.on('progress', (job, progress) => {
  console.log(`Job ${job.id} is ${progress}% complete`);
});

export const startNoteProcessor = (): void => {
  console.log('Note processor started and listening for jobs');
};