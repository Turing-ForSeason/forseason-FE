import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LiveTalkList() {
    const [roomList ,setRoomList] = useState([]);

    useEffect(() => {
        axios.get('/talk/rooms')
        .then(response => {
            setRoomList(response.data.result);
        })
        .catch(error => {
            console.error('Error fetching room data:',error.data);
        });
    }, []);

    return(
        <div>
            <ul>
                {roomList.map(room => {
                    <ul>
                        <li key={room.location}>
                            <Link to={`/community/livetalk/talkroom?location=${room.location}`}>room.location</Link>
                        </li>
                    </ul>
                })}
            </ul>
        </div>
    );
}
export default LiveTalkList;