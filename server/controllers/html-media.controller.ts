import { Strapi } from "@strapi/strapi";
import pluginId from "../../admin/src/pluginId";

export default ({ strapi }: { strapi: Strapi }) => ({
  async upload(ctx) {
    try {
      ctx.body = await strapi
        .plugin(pluginId)
        .service("htmlMediaService")
        .save(ctx.state.uploadedData);
    } catch (e) {
      ctx.badRequest(e);
    }
  },

  async findOne(ctx) {
    ctx.body = await strapi
      .plugin(pluginId)
      .service("htmlMediaService")
      .findOne(ctx.request.params.uid);
  },
});
