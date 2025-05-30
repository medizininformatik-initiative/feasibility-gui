import { sideNavTests } from "./Tests/sideNav.cy";
import { NavItem } from "./Utilities/NavItems";

describe('App Flow', () => {
sideNavTests(NavItem.dataSelection);     
});