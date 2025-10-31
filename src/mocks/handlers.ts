import { http, HttpResponse } from "msw";
import {
  MOCK_COMPANY,
  MOCK_COMPANIES,
  MOCK_SESSIONS,
  MOCK_EVENT,
  MOCK_SPEAKERS,
  MOCK_SESSION,
  MOCK_SPEAKER,
  MOCK_SESSION_STATUS,
} from "./data";
import MOCK_MEMBERS from "./data/member";

const BACKEND_URL = process.env.CANNON_URL;

export const handlers = [
  // get latest sinfo event
  http.get(`${BACKEND_URL}/event/latest`, () => {
    return HttpResponse.json(MOCK_EVENT);
  }),
  // get cannon_token for the user
  http.post(`${BACKEND_URL}/auth/*`, () => {
    return HttpResponse.json({
      token: "some_cannon_token",
    });
  }),
  // get a specific company
  http.get(`${BACKEND_URL}/company/*`, () => {
    return HttpResponse.json(MOCK_COMPANY);
  }),
  // get all companies for the edition
  http.get(`${BACKEND_URL}/company`, () => {
    return HttpResponse.json(MOCK_COMPANIES);
  }),
  // get a specific speaker
  http.get(`${BACKEND_URL}/speaker/*`, () => {
    return HttpResponse.json(MOCK_SPEAKER);
  }),
  // get all speakers for the edition
  http.get(`${BACKEND_URL}/speaker`, () => {
    return HttpResponse.json({
      eventId: MOCK_EVENT,
      speakers: MOCK_SPEAKERS,
      previousEdition: false,
    });
  }),
  // session check-in
  http.post(`${BACKEND_URL}/session/*/check-in`, () => {
    return HttpResponse.json(MOCK_SESSION_STATUS);
  }),
  // get a specific session
  http.get(`${BACKEND_URL}/session/*`, () => {
    return HttpResponse.json(MOCK_SESSION);
  }),
  // get all sessions for the edition
  http.get(`${BACKEND_URL}/session`, () => {
    return HttpResponse.json(MOCK_SESSIONS);
  }),

  // get all members for the edition
  http.get(`${BACKEND_URL}/member`, () => {
    return HttpResponse.json(MOCK_MEMBERS);
  }),
];
