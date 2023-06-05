import httpService from "./http.services";
const todosEndepoint = "todos/";

const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndepoint, {
      params: {
        _page: 1,
        _limit: 10
      }
    });

    return data;
  },
};

export default todosService;
