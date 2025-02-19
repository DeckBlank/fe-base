export const mockBlob = new Blob(['mock content'], { type: 'text/plain' });
export const mockFile = new File(['mock content'], 'mockFile.txt', {
  type: 'text/plain',
  lastModified: Date.now(),
});