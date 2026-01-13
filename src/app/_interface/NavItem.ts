export interface NavItem {
      title: string;
      route: string;
      icon: string;
}

export interface NavItemExt {
      title: string;
      route: string;
      icon: string;
      enabled?: boolean;
}