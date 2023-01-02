import httpService from "./http.service";

const commentEndpoint = "comment/";

const commentService = {
    createComment: async (payload) => {
        const { data } = await httpService.put(commentEndpoint + payload._id, payload);
        return data;
    },
    getComment: async (pageID) => {
        const { data } = await httpService.get(commentEndpoint, {
            params: {
                orderBy: `"pageId"`,
                equalTo: `"${pageID}"`
            }
        });
        return data;
    },
    removeComment: async (commentId) => {
        const { data } = await httpService.delete(commentEndpoint + commentId);
        return data;
    }
};
export default commentService;
