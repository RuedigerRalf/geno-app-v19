export interface CookieSelection {
    necessary?: boolean;
    functional?: boolean;
    statistics?: boolean;
    marketing?: boolean;
    [key: string]: boolean | undefined;
  }