import App from '../App.vue';
import Participant from '../components/Participant.vue';
import { shallowMount } from '@vue/test-utils';

const createWrapper = (options?: Record<string, any>) => {
  return shallowMount(Participant, {
    ...options,
  });
};

describe('Participant', () => {
  it('should emit an event when the remove button is clicked', () => {
    const props = { participant: 'Bob' };
    const wrapper = createWrapper({ props });

    wrapper.find('button').trigger('click');

    expect(wrapper.emitted('participant-removed')).toBeTruthy();
    expect(wrapper.emitted('participant-removed')).toStrictEqual([['Bob']]);
  });
});
