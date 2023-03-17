import { getMenuList } from './index'

export async function handleMenuData() {
  const menuData = await getMenuList()
  console.log(menuData);

  const treeData = {
    id: '',
    label: '',
    children: []
  }

  const menuDataArr: string[] = []

  for (let i = 0; i <= menuData.length; i++) {
    if (!menuDataArr.includes(menuData[i].parentAuthName)) {
      menuDataArr.push(menuData[i].parentAuthName)
    }
  }




  // const parentArrData = menuData.filter((item: Record<string, any>, index: number) => {
  //
  //
  //
  //
  //
  //
  // })


}


handleMenuData()
