import React, { Component } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';

class LiveTalkRoom extends Component {
    constructor(props){
        super(props);
        const searchParams = new URLSearchParams(props.location.search);
        const roomLocation = searchParams.get('location') || '';

        this.connect = this.connect.bind(this);
        this.onConnect = this.onConnect.bind(this);
        this.onError = this.onError.bind(this);
        this.onMessageReceived = this.onMessageReceived.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.initUser = this.initUser.bind(this);

        this.prevMessage = null;

        this.state = {
            roomLocation: roomLocation,
            userUUID: null,
            stompClient: Stomp.over(new SockJS('/stomp/talk')),
            userNickname: null,
            userProfilePicture: null,
            messages: [],
            messageContent: '',
            userCount: 0,
            page: 0
        };
    }

    connect = () => {
        // 소켓 연결
        stompClient.connect({}, this.onConnect, this.onError);
    };

    onConnect = () => {
        // 소켓 연결후 실행될 로직들
        // 1. roomLocation을 이용하여 채팅방을 구독.
        this.state.stompClient.subscribe(`/sub/talk/room/${this.state.roomLocation}`, this.onMessageReceived);

         // 2. 입장 메세지 전송.
        this.state.stompClient.send("/pub/talk/enter", {}, 
        JSON.stringify({
            "type": 'ENTER',
            "location": this.state.roomLocation,
            "userUUID": this.state.userUUID,
            "userNickname": null,
            "userProfilePicture": null,
            "content": null,
            "date": null
        }));

         // 여기서 사용자 초기화. (userNickName, userProfilePicture)
        this.initUser();

        //여기서 이전기록들 불러오기.
        this.getTalkRecords(this.state.page);//이 함수 내부에서 this.setState(prevState => ({ page: prevState.page + 1 })); 해주자.
    };
    
    onError = (payload) => {
        if(payload!=null){
            // 오류 메세지 처리 하는 곳. (JWT 토큰 관련도 여기서 처리 예정)
            const errorResponse = JSON.parse(payload.body);
            console.log(errorResponse.code);
            console.log(errorResponse.message);
        }

        // 오류 발생 시 유저 삭제. (사실 원래 그냥 삭제 되긴함)
        axios.post('/talk/user/delete', {
            location: this.state.roomLocation,
            userUUID: this.state.userUUID
        })
        .then()
        .catch(error => {
        });
    };

    onMessageReceived = (payload) => {
        // 메세지를 받았을 때 처리하는 로직
        const message = JSON.parse(payload.body.result);
        this.setState(prevState => ({ messages: [...prevState.messages, message] }));
        if(message.type === 'ENTER' || message.type === 'LEAVE') this.updateUserCount();
    };

    sendMessage = (event) => {
        //메세지 보낼때 로직
        event.preventDefault();
        
        if (this.state.messageContent && this.state.stompClient) {
            const chatMessage = {
                "type": 'TALK',
                "location": this.state.roomLocation,
                "userUUID": this.state.userUUID,
                "userNickname": this.state.userNickname,
                "userProfilePicture": this.state.userProfilePicture,
                "content": this.state.messageContent,
                "date": null
            };
            
            this.state.stompClient.send("/pub/talk/sendMessage", {}, JSON.stringify(chatMessage));
            this.setState({ messageContent: '' });
        }
    };

    handleMessageChange = (event) => {
        this.setState({ messageContent: event.target.value });
    };

    initUser = () => {
        // 사용자 정보 초기화해주는 함수
        // 사용자의 닉네임과 프사를 DB로부터 불러와서 변수에 저장해줌
       axios.get('/talk/user/init', {
           params: {
               location: this.state.roomLocation,
               userUUID: this.state.userUUID
           }
       })
       .then(response => {
           const userNickname = response.data.result.userNickname;
           const userProfilePicture = response.data.result.userProfilePicture;
           this.setState({ userNickname, userProfilePicture });
       })
       .catch(error => {
           console.error('Failed to initialize user: ', error);
       });
   };

   getTalkRecords = (page) => {
    // page를 이용하여 이전 채팅 기록들을 DB로부터 가져오는 함수
        axios.get('/talk/talks', {
            params: {
                page: page,
                location: this.state.roomLocation,
                userUUID: this.state.userUUID
            }
        })
        .then(response => {
            this.setState(prevState => ({ 
                messages: [response.data.result, ...prevState.messages], 
                page: prevState.page + 1
            }));
        })
        .catch(error => {
            console.error('Failed to get talk records: ', error);
        });
    };

    updateUserCount = () =>{
        // userCount를 갱신해주는 함수
        axios.get('/talk/room/userCount', {
            params: {
                location: this.state.roomLocation
            }
        })
        .then(response => {
            this.setState({userCount: response.data.result.userCount});
            
        })
        .catch(error => {
            console.error('Fail to update userCount', error);
        });
    };

    componentDidMount() {
        this.connect();
    }

    componentWillUnmount() {
        if (this.state.stompClient) {
            this.state.stompClient.send("/pub/talk/leave", {}, JSON.stringify({
                "type": 'LEAVE',
                "location": this.state.roomLocation,
                "userUUID": this.state.userUUID,
                "userNickname": null,
                "userProfilePicture": null,
                "content": null,
                "date": null
            }));
        }
    }

    render(){
        return (
            <div>
                <div>
                    <h1>{this.state.roomLocation}</h1>
                    <div>{this.state.userCount}명 참여중</div>
                </div>
                <ul className='messageArea'>
                    {this.state.messages.map((message) => (
                        <MessageArea key={message.id} chat={message}/>
                    ))}
                </ul>
                <form id="messageForm" name="messageForm" onSubmit={this.sendMessage}>
                    <input type="text" id="message" placeholder="실시간 TALK에 참여해보세요" autocomplete="off" style={{width:'1000px', height: '20px', fontSize:'15px'}} 
                        value={this.state.messageContent} onChange={this.handleMessageChange} />
                    <button type="submit"  onClick={this.sendMessage}>Send</button>
                </form>
            </div>
        );
    }

}

function MessageArea(props) {
    let message;
    if(props.chat.type ==='TALK'){
        if(props.chat.userUUID === null || props.chat.userUUID === props.userUUID) message = <MyMessage chat={props.chat}/>
        else message = <OtherMessage chat={props.chat}/>
    }else if(props.chat.type === 'MINE'){
        message = <OtherMessage chat={props.chat}/>
    }

    return (
        <div>
            <DateBar chat={props.chat}/>
            {message}
        </div>
    );
}

function MyMessage(props){
    return(
        <span className='myMessage'>
            <li>
                <div>
                    <img src={props.chat.userProfilePicture} className='userProfilePictureElement'/>
                    <div className='userNameElement'>{props.chat.userNickname}</div>
                </div>
                <div className='contentElement'>{props.chat.content}</div>
                <DateParse date={props.chat.date}/>
            </li>
        </span>
    );
}

function OtherMessage(props){
    return(
        <span className='otherMessage'>
            <li>
                <div>
                    <img src={props.chat.userProfilePicture} className='userProfilePictureElement'/>
                    <div className='userNameElement'>{props.chat.userNickname}</div>
                </div>
                <div className='contentElement'>{props.chat.content}</div>
                <DateParse date={props.chat.date}/>
            </li>
        </span>
    );
}

function DateParse(props){
    let date = new Date(props.date);
    let stringDate = null;

    if (date.getHours() < 12) {
        stringDate = "오전 " + String(date.getHours()) + ":" + String(date.getMinutes()).padStart(2, '0');
    }else if (date.getHours() === 12) {
        stringDate = "오후 " + String(date.getHours()) + ":" + String(date.getMinutes()).padStart(2, '0');
    }else{
        stringDate = "오후 " + String(date.getHours() - 12) + ":" + String(date.getMinutes()).padStart(2, '0');
    }

    return (
        <div className='dateElement'>{stringDate}</div>
    );
}

function DateBar(props){
    let DateBarElement = null;

    let currentDate = new Date(props.chat.date);
    let currentStringDate = String(currentDate.getFullYear()) + "년 " + String(currentDate.getMonth() + 1) + "월 " + String(currentDate.getDate()) + "일";

    if(LiveTalkRoom.prevMessage === null){
        DateBarElement = <div className='dateBarElement'>{currentStringDate}</div>;
    }else {
        let prevDate = new Date(LiveTalkRoom.prevMessage.date);
        let prevStringDate = String(prevDate.getFullYear()) + "년 " + String(prevDate.getMonth() + 1) + "월 " + String(prevDate.getDate()) + "일";

        if(currentStringDate !== prevStringDate){
            DateBarElement = <div className='dateBarElement'>{currentStringDate}</div>;
        }
    }

    LiveTalkRoom.prevMessage = props.chat;
    return DateBarElement;
}

export default LiveTalkRoom;