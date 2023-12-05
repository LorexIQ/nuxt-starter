type IconsInnerType = { [name: string]: string };
const prepareIconsType = <T extends IconsInnerType>(config: T): T => config;

const icons = prepareIconsType({
    Catalog: 'grommet-icons:catalog-option',
    Basket: 'humbleicons:basket'
});

export type IconsType = keyof typeof icons;
export default icons;
