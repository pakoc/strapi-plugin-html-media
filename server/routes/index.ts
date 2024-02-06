import pluginId from "../../admin/src/pluginId";

export default [
  {
    method: "POST",
    path: "/",
    handler: "htmlMediaController.upload",

    config: {
      // auth: true,
      policies: [],
      middlewares: [`plugin::${pluginId}.uploadMiddleware`],
    },
  },

  {
    method: "GET",
    path: "/:uid",
    handler: "htmlMediaController.findOne",
    config: {
      auth: false,
      policies: [],
    },
  },
];
