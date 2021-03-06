
import api from "../api.js";
import users from "./users.js";
import accounts from "./accounts.js";
import roles from "./roles.js";
import discounts from "./discounts.js";
import oauthUsers from "./oauthUsers.js";
import illegals from "./illegals.js";
import illegalUsers from "./illegalUsers.js";
import illegalProjects from "./illegalProjects.js";
import projects from "./projects.js";
import projectMembers from "./projectMembers.js";
import projectIssues from "./projectIssues.js";
import favorites from "./favorites.js";
import favoriteUsers from "./favoriteUsers.js";
import favoriteProjects from "./favoriteProjects.js";

// 交易
import trades from "./trades.js";
import goods from "./goods.js";
import orders from "./orders.js";

// 系统
import admins from "./admins.js";
import sensitiveWords from "./sensitiveWords.js";
import caches from "./caches.js";

// 探索APP
import paracraftDevices from "./paracraftDevices.js";
import paracraftGameCoinKeys from "./paracraftGameCoinKeys.js";
import paracraftGameCoinKeyBuys from "./paracraftGameCoinKeyBuys.js";
import paracraftGameCoinKeyActives from "./paracraftGameCoinKeyActives.js";

export default {
	users,
	accounts,
	roles,
	discounts,
	oauthUsers,
	illegals,
	illegalUsers,
	illegalProjects,
	projects,
	projectMembers,
	projectIssues,
	favorites,
	favoriteUsers,
	favoriteProjects,
	
	trades,
	goods,
	orders,

	admins,
	caches,
	sensitiveWords,

	paracraftDevices,
	paracraftGameCoinKeys,
	paracraftGameCoinKeyBuys,
	paracraftGameCoinKeyActives,
}
