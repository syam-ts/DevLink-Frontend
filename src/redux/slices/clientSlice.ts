import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Client {
  name: string;
  email: string;
  mobile: number;
}

interface ClientState {
  currentClient: Client | null;
  isClient: boolean;
  notifications: string[];
  notificationsUnread: number;
}

const initialState: ClientState = {
  currentClient: null,
  isClient: false,
  notifications: [],
  notificationsUnread: 0,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    signInClient: (state, action: PayloadAction<Client>) => {
      state.currentClient = action.payload;
      state.isClient = true;
    },
    updateClient: (state, action: PayloadAction<Client>) => {
      state.currentClient = action.payload;
    },

    signOutClient: (state) => {
      state.currentClient = null;
      state.isClient = false;
    },
    addNotificationClient: (state, action) => {
      const parsedNotifications = JSON.parse(action.payload);
      state.notifications.push(...parsedNotifications);
      state.notificationsUnread++;
    },
    markAsReadNotifications: (state) => {
      state.notificationsUnread = 0;
    },
    clearNotificationsClient: (state) => {
      state.notifications = [];
    },
  },
});

export default clientSlice.reducer;
export const {
  signInClient,
  updateClient,
  addNotificationClient,
  markAsReadNotifications,
  clearNotificationsClient,
  signOutClient,
} = clientSlice.actions;
