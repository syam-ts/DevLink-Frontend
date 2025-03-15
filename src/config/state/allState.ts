export interface UserState {
  user: {
    currentUser: {
      _id: string
      name: string
      email: string
      mobile: number
      profilePicture: string; 
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
      email: string 
      isVerified: boolean 
      companyName: string
    },
    isClient: boolean,
    notifications: string[]
    notificationsUnread: number
  }, 
};