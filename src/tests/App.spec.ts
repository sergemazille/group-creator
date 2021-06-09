import App from '../App.vue';
import GroupCountInput from '../components/GroupCountInput.vue';
import { GroupsMaker } from '../app/GroupsMaker';
import Participant from '../components/Participant.vue';
import ParticipantInput from '../components/ParticipantInput.vue';
import { shallowMount } from '@vue/test-utils';

const participantRepository = {
  getParticipants: jest.fn(() => []),
};

const createWrapper = () => {
  return shallowMount(App, {
    global: {
      provide: {
        participantRepository,
        groupsMaker: new GroupsMaker(),
        googleDocumentEditionEndoint: 'fakeEndPoint',
      },
    },
  });
};

describe('App', () => {
  it('should request saved participant on component creation', () => {
    createWrapper();

    expect(participantRepository.getParticipants).toHaveBeenCalledTimes(1);
  });

  it('should add a new participant in reaction to "new-participant-added" event', async () => {
    expect.assertions(1);

    const wrapper = createWrapper();
    await wrapper.vm.$nextTick();

    await wrapper.findComponent(ParticipantInput).vm.$emit('new-participant-added', 'Bob');

    expect(wrapper.vm.participants).toContain('Bob');
  });

  it('should remove a participant in reaction to "participant-removed" event', async () => {
    expect.assertions(1);

    const wrapper = createWrapper();
    await wrapper.vm.$nextTick();
    await wrapper.setData({ participants: ['Bob'] });

    await wrapper.findComponent(Participant).vm.$emit('participant-removed', 'Bob');

    expect(wrapper.vm.participants).toStrictEqual([]);
  });

  it('should update the number of groups to create when the "groups-count-updated" event is caught', async () => {
    expect.assertions(1);

    const wrapper = createWrapper();
    await wrapper.vm.$nextTick();

    await wrapper.findComponent(GroupCountInput).vm.$emit('groups-count-updated', 5);

    expect(wrapper.vm.groupsCount).toBe(5);
  });

  it('should create correct groups corresponding to provided data on action button click', async () => {
    expect.assertions(4);

    const wrapper = createWrapper();
    await wrapper.vm.$nextTick();
    await wrapper.setData({ participants: ['Bob', 'John', 'Mary', 'Léa', 'Phil', 'John D.', 'Gaston'], groupsCount: 3 });

    wrapper.find('button').trigger('click');

    expect(wrapper.vm.groups.length).toBe(3);
    expect(wrapper.vm.groups[0].length).toBe(3);
    expect(wrapper.vm.groups[1].length).toBe(2);
    expect(wrapper.vm.groups[2].length).toBe(2);
  });

  it('should display the number of participants', async () => {
    expect.assertions(1);

    const wrapper = createWrapper();
    await wrapper.vm.$nextTick();
    await wrapper.setData({ participants: ['Bob', 'John', 'Mary', 'Léa', 'Phil', 'John D.', 'Gaston'], groupsCount: 3 });

    expect(wrapper.text()).toContain('(7)');
  });

  it('should provide a link to google document', () => {
    const wrapper = createWrapper();

    const link = wrapper.find('a');

    expect(link.attributes('href')).toBe('fakeEndPoint');
  });
});
