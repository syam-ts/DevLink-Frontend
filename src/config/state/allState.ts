 export interface UserState {
    user: {
      currentUser: {
        _id: string
        name: string
        email: string
        mobile: number
        isProfileFilled: boolean
      },
      isUser: boolean,
      notifications: string[]
      notificationsUnread: number
    }
  };


 export interface ClientState {
    client: {
      currentClient: {
        _id: string
        name: string
        email: string
        mobile: number
        isProfileFilled: boolean
      },
      isUser: boolean,
      notifications: string[]
      notificationsUnread: number
    }
  };