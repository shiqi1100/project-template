import useModal from '@/components/use-modal/use-modal.vue'
import { createApp, watch } from 'vue'

function useModalFn() {
  const preNode = document.createElement('div')
  document.body.appendChild(preNode)

  const instance = createApp(useModal, {
    showModal: true
  })
  instance.mount(preNode)
  return new Promise((resolve, reject) => {
    const type = instance._instance?.exposed?.type
    watch(() => type.value, (val) => {
      val === '1' ? resolve('ok') : reject('cancel')
      instance.unmount()
      document.body.removeChild(preNode)
    })
  })
}
function useModalFn1(options: Record<string, any>) {
  const preNode = document.createElement('div')
  document.body.appendChild(preNode)
  const instance = createApp(useModal, {
    ...options,
    showModal: true,
    remove() {
      instance.unmount()
      document.body.removeChild(preNode)
    }
  })
  return instance.mount(preNode)
}

export default useModalFn1
