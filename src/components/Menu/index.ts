import { getMenuAssociationReport } from "@/api/menu"
import { useLoginStore } from '@/stores/login'
import { storeToRefs } from "pinia";

const store = useLoginStore()
const { state } = storeToRefs(store)

export const getMenuList = async () => {
  const parmas = {
    token: state.value.token,
    COMPANYID: state.value.companyId
  }
  const res = await getMenuAssociationReport(parmas)
  return res.data.ReportForms
}
