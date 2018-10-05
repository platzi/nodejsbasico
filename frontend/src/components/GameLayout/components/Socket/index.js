import io from 'socket.io-client';
import config from '../../../../backend.config';

export default (()=>{
  let socket = null,
      status = {
        isInit: false,
        isBinded: false,
      };

  const bindHandlers = (socket) => {
    socket.on("opponent", (data)=>{
      console.log("Opponent:", data);
    });
  }

  const start = () => {
    const { SERVER_ADDRESS, SERVER_PROTOCOL, SERVER_PORT } = config;
    if (!status.isInit) {
      socket = io.connect(`${SERVER_PROTOCOL}${SERVER_ADDRESS}:${SERVER_PORT}`);
      status.isInit = true;
    }
    if (!status.isBinded) {
      bindHandlers(socket);
      status.isBinded = true;
    }
  }

  const stop = (onDisconnect) => {
    socket.disconnect();
    status.isInit = false;
  }

  return {
    instance: () => socket,
    start,
    stop,
  }
})()