import { defineConfig } from 'use-axios-http'
import { BASE_URL } from './config'
import type { AxiosError } from "axios";
import { useFormDataHandler } from './transform'

type RequestData = {
  token: string
  COMPANYID: string
}

export type ResponseDataWrapper<T = any> = {
  data: T
  rspCode: number
  rspMsg: string
}

export default defineConfig<RequestData, ResponseDataWrapper>({
  config: {
    baseURL: BASE_URL
  },
  interceptors: {
    request: {
      onFulfilled: (config:any) => {
        const token = localStorage.getItem('call_telemarketing_token') ?? ''
        const COMPANYID =
          localStorage.getItem('call_telemarketing_companyId') ?? ''
        if (config.params) {
          config.params = {
            ...config.params,
            token,
            COMPANYID
          }
        }
        if (config.data) {
          config.data = {
            ...config.data,
            token,
            COMPANYID
          }
        }

        // plugins
        useFormDataHandler(config)

        return config
      },
      onRejected: (error: any) => {
        return Promise.reject(error)
      }
    },
    response: {
      onFulfilled: config => {
        // 状态 200 且 data 正常有值
        if (config.status === 200 && !!config.data) {
          // 根据接口状态码继续细分 resolve reject
          return config.data.rspCode === 0
            ? Promise.resolve(config.data)
            : Promise.reject(config.data.rspMsg)
        } else {
          return Promise.reject(`${config.statusText}: Bad Request!`)
        }
      },
      onRejected: (error: AxiosError) => {
        return Promise.reject(`${error.code}: ${error.message}`)
      }
    }
  }
})
