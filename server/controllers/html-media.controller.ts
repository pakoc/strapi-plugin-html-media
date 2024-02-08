import { Strapi } from "@strapi/strapi";
import pluginId from "../../admin/src/pluginId";

const serviceName = "htmlMediaService";

export default ({ strapi }: { strapi: Strapi }) => ({
  async upload(ctx) {
    try {
      ctx.body = await strapi
        .plugin(pluginId)
        .service(serviceName)
        .save(ctx.state.uploadedData);
    } catch (e) {
      ctx.badRequest(e);
    }
  },

  async delete(ctx) {
    try {
      ctx.body = await strapi
        .plugin(pluginId)
        .service(serviceName)
        .save(ctx.request.params.uid);
    } catch (e) {
      ctx.badRequest(e);
    }
  },

  async findOne(ctx) {
    ctx.body = await strapi
      .plugin(pluginId)
      .service(serviceName)
      .findOne(ctx.request.params.uid);
  },
});
