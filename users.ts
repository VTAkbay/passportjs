interface User {
    id: string;
    username: string;
    password: string;
}

export const users: Record<string, User> = {
    onlyjs: { id: "8286725", username: "onlyjs", password: "onlyjspassword" },
};