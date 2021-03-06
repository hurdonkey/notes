
const index = () => import("./index.vue");
const upsert = () => import("./upsert.vue");
const show = () => import("./show.vue");
const config = () => import("./config.vue");
const toclist = () => import("./toclist.vue");

export default {
	index,
	upsert,
	show,
	config,
	toclist,
};
