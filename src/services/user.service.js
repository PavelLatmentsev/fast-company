import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            userEndpoint + payload._id,
            payload
        );
        return data;
    },

    getCurrentUser: async () => {
        const { data } = await httpService.get(userEndpoint + localStorageService.getUserId());
        return data;
    },
    update: async (newData) => {
        const { data } = await httpService.put(
            userEndpoint + newData._id,
            newData
        );
        return data;
    }
};
export default userService;
