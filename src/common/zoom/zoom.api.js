require('dotenv').config()
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
            Authorization: `Bearer ${process.env.ZOOM_API_KEY}`,
        },
        data
    })
}

