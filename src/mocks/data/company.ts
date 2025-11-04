export const MOCK_COMPANY: Company =  {
    "id": "freiheit",
    "name": "freiheit.com",
    "site": "https://freiheit.com/en/",
    "advertisementLvl": "none",
    "partner": false,
    "img": "https://static.sinfo.org/static%2F30-sinfo%2FcompanyLogos%2Ffreiheit.webp",
    "standDetails": {
      "chairs": 2,
      "table": true,
      "lettering": true
    },
    "stands": [
      {
        "standId": "3",
        "date": "2025-02-17T00:00:00Z"
      },
      {
        "standId": "3",
        "date": "2025-02-18T00:00:00Z"
      },
      {
        "standId": "3",
        "date": "2025-02-19T00:00:00Z"
      }
    ]
  };

export const MOCK_COMPANIES: Company[] = [ MOCK_COMPANY,
  {
    "id": "miniclip",
    "name": "Miniclip",
    "site": "http://www.miniclip.com",
    "advertisementLvl": "none",
    "partner": false,
    "img": "https://static.sinfo.org/static%2F30-sinfo%2FcompanyLogos%2FMiniclip.webp",
    "standDetails": {
      "chairs": 2,
      "table": true,
      "lettering": true
    },
    "stands": [
      {
        "standId": "22",
        "date": "2025-02-20T00:00:00Z"
      }
    ]
  },
  {
    "id": "pasteisdebelem",
    "name": "Pastéis de Belém",
    "site": "https://pasteisdebelem.pt/",
    "advertisementLvl": "other",
    "partner": true,
    "img": "https://static.sinfo.org/static%2F30-sinfo%2FcompanyLogos%2Fpasteisdebelem.webp",
    "standDetails": {
      "chairs": 0,
      "table": false,
      "lettering": false
    }
  },
];


