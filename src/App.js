import axios from "axios";
import './App.css';
import Echo from 'laravel-echo';

function App() {
    const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("laravel_session="))
        ?.split("=")[1];

    async function showCookieValue() {
        console.log("cookieValue", cookieValue)
        await getUser()
    }

    async function getUser() {
        try {
            const response = await axios.get(
                'http://localhost/api/v2/live-class',
                {
                    withCredentials: true,
                },
            );
            console.log(response.data)
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    showCookieValue()
    window.Echo = new Echo({
        broadcaster: 'socket.io',
        host: `${window.location.hostname}:6001`,
        transports: ['websocket'],
        authEndpoint: 'locahost/broadcasting/auth',
    });
    window.Echo.private('events')
        .listen('RealTimeMessage', (e) => console.log('RealTimeMessage: ' + e.message));
    window.Echo.private('App.Models.User.7310')
    .notification((notification) => {
        console.log(notification);
        console.log(notification.message);
    });
    return (
        <div className="App">
            <h1>Iframe</h1>
        </div>
    );
}

export default App;
