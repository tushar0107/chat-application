import React, {createContext, useContext, useEffect} from 'react';

const WebSocketContext = createContext<any>(null);

export const useWebSocket = () =>{
    const context = useContext(WebSocketContext);
    if(!context){
        throw new Error('useWebSocket must be used within a WebSocketProvider')
    }
    return context;
};

export const WebSocketProvider: React.FC = ( { children }:any ) => {
    const socket = new WebSocket(`ws://localhost:8000/7304431820`);

    useEffect(()=>{
        return () =>{
            socket.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={socket}>
            {children}
        </WebSocketContext.Provider>
    )
};