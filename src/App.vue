<template>
  <div class="app">
    <div class="inputs">
      <ParticipantInput @new-participant-added="addAParticipant" />
      <GroupCountInput @groups-count-updated="updateGroupsCount" />
      <button v-text="'Créer les groupes'" @click="createGroups" />
    </div>

    <div class="columns">
      <div class="participants">
        <h3><a :href="googleDocumentEditionEndoint" target="_blank">Liste des participants</a> ({{ participants.length }}) :</h3>
        <ul>
          <li v-for="(participant, index) in participants" :key="index">
            <Participant v-bind="{ participant }" @participant-removed="removeParticipant" />
          </li>
        </ul>
      </div>

      <ul class="groups">
        <li v-for="(group, index) in groups" :key="index">
          <ul class="group">
            <li v-for="participant in group" :key="participant" v-text="participant" />
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import GroupCountInput from './components/GroupCountInput.vue';
import ParticipantInput from './components/ParticipantInput.vue';
import Participant from './components/Participant.vue';

export default defineComponent({
  setup() {
    const participantRepository = inject('participantRepository');
    const groupsMaker = inject('groupsMaker');
    const googleDocumentEditionEndoint = inject('googleDocumentEditionEndoint');

    return { googleDocumentEditionEndoint, groupsMaker, participantRepository };
  },

  components: { GroupCountInput, Participant, ParticipantInput },

  data() {
    return {
      participants: [] as string[],
      groupsCount: 3,
      groups: [] as string[][],
    };
  },

  methods: {
    async fetchParticipants(): Promise<void> {
      this.participants = await (this as any).participantRepository.getParticipants();
    },

    addAParticipant(participant: string): void {
      this.participants.unshift(participant);
    },

    removeParticipant(participant: string) {
      this.participants = this.participants.filter(item => item !== participant);
    },

    updateGroupsCount(groupsCount: number) {
      if (groupsCount < 1) {
        return;
      }

      this.groupsCount = groupsCount;
    },

    createGroups(): void {
      this.groups = (this as any).groupsMaker.shuffle(this.participants).splitIn(this.groupsCount);
    },
  },

  created() {
    this.fetchParticipants();
  },
});
</script>

<style lang="scss" scoped>
.app {
  padding: 6px 24px;
}

.inputs {
  display: flex;

  button {
    cursor: pointer;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 12px;
    font-weight: bold;
    background-color: rgb(116, 168, 99);

    &:hover {
      background-color: rgb(58, 148, 31);
    }
  }

  > * {
    margin-right: 48px;
  }
}

ul {
  list-style-type: none;
  padding: 0;

  &.group {
    margin-left: 60px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid lightgrey;
    border-radius: 4px;
    width: 200px;
  }

  li {
    margin-bottom: 2px;
  }
}

.columns {
  display: flex;

  .groups {
    margin-top: 48px;
  }
}
</style>
