import { request } from "@/utils/http";
import type { MenuAssociationReportParams } from "@/api/menu/type";

export const getMenuAssociationReport = (params: MenuAssociationReportParams) => request.dataPost({ url: "controlConsole/getUserBaseInfoReportForm.do", data: params })
