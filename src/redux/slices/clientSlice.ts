import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Client {
    name: string;
    email: string;
    mobile: number;
};


 

interface ClientState {
    currentClient: Client | null,
    isClient: boolean,
    notifications: string[];
    notificationsUnread: number;
};

const initialState: ClientState = {
    currentClient: null,
    isClient: false,
    notifications: [],
    notificationsUnread: 0

}


const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        signInClient: (state: any, action: PayloadAction<Client>) => { 
            state.currentClient = action.payload;
            state.isClient = true;
        },
        updateClient: (state: any, action: PayloadAction<Client>) => { 
            state.currentClient = action.payload;
        },

        signOutClient: (state: any) => {
            state.currentClient = null;
            state.isClient = false;
        },
        addNotificationClient: (state: any, action: any) => { 
            const parsedNotifications = JSON.parse(action.payload);
            state.notifications.push(...parsedNotifications);
            state.notificationsUnread++;

        },
        markAsReadNotifications: (state: any) => { 
            state.notificationsUnread = 0;

        },
        clearNotifications: (state: any) => {
            state.notifications = [];
        }

    }
});


export default clientSlice.reducer;
export const { signInClient, updateClient, addNotificationClient, markAsReadNotifications, clearNotifications, signOutClient } = clientSlice.actions;