
<template>
	<div class="cellphones-index-container">
		<mt-header :title="user.nickname || user.username"></mt-header>
	</div>
</template>

<script>
import _ from "lodash";

import mod from "@/components/mods/common/mod.js";

export default {
	mixins:[mod],

	data: function() {
		return {
		}
	},

	props: {
	},

	computed: {
	},

	watch: {
	},

	created() {
		if (!this.isAuthenticated) {
			return this.push("/note/cellphones/login");
		}
	},

	beforeMount() {
	},

	mounted() {
	},
}
</script>

<style lang="less">
</style>

<style lang="less" scoped>
</style>
