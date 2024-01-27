export class MenusModel{
    id: number;
    nombre: string;
    icono: string;
    componente: string;
    url: string;
    etiqueta: string;
    padre: MenusModel;
    submenus: MenusModel[];
}