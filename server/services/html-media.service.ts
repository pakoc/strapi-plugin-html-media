import { Strapi } from "@strapi/strapi";
import pluginId from "../../admin/src/pluginId";

export default ({ strapi }: { strapi: Strapi }) => ({
  async save(data) {
    const item = await strapi.entityService?.create(
      `plugin::${pluginId}.html-media`,
      {
        data,
      }
    );
    return item;
  },
  async delete(uid: string) {
    const item = await strapi?.db
      ?.query(`plugin::${pluginId}.html-media`)
      .findOne({
        where: {
          uid,
        },
      });
    return await strapi.entityService?.delete(
      `plugin::${pluginId}.html-media`,
      item.id
    );
  },
  async findOne(uid: string) {
    const item = await strapi?.db
      ?.query(`plugin::${pluginId}.html-media`)
      .findOne({
        where: {
          uid,
        },
      });
    return item;
  },
});
