
<template>
	<div class="dailies-upsert-container container">
		<div class="header-container">
			<div class="title">新增日报</div>
			<el-button @click="clickListBtn" type="text" round>列表</el-button>
		</div>
		<div class="form-container">
			<el-form ref="form" :model="daily" label-width="80px">
				<el-form-item label="日期">
					<el-date-picker 
						style="width:100%"
						v-model="daily.date" 
						type="date" 
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="标签">
					<tags __style__="input" :__default_data__="tagsData"></tags>
				</el-form-item>
				<el-form-item label="内容">
					<el-input v-model="daily.content" 
						type="textarea" 
						:autosize="{minRows:4, maxRows:10}"
						placeholder="记录生活, 记住美好, 用一段文字记录今日工作与生活吧 ^-^"
						>
					</el-input>
				</el-form-item>
				<el-form-item label="后续">
					<el-input v-model="daily.todo" 
						type="textarea" 
						:autosize="{minRows:2, maxRows:10}"
						placeholder="明日内容">
					</el-input>
				</el-form-item>
				<el-form-item label="">
					<el-button @click="clickDailyCreateBtn">提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import _ from "lodash";

import mod from "@/components/mods/common/mod.js";

export default {
	mixins:[mod],

	data: function() {
		const date = new Date();
		return {
			daily: {
				date,
			},
			tagsData: {editable: true, tags:[]},
		}
	},

	props: {
		__default_data__: {
			type: Object,
			default: function() {
				return {
					title:"日报",
					success: null,
					fail: null,
				}
			}
		}
	},

	computed: {

	},

	methods: {
		clickListBtn() {
			this.$router.push({path:"/note/dailies"});
		},

		async clickDailyCreateBtn() {
			const {year, month, day} = g_app.util.getDate(this.daily.date);
			this.daily.date = `${year}-${month}-${day}`;
			this.daily.tags = "|" + this.tagsData.tags.join("|") + "|";
			//console.log(this.tagsData, this.daily);
			const oper = this.daily.id ? "update" : "create";
			const result = await this.api.dailies[oper](this.daily);
			if (result.isErr()) {
				this.$message({message:"创建失败", type:'error'});
				this.__data__.fail && this.__data__.fail();
				return;
			}

			const data = result.data;
			this.__data__.success && this.__data__.success(data);

			this.$router.push({path:"/note/dailies"});
		},
	},

	async mounted() {
		//console.log(this.__data__);
		if (this.__data__.id) {
			const result = await this.api.dailies.getById({id:this.__data__.id});
			if (result.isErr()) return;
			const daily = result.data;
			this.tagsData.tags = (daily.tags || "|").split("|").filter(o => o);
			this.daily = daily;
		}
	},
}

</script>

<style>
</style>

<style lang="less" scoped>
.dailies-upsert-container {
	/*display:flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;*/
}
.header-container {
	display: flex;
	justify-content: space-between;
	margin-top: 15px;

	.title {
		font-weight: bold;
		font-size:20px;
	}
}
</style>
