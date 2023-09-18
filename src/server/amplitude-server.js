import axios from 'axios';

export function logAmpEvent(userId, eventType, eventProperties, isProd) {
  let apiKey = "803c82be2896e464014a3ad8404618ca";
  if (isProd) {
    apiKey = "803c82be2896e464014a3ad8404618ca";
  }
  const data = {
    "api_key": apiKey,
    "events": [
      {
        "user_id": userId,
        "event_type": eventType,
        "event_properties": eventProperties,
      }
    ]
  }
  axios({
    method: "post",
    url: "https://api.amplitude.com/2/httpapi",
    headers: {
      'Content-Type':'application/json',
      'Accept':'*/*'
    },
    data
  }).catch(e => console.log(e))
}