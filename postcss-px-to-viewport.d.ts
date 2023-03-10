declare module 'postcss-px-to-viewport' {

    type Options = {
        unitToConvert: 'px' | 'rem' | 'cm' | 'em',
        viewportWidth: number,

        // 下面的不常用，上面的常用
        viewportHeight: number, // 目前未使用；TODO:需要不同的单位和不同属性的数学
        unitPrecision: number,
        viewportUnit: string,
        fontViewportUnit: string,  // vmin更适合
        selectorBlackList: string[],
        propList: string[],
        minPixelValue: number,
        mediaQuery: boolean,
        replace: boolean,
        landscape: boolean,
        landscapeUnit: string,
        landscapeWidth: number
    }

    // 注意：这里导出一个函数，如果使用箭头函数容易报错，推荐使用 function 这种写法
    export default function(options: Partial<Options>):any
}