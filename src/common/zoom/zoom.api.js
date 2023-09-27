import axios from 'axios';

export default function zoomCall() {
    const data = {
        "topic": "test",
        "type": 2,
        "start_time": "2021-05-10T12:10:10Z",
        "duration": "3",
        "settings": {
            "host_video": true,
            "participant_video": true,
            "join_before_host": true,
            "mute_upon_entry": "true",
            "watermark": "true",
            "audio": "voip",
            "auto_recording": "cloud"
        }
    }
    return axios({
        method: 'POST',
        url: 'https://api.zoom.us/v2/users/me/meetings',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            Authorization: "Bearer eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjJkNGQ5MTI2LWUyZmEtNDkwNS1iOTU5LTRjNTljZTc0N2E1NCJ9.eyJ2ZXIiOjksImF1aWQiOiI3NDYyNjM3NTUxOGFlM2QxM2IxMDliMjNhZGQ5ODA1NiIsImNvZGUiOiJhcFdvRGFNTnFsemlJdGVKbVpvUkxLdjhNNzRyRVJIa1EiLCJpc3MiOiJ6bTpjaWQ6VE9xQ0NrZDNSUkdpWl9Cc1NqT1lvdyIsImdubyI6MCwidHlwZSI6MCwidGlkIjoxLCJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJZTkRMS1Q5YVI4Q2s4RmVQMkdKUjhRIiwibmJmIjoxNjk1NzgyNTc3LCJleHAiOjE2OTU3ODYxNzcsImlhdCI6MTY5NTc4MjU3NywiYWlkIjoielk0VkE1MllSRGFXOWRjczRzLUFOQSJ9.iIqvgrKeDfuH7yHNRo3N9TpSgySj4Lrgt9YLNKSRSv5dTXtayHG7jW2HsCSHC5_iz6QJzv_e1bBPgbsF9GkFrw",
        },
        data
    })
}

