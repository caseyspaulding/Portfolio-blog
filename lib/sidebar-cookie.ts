import Cookies from 'js-cookie';

const NAME = 'sidebar-collapsed';

export interface SidebarCookie {
    isCollapsed: boolean;
}

export const sidebarCookie = {
    get(): SidebarCookie {
        const isCollapsed = Cookies.get(NAME) === 'true';
        return { isCollapsed };
    },
    set(value: SidebarCookie) {
        Cookies.set(NAME, String(value.isCollapsed));
    }
};
