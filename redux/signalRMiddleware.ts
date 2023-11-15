"use client";
import { Middleware } from 'redux';
import * as signalR from "@microsoft/signalr";
import { clearScrollTrackingData } from './readerTrackingSlice';



// Create a new connection to the SignalR hub
let connection : signalR.HubConnection | null = null;

export const signalRMiddleware: Middleware = storeAPI => next => action => {
  const state = storeAPI.getState();
  const accessToken = state.session.accessToken;
  // Create a new connection to the SignalR hub if it doesn't exist
  if (!connection && accessToken) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(process.env.NEXT_PUBLIC_READSENSE_API_URL+"/hub", {
        accessTokenFactory: () =>  accessToken
    } as signalR.IHttpConnectionOptions)
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    // Start the connection
    connection.start()
      .then(() => console.log('Connection started'))
      .catch((err: any) => console.log('Error while starting connection: ' + err))
  }

  if(connection){
    switch (action.type) {
      case 'readerTracking/sendScrollTrackingData':
        const data =  storeAPI.getState().readerTracking.scrollTrackingData;
        const events = {
          environmentId: state.reader.environmentId,
          readSettingsEventId: state.reader.readSettingsEventId,
          bookId: state.reader.bookId,
          data: data,
        };
        connection.invoke("ScrollEvents", events)
          .then(() => {
              // Clear the scroll tracking data after it has been sent
              storeAPI.dispatch(clearScrollTrackingData(data));
          })
          .catch( (err: any) => console.error(err.toString()));
        break;
      default:
        break;
    }
  }
  
  return next(action);
};