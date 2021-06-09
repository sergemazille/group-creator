import axios from 'axios';

export class ParticipantRepository {
  constructor(private readonly endpoint: string) {}

  async getParticipants(): Promise<string[]> {
    try {
      const { data: apiResponse } = await axios.get(this.endpoint);
      const entries = apiResponse.feed.entry;

      const participants = entries.map((entry: any) => {
        return entry.content.$t;
      });

      return participants;
    } catch (error) {
      return [];
    }
  }
}
