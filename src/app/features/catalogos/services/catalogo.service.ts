import {IdiomaModel} from 'src/app/core/models/idiomas/idioma-model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {CatalogoModel} from '../../../core/models/catalogos/catalogo-model';
import {PageRequestParams} from 'src/app/core/utils/requests/catalogos/page-request-params.model';
import {PageModel} from 'src/app/core/utils/responses/page.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  private baseUrl = environment.apiUrl + '/catalogos';
  private idiomasUrl = environment.apiUrl + '/idiomas';

  constructor(
    private http: HttpClient
  ) {
  }

  getPagesByTipoCatalogo(tipoCatalogo: string, pageRequestParams: PageRequestParams): Observable<PageModel> {
    let queryParams = new HttpParams();
    for (let i in pageRequestParams) {
      if (!(pageRequestParams[i] === null || pageRequestParams[i] === '')) {
        queryParams = queryParams.append(i, pageRequestParams[i]);
      }
    }
    return this.http.get<PageModel>(this.baseUrl + '/' + tipoCatalogo + '/page', {params: queryParams});
  }

  getPagesByTipoCatalogoAndIdPadre(tipoCatalogo: string, padreId: string, pageRequestParams: PageRequestParams): Observable<PageModel> {
    let queryParams = new HttpParams();
    for (let i in pageRequestParams) {
      queryParams = queryParams.append(i, pageRequestParams[i]);
    }
    return this.http.get<PageModel>(this.baseUrl + '/' + tipoCatalogo + '/page/' + padreId, {params: queryParams});
  }

  getAllByTipoCatalogo(tipoCatalogo: string): Observable<any> {
    return this.http.get<PageModel>(this.baseUrl + '/' + tipoCatalogo + '/all');
  }

  getByTipoCatalogo(tipoCatalogo: string): Observable<any> {
    return this.http.get(this.baseUrl + '/' + tipoCatalogo + '/all');
  }

  postCatalogo(catalogo: CatalogoModel): Observable<CatalogoModel> {
    return this.http.post<CatalogoModel>(this.baseUrl + '/', catalogo);
  }


  //////////////////////////////////////////////////////////7
  findById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findById/${id}`);
  }

  create(data: CatalogoModel): Observable<any> {
    data.activo = true;
    data.createdAt = new Date();
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  update(data: CatalogoModel): Observable<any> {
    data.activo = true;
    data.updatedAt = new Date();
    return this.http.put(`${this.baseUrl}/update`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteById/${id}`);
  }

  createIdioma(data: IdiomaModel): Observable<any> {
    return this.http.post(`${this.idiomasUrl}/create`, data);
  }

  findIdiomaById(languageId: string): Observable<any> {
    return this.http.get(`${this.idiomasUrl}/findById/${languageId}`);
  }

  readIdiomas(): Observable<any> {
    return this.http.get(`${this.idiomasUrl}/all`);
  }

  putIdioma(data: IdiomaModel): Observable<any> {
    return this.http.put(`${this.idiomasUrl}/update`, data);
  }

  pageIdiomas(pageRequestParams: PageRequestParams): Observable<any> {
    let queryParams = new HttpParams();
    for (let i in pageRequestParams) {
      if (!(pageRequestParams[i] === null || pageRequestParams[i] === '')) {
        queryParams = queryParams.append(i, pageRequestParams[i]);
      }
    }
    return this.http.get<PageModel>(`${this.idiomasUrl}/page`, {params: queryParams});
  }

  updateIdioma(data: IdiomaModel): Observable<any> {
    return this.http.put(`${this.idiomasUrl}/update`, data);
  }

  deleteIdioma(id: number): Observable<any> {
    return this.http.delete(`${this.idiomasUrl}/delete/${id}`);
  }

  readIdiomasTemplate(): Observable<any> {
    return this.http.get('./assets/i18n_bkp/es.json');
  }

  getCatalogos(tipo: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${tipo}`);
  }

  getCatalogosId(tipo: string, id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${tipo}/${id}`);
  }

  getAllCatalogos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/page`);
  }
}
