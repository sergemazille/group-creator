<template>
  <div class="app">
    <div class="inputs">
      <ParticipantInput @new-participant-added="addAParticipant" />
      <GroupCountInput @groups-count-updated="updateGroupsCount" />
      <button v-text="'Créer les groupes'" @click="createGroups" />
    </div>

    <div class="columns">
      <div class="participants" ref="participants" data-selector="participants">
        <h3>
          <span class="toggle-icon" @click="toggle" data-selector="toggle-icon">▶</span>
          <a :href="googleDocumentEditionEndoint" target="_blank" class="googlesheet-link">
            <span>Liste des participants</span>
            <EditIcon />
          </a>
          <span> ({{ participants.length }})</span>
        </h3>

        <transition-group tag="ul" name="participants">
          <li v-for="participant in participants" :key="participant">
            <Participant v-bind="{ participant }" @participant-removed="removeParticipant" />
          </li>
        </transition-group>
      </div>

      <ul class="groups">
        <li v-for="(group, index) in groups" :key="index">
          <Group v-bind="{ group }" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import Group from './components/Group.vue';
import GroupCountInput from './components/GroupCountInput.vue';
import ParticipantInput from './components/ParticipantInput.vue';
import Participant from './components/Participant.vue';
import EditIcon from './assets/edit.svg.vue';

export default defineComponent({
  setup() {
    const participantRepository = inject('participantRepository');
    const groupsMaker = inject('groupsMaker');
    const googleDocumentEditionEndoint = inject('googleDocumentEditionEndoint');

    return { googleDocumentEditionEndoint, groupsMaker, participantRepository };
  },

  components: { EditIcon, Group, GroupCountInput, Participant, ParticipantInput },

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

    toggle() {
      const participantsEl = this.$refs.participants as HTMLElement;

      participantsEl.classList.toggle('open');
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

.participants {
  ul {
    display: none;
  }

  .toggle-icon {
    cursor: pointer;
    font-size: 0.9rem;
    margin-right: 10px;
    transition: transform 0.15s ease-in-out;
    display: inline-block;
  }

  &.open {
    .toggle-icon {
      transform: rotate3D(0, 0, 1, 90deg);
    }

    ul {
      display: block;
    }
  }

  @media screen and (min-width: 576px) {
    ul {
      display: block;
    }

    .toggle-icon {
      display: none;
    }
  }
}

.inputs {
  display: flex;

  @media screen and (max-width: 575px) {
    flex-direction: column;
    align-items: flex-start;

    > * {
      margin-bottom: 24px;
    }
  }

  button {
    cursor: pointer;
    color: white;
    border: 2px solid rgb(26, 3, 44);
    border-radius: 4px;
    padding: 16px 24px;
    font-weight: bold;
    background-color: rgb(102, 165, 81);
    font-size: 1.1rem;
    transform: translate3d(0, 48px, 0);

    &:hover {
      background-color: rgb(70, 177, 37);
    }

    @media screen and (max-width: 575px) {
      transform: translate3d(0, 0, 0);
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

  @media screen and (max-width: 575px) {
    flex-direction: column;

    .groups {
      margin-top: 12px;
    }

    ul {
      margin-left: 0;
      width: auto;
    }
  }
}

.googlesheet-link {
  display: inline-flex;

  &:hover {
    text-decoration: none;
  }
}

/* transitions */
.participants-enter-active {
  transition: opacity 0.6s ease-out;
}

.participants-enter-from {
  opacity: 0;
}

.participants-leave-active {
  transition: all 0.2s ease-out;
}

.participants-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
</style>
