import type { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { isString } from '@/utils/is'

export function useFormDataHandler(config: AxiosRequestConfig) {
  if (
    isString(config.headers?.['Content-Type']) &&
    config.headers?.['Content-Type'].includes('x-www-form-urlencoded')
  ) {
    config.data = qs.stringify(config.data)
  }
}
