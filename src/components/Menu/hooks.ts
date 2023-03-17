import { getMenuList } from "./index";

export async function handleMenuData() {
  const menuData = await getMenuList();
  console.log(menuData, 'line 5');

  // const treeData = {
  //   id: '',
  //   label: '',
  //   children: []
  // }

  const menuDataArr: string[] = [];

  for (let i = 0; i <= menuData.length; i++) {
    if (!menuDataArr.includes(menuData[i]?.parentAuthName)) {
      menuDataArr.push(menuData[i]?.parentAuthName);
    }
  }

  const A = menuDataArr.map((item, index) => {
    return  menuData.filter((itemMenu: Record<string, any>) => {
      return itemMenu.parentAuthName === item
    }).map((itemMenu: Record<string, any>, indexMenu: number) => {
      if (itemMenu.parentAuthName === item) {
        return {
          label: itemMenu.authName,
          index: index + "-" + indexMenu
        }
      }
    });
  });

  console.log(A);

}


handleMenuData();
