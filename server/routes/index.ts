import pluginId from "../../admin/src/pluginId";

export default [
  {
    method: "GET",
    path: "/:uid",
    handler: "htmlMediaController.findOne",
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/",
    handler: "htmlMediaController.upload",
    config: {
      policies: [],
      middlewares: [`plugin::${pluginId}.uploadMiddleware`],
    },
  },
  {
    method: "DELETE",
    path: "/:uid",
    handler: "htmlMediaController.delete",
    config: {
      policies: [],
    },
  },
];
