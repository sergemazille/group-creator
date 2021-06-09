import ParticipantInput from '../components/ParticipantInput.vue';
import { shallowMount } from '@vue/test-utils';

const createWrapper = () => {
  return shallowMount(ParticipantInput);
};

describe('Input field to add a new participant', () => {
  it('should emit an event with the new participant name as a payload when the form is submitted', () => {
    const wrapper = createWrapper();

    wrapper.find('input').setValue('Bob');
    wrapper.find('form').trigger('submit');

    expect(wrapper.emitted('new-participant-added')).toBeTruthy();
    expect(wrapper.emitted('new-participant-added')).toEqual([['Bob']]);
  });

  it('should not submit the form if no participant name has been entered', () => {
    const wrapper = createWrapper();

    wrapper.find('form').trigger('submit');

    expect(wrapper.emitted('new-participant-added')).toBeFalsy();
  });
});
