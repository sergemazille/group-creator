import App from './App.vue';
import { GroupsMaker } from './app/GroupsMaker';
import { ParticipantRepository } from './app/ParticipantRepository';
import { createApp } from 'vue';

const googleSheetBaseUrl = import.meta.env.VITE_GOOGLE_SHEET_BASE_URL;
const googleSheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
const googleSheetEndpoint = `${googleSheetBaseUrl}/${googleSheetId}/1/public/full?alt=json` as string;
const participantRepository = new ParticipantRepository(googleSheetEndpoint);

const googleDocumentBaseUrl = 'https://docs.google.com/spreadsheets/d';
const googleDocumentEditionEndoint = `${googleDocumentBaseUrl}/${googleSheetId}/edit#gid=0` as string;

const app = createApp(App);

app.provide('participantRepository', participantRepository);
app.provide('groupsMaker', new GroupsMaker());
app.provide('googleDocumentEditionEndoint', googleDocumentEditionEndoint);

app.mount('#app');
