import { getMenuList } from "./index";

export async function handleMenuData() {
  let menuData: any = await getMenuList();
  const menuDataArr: string[] = [];

  for (let i = 0; i < menuData.length; i++) {
    if (!menuDataArr.includes(menuData[i]?.parentAuthName)) {
      menuDataArr.push(menuData[i]?.parentAuthName);
    }
  }

  menuData = menuDataArr.map((item: string, index:number) => {
    const A =  menuData.filter((menuitem: Record<string, any>) => {
      return menuitem.parentAuthName === item
    }).map((handleMenuItem: Record<string, any>, handleMenuIndex: number) => {
      return {
        id: index + 1 + '-' + handleMenuIndex,
        icon: handleMenuItem.icon,
        label: handleMenuItem.authName,
      }
    })
    return {
      id: index + 1 + '',
      label: item,
      children: [...A]
    }
  })

  return menuData

}
