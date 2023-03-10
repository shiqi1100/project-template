import axios from 'axios'
import qs from 'qs'
import { ElMessage, ElNotification } from 'element-plus'
import { RspCode, StatusCode } from './EnumAxios'
import type {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError
} from 'axios'
import type { ResponseResult } from '#/axios'

export default class VAxios {
  private axiosInstance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config)
    this.initInterceptors()
  }

  initInterceptors() {
    this.axiosInstance.interceptors.request.use((config:any) => {
      config.headers = {
        ...config.headers
      }
      return config
    })

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<ResponseResult>) => {
        try {
          if (response.status === StatusCode.SUCCESS) {
            if (response.data?.rspCode === RspCode.SUCCESS) {
              response.data?.rspMsg && ElMessage.info(response.data.rspMsg)
              return Promise.resolve(response.data)
            } else {
              return Promise.reject(response.data)
            }
          } else {
            return Promise.reject('ERROR')
          }
        } catch (e) {
          return Promise.reject(e)
        }
      },
      (err: AxiosError) => {
        console.log('onRejected', err)
        const { message, code } = err
        // 请求失败（400~）
        ElNotification['error']({
          message: code,
          description: message
        })

        return Promise.reject(err.message)
      }
    )
  }

  request<T = any>(config: AxiosRequestConfig): Promise<ResponseResult<T>> {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<ResponseResult<T>>(config)
        .then((res: AxiosResponse<ResponseResult>) => {
          try {
            return resolve(res as any)
          } catch (err) {
            return reject(err || new Error('request error!'))
          }
        })
        .catch((err: Error | AxiosError) => {
          reject(err)
        })
    })
  }

  post<T = any>(config: AxiosRequestConfig): Promise<ResponseResult<T>> {
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/octet-stream'
    }
    return this.request({
      ...config,
      method: 'POST',
      paramsSerializer: (params: any) => {
        return qs.stringify(params, { indices: false })
      }
    })
  }
  // form data 传参
  dataPost<T = any>(config: AxiosRequestConfig): Promise<ResponseResult<T>> {
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return this.request({
      ...config,
      method: 'POST',
    })
  }

  // bi请求
  biPost<T = any>(
    config: AxiosRequestConfig,
    hasBaseURL = true
  ): Promise<ResponseResult<T>> {

    if (hasBaseURL) {
      config.baseURL = ''
    }
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json'
    }

    config.data = {
      ...config.data,
    }

    return this.request({
      ...config,
      method: 'POST'
    })
  }

  get<T = any>(config: AxiosRequestConfig): Promise<ResponseResult<T>> {
    return this.request({
      ...config,
      method: 'GET'
    })
  }
}
