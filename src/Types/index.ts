import type { ComponentType } from "react";

export interface TResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}
export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
export type TRole = "ADMIN" | "AGENT" | "USER";
type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};
type ErrorSource = {
  path: string;
  message: string;
};
export interface IErrorResponse {
  success: string;
  message: string;
  errorSources?: ErrorSource[];
  err?: {
    issues: ZodIssue[];
    name: string;
  };
  stack?: string;
}
