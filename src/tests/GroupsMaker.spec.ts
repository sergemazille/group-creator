import { GroupsMaker } from '../app/GroupsMaker';

describe('GroupsMaker', () => {
  it('should return an array of participants groups', () => {
    const lettersGroup = new GroupsMaker().shuffle(['a', 'b', 'c', 'd']).splitIn(1);
    const numbersGroup = new GroupsMaker().shuffle(['1', '2', '3', '4', '5', '6']).splitIn(3);

    expect(lettersGroup.length).toBe(1);
    expect(numbersGroup.length).toBe(3);
  });

  it('should split participants evenly', () => {
    const lettersGroup = new GroupsMaker().shuffle(['a', 'b', 'c', 'd', 'e']).splitIn(2);

    expect(lettersGroup.length).toBe(2);
    expect(lettersGroup[0].length).toBe(3);
    expect(lettersGroup[1].length).toBe(2);

    const numbersGroup = new GroupsMaker().shuffle(['1', '2', '3', '4', '5']).splitIn(3);

    expect(numbersGroup.length).toBe(3);
    expect(numbersGroup[0].length).toBe(2);
    expect(numbersGroup[1].length).toBe(2);
    expect(numbersGroup[2].length).toBe(1);
  });

  it('should not create empty groups', () => {
    const groups = new GroupsMaker().shuffle(['a']).splitIn(2);

    expect(groups.length).toBe(1);
  });
});
