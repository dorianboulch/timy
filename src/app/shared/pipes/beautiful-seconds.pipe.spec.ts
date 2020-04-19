import { BeautifulSecondsPipe } from './beautiful-seconds.pipe';

describe('BeautifulSecondsPipe', () => {
  it('create an instance', () => {
    const pipe = new BeautifulSecondsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should display seconds with zero minutes', () => {
    const pipe = new BeautifulSecondsPipe();
    expect(pipe.transform(7)).toBe('00:07');
  });

  it('should display minutes', () => {
    const pipe = new BeautifulSecondsPipe();
    expect(pipe.transform(130)).toBe('02:10');
  });

  it('should display hours', () => {
    const pipe = new BeautifulSecondsPipe();
    expect(pipe.transform(3730)).toBe('01:02:10');
  });
});
