export class GroupsMaker {
  constructor(private readonly participants: string[] = []) {
    this.participants = participants;
  }

  shuffle(participantsGroup: string[]): GroupsMaker {
    const participants = [...participantsGroup];
    const shuffledGroup: string[] = [];
    const lng = participants.length;

    for (let i = lng; i > 0; i--) {
      const index = Math.floor(Math.random() * i);
      const randomParticipant = participants.splice(index, 1)[0];

      shuffledGroup.push(randomParticipant);
    }

    return new GroupsMaker(shuffledGroup);
  }

  splitIn(groupsCount: number): string[][] {
    const groups: string[][] = [];
    const participants = [...this.participants];

    while (participants.length) {
      for (let i = 0; i < groupsCount; i++) {
        if (typeof groups[i] !== 'object' && participants[0]) {
          groups[i] = [];
        }

        if (!participants[0]) {
          continue;
        }

        groups[i].push(participants.splice(0, 1)[0]);
      }
    }

    return groups;
  }
}
