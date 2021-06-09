import { ParticipantRepository } from '../app/ParticipantRepository';
import apiResponse from '../fixtures/participants.json';
import axios from 'axios';

jest.mock('axios');

describe('Participant repository', () => {
  it('should call provided endpoint to fetch saved participants', () => {
    (axios as any).get.mockImplementationOnce(() => Promise.resolve(apiResponse));

    const repository = new ParticipantRepository('fakeEndpoint');
    repository.getParticipants();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('fakeEndpoint');
  });

  it('should return an empty array if API call failed', async () => {
    (axios as any).get.mockImplementationOnce(() => Promise.reject());

    const repository = new ParticipantRepository('fakeEndpoint');
    const emptyArray = await repository.getParticipants();

    expect(emptyArray).toStrictEqual([]);
  });
});
