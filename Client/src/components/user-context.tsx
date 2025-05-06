import { createContext, ReactElement, useState } from "react";

type User = {
    Id: number,
    UserName: string,
    Name: string,
    Password: string,
    Email: string,
    Phone: string,
    Tz: string
};

type SystemUser = {
    user: User,
    connected: boolean,
    setUser: Function,
    setConnected: Function
};

const initUser: User = {
    Id: 5,
    UserName: "userName",
    Name: "name",
    Password: "password",
    Email: "t0504114734@gmail.com",
    Phone: "0504114734",
    Tz: "789654354"
};

const initSUser: SystemUser = {
    user: initUser,
    connected: false,
    setUser: (user: User) => { console.log(user.UserName) },
    setConnected: (connected: Boolean) => { console.log("connected :", connected) }
};

export const context = createContext<SystemUser>(initSUser);

const UserProvider = ({ children }: { children: ReactElement[] }) => {
    const [user, setUser] = useState<User>(initUser)
    const [connected, setConnected] = useState<boolean>(initSUser.connected);
    return <context.Provider value={{ user, connected, setUser, setConnected }}>
        {children}
    </context.Provider>
}

export default UserProvider;