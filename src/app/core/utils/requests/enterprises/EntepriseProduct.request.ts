import { ProductoModel } from "src/app/core/models/empresas/producto.model";
import { FileModel } from "src/app/core/models/files/file.model";

export class EnterpriseProductRequest{
    product: ProductoModel;
    productTechnicalDocument: FileModel[];
    productImages: FileModel[];
    productVideos: FileModel[];
}