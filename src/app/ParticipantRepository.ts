import axios from 'axios';

export class ParticipantRepository {
  constructor(private readonly endpoint: string) {}

  async getParticipants(): Promise<string[]> {
    try {
      const { data: apiResponse } = await axios.get(this.endpoint);
      const jsonResponse = JSON.parse(apiResponse.substr(47).slice(0, -2));
      const entries: any = jsonResponse.table.rows;

      const participants = entries.map((entry: any) => {
        return entry.c[0].v;
      });

      return participants;
    } catch (error) {
      return [];
    }
  }
}
