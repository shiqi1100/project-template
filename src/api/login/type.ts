export interface LoginParams {
  userName: number | string
  passWord: number | string
  auto?: number
  terminaltype?: 'WEB'
}

export interface LoginResultModel {
  auth: {
    accessToken: string
    refreshToken: string
  }
  authList: string[]
  companyCode: string
  companyId: number
  companyImage: string
  realNameInCompany: string
  userInfo: {
    profileId: string
    realName: string
    companyName: string
  }
}

export interface LogisticsSchedulesParams {
  page: number
  pageSize: number
  token: string
  COMPANYID: number | null
}