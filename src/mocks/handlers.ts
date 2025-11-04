import { http, HttpResponse } from "msw";
import {
  MOCK_COMPANY,
  MOCK_COMPANIES,
  MOCK_SESSIONS,
  MOCK_EVENT,
  MOCK_SPEAKERS,
  MOCK_SESSION,
  MOCK_SPEAKER,
} from "./data";
import MOCK_MEMBERS from "./data/member";

const CANNON_URL = process.env.CANNON_URL;
const DECK_URL = process.env.DECK_URL;

export const handlers = [
  // get latest sinfo event
  http.get(`${CANNON_URL}/event/latest`, () => {
    return HttpResponse.json(MOCK_EVENT);
  }),
  // get a specific company
  http.get(`${DECK_URL}/companies/*`, () => {
    return HttpResponse.json(MOCK_COMPANY);
  }),
  // get all companies for the edition
  http.get(`${DECK_URL}/companies`, () => {
    return HttpResponse.json(MOCK_COMPANIES);
  }),
  // get a specific speaker
  http.get(`${CANNON_URL}/speaker/*`, () => {
    return HttpResponse.json(MOCK_SPEAKER);
  }),
  // get all speakers for the edition
  http.get(`${CANNON_URL}/speaker`, () => {
    return HttpResponse.json({
      eventId: MOCK_EVENT,
      speakers: MOCK_SPEAKERS,
      previousEdition: false,
    });
  }),
  // get all members for the edition
  http.get(`${CANNON_URL}/member`, () => {
    return HttpResponse.json(MOCK_MEMBERS);
  }),
  // get a specific session
  http.get(`${CANNON_URL}/session/*`, () => {
    return HttpResponse.json(MOCK_SESSION);
  }),
  // get all sessions
  http.get(`${CANNON_URL}/session`, () => {
    return HttpResponse.json(MOCK_SESSIONS);
  }),
  // get all prizes
  http.get(`${CANNON_URL}/prizes`, () => {
    return HttpResponse.json([]);
  }),
];
