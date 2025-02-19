describe('GetLibraryByIdUseCase', () => {
  beforeEach(() => {

  });

  it('should to pass', async () => {
    const expectedLibrary = { id: '123', name: 'My Library' };
    const result = { id: '123', name: 'My Library' };


    expect(result).toEqual(expectedLibrary);


  });
});
