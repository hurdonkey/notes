
<template>
	<div class="apis-index-container container">
		<dialogs __style__="confirm" :__default_data__="dialogsConfirmData"></dialogs>
		<div class="header-container">
			<div>
				<inputs __style__="query" :__default_data__="inputsQueryData"></inputs>
			</div>
			<div>
				<el-button @click="clickNewBtn" type="text">新增</el-button>
				<el-button @click="clickConfigBtn" type="text">配置</el-button>
			</div>
		</div>
		<el-table :data="apis" :default-sort="{prop:'title', order:'ascending'}">
			<el-table-column type="expand">
				<template slot-scope="{row}">
					<apis __style__="show" :__default_data__="row | apiFilters"></apis>
				</template>
			</el-table-column>
			<el-table-column prop="title" label="标题" sortable>
			</el-table-column>
			<el-table-column prop="method" label="方法" width="120px">
			</el-table-column>
			<el-table-column prop="url" label="URL" sortable>
			</el-table-column>
			<el-table-column prop="projectLabel" label="项目" sortable>
			</el-table-column>
			<el-table-column label="操作" fixed="right" width="100px">
				<template slot-scope="{row, $index}">
					<i @click="clickEditBtn(row)" class="oper-icon el-icon-edit" data-toggle="tooltip" title="编辑"></i>
					<i @click="clickDeleteBtn(row, $index)" class="oper-icon el-icon-delete" data-toggle="tooltip" title="移除"></i>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import _ from "lodash";

import common from "./common.js";

export default {
	mixins:[common],

	data: function() {
		return {
			dialogsConfirmData: {},
			baseUrl:"",
			baseUrlDescription:"",
			headerKey:"",
			headerValue:"",
			paramKey:"",
			paramType:"string",
			paramDescription:"",
			paramValue:"",
			dataKey:"",
			dataType:"string",
			dataDescription:"",
			dataValue:"",
			searchValue:"",
			searchField:"title",
			fields: [
			{label:"标题", value:"title"},
			{label:"备注", value:"description"},
			],
			types:[
			{label:"字符串", value:'string'},
			{label:"数字", value:"number"},
			{label:"布尔", value:"boolean"},
			{label:"对象", value:"object"},
			],
			head: {
				title:"API列表",
			},

		}
	},

	props: {
	},

	computed: {
	},

	watch: {
		searchValue(str) {
			this.handleSearchChange(str);
		}
	},

	filters: {
		apiFilters(api) {
			const data =  _.cloneDeep(api);
			data.loaded = true;
			return data;
		}	
	},

	methods: {
		handleSelectField() {
			this.searchValue = "";
		},

		handleSearchChange(str) {
			this.apis = [];
			_.each(this.apisBackUp, x => {
				const value = x[this.searchField];
				if (g_app.util.lcs(value, str) == str.length) {
					this.apis.push(x);
				}
			});
		},

		clickConfigBtn() {
			this.push("/note/apis/config");
		},

		clickNewBtn(x) {
			if (x && x.id)  return 	this.$router.push({path:"/note/apis/upsert?id=" + x.id + "&oper=" + "create"});

			this.$router.push({path:"/note/apis/upsert"});
		},

		async clickDeleteBtn(x, index) {
			this.dialogsConfirmData = {
				visible: true,
				title:"删除确认",
				content:"确定要删除此条记录?",
				success: async () => {
					const result = await this.api.apis.delete({id:x.id});
					if (result.isErr()) return this.$message({message:"删除失败"});
					this.apis.splice(index, 1);
				}
				
			};
		},

		async clickEditBtn(x) {
			this.$router.push({path:"/note/apis/upsert?id=" + x.id});
		}
	},

	async mounted() {
		await this.loadProjects();
		const apis = await this.loadDatas();
		this.apisBackUp = apis;
	},
}
</script>

<style>
</style>

<style lang="less" scoped>
.apis-index-container {

}
.item-container {
	display: flex;
}
.header-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
