import GroupCountInput from '../components/GroupCountInput.vue';
import { shallowMount } from '@vue/test-utils';

const createWrapper = () => {
  return shallowMount(GroupCountInput);
};

describe('Number of groups input field', () => {
  it('should set the default group count to 3', () => {
    const wrapper = createWrapper();

    const inputEl = wrapper.find('input').element as HTMLInputElement;
    const defaultValue = inputEl.value;

    expect(defaultValue).toBe('3');
  });

  it('should emit an event whith the new value as a payload when updated', () => {
    const wrapper = createWrapper();

    wrapper.find('input').setValue(7);

    expect(wrapper.emitted('groups-count-updated')).toBeTruthy();
    expect(wrapper.emitted('groups-count-updated')).toEqual([[7]]);
  });
});
