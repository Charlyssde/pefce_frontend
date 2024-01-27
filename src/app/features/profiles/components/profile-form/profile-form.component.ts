import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material';
import { AreasEnum } from 'src/app/core/enums/areas.enum';
import { MenusModel } from 'src/app/core/models/profiles/menus.model';
import { ProfileModel } from 'src/app/core/models/profiles/profiles.model';
import { CoreAuthService } from 'src/app/core/services/core-auth.service';
import { Alerts } from 'src/app/core/utils/alerts';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';


interface menu {
  activo: boolean;
  perfil: number;
  menu: MenusModel;
  nombre: string;
  crear: boolean;
  leer: boolean;
  actualizar: boolean;
  eliminar: boolean;
  reportar: boolean;
};

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnChanges {

  @Input() helpsSettings: number;
  @Input() profileId: number;
  @Input() profile: ProfileModel;
  @Input() menuList: MenusModel[];
  @Input() profilesList: ProfileModel[];

  @Output() profileOut = new EventEmitter<any>();

  switchParentProfilePermissions: boolean = false;

  areasList: any = AreasEnum;
  menus: menu[] = [];
  profilePermissions: any;
  oldProfilePermissions: any;

  formProfile: FormGroup;
  activeProfile: ProfileModel;

  constructor(
    private bottomSheet: MatBottomSheet,
    private alerts: Alerts,
    private formBuilder: FormBuilder,
    private coreAuth: CoreAuthService
  ) {
    this.activeProfile = this.coreAuth.getUserSessionData().perfil;
    this.formProfile = this.formBuilder.group({
      id: [null, []],
      nombre: [null, [Validators.required]],
      tipo: new FormControl({value:null,disabled:(this.activeProfile.tipo === 'institución' && this.activeProfile.nivel > 1)},[Validators.required]),
      area: new FormControl({value:null,disabled:(this.activeProfile.tipo === 'institución' && this.activeProfile.nivel > 1)},[]),
      perfilId: [null,[]],
      nivel: [null, []],
      estatus: [true, []],
      createdAt: [null, []],
      updatedAt: [null, []],
      permisos: this.formBuilder.array([])
    });
  }

  get permisos(): FormArray {
    return this.formProfile.get("permisos") as FormArray;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.profile.currentValue) {
      this.profilePermissions = this.profile.permisos;
      this.oldProfilePermissions = this.profile.permisos;
      this.prepareMenusObject();
      if(this.activeProfile.tipo === 'institución' && this.activeProfile.nivel > 1){
        this.profilesList.push(this.activeProfile);
      }
      this.formProfile.patchValue(this.profile);
      if(this.activeProfile.tipo === 'institución' && this.activeProfile.nivel > 1){
        this.formProfile.controls['tipo'].patchValue(this.activeProfile.tipo);
      }
    }
  }

  onChangeMenuCheck(index: number): void {
    if (this.menus[index].activo == false) {
      this.menus[index].crear = false;
      this.menus[index].leer = false;
      this.menus[index].actualizar = false;
      this.menus[index].eliminar = false;
      this.menus[index].reportar = false;
    }
    else {
      this.menus[index].leer = true;
    }
    this.prepareRequestPermissions();
  }

  prepareMenusObject(): void {
    this.menus = [];
    this.menuList.forEach(item => {
      let menu = { activo: false, perfil: null, menu: item, nombre: item.nombre, crear: false, leer: false, actualizar: false, eliminar: false, reportar: false };

      if (this.profileId > 0 && this.profilePermissions.find(permission => item.id === permission.menu.id)) {
        let
          permissionIndex = this.profilePermissions.findIndex(permission => item.id === permission.menu.id),
          permission = this.profilePermissions[permissionIndex];

        menu.activo = true;
        menu.leer = permission.leer;
        menu.crear = permission.crear;
        menu.actualizar = permission.actualizar;
        menu.eliminar = permission.eliminar;
        menu.reportar = permission.reportar;
      }

      this.menus.push(menu);
    });
    this.prepareRequestPermissions();
  }

  prepareRequestPermissions(): void {
    while (this.permisos.length > 0) {
      this.permisos.removeAt(0);
    }
    this.menus.forEach((value) => {
      if (value.activo) {
        let newPermission = JSON.parse(JSON.stringify(value));
        delete newPermission['activo'];
        delete newPermission['nombre'];
        newPermission.perfil = (this.profileId > 0) ? this.profile : null;
        let form = this.formBuilder.group({
          perfil: [newPermission.perfil],
          menu: [newPermission.menu, [Validators.required]],
          leer: [newPermission.leer, [Validators.required]],
          crear: [newPermission.crear],
          actualizar: [newPermission.actualizar],
          eliminar: [newPermission.eliminar],
          reportar: [newPermission.reportar]
        });
        this.permisos.push(form);
      }
    });
  }

  onChangeParentProfile(value) {
    if (value > 0) {
      let selectedProfile = this.profilesList[this.profilesList.findIndex(profile => profile.id == value)];
      this.formProfile.controls['nivel'].setValue((selectedProfile.nivel + 1));
      if (selectedProfile.area != null) {
        this.formProfile.controls['area'].setValue(selectedProfile.area);
      }
    }
  }

  onChangePerentProfilePermissions(value) {
    let selectedProfilePermissions = this.profilesList[this.profilesList.findIndex(profile => profile.id === this.formProfile.controls['perfilId'].value)].permisos;
    if (value) {
      this.profilePermissions = selectedProfilePermissions;
    }
    else {
      this.profilePermissions = this.oldProfilePermissions;
    }
    this.prepareMenusObject();
  }

  onSubmitForm() {
    this.prepareRequestPermissions();
    if (this.formProfile.valid) {
      this.profileOut.emit(this.formProfile.getRawValue());
    }
    else {
      this.alerts.printSnackbar(15, null, null, "El formulario debe ser completado", 5, false, null, null);
    }
  }

  showHelpSection(): void {
    this.bottomSheet.open(HelpBottomSheetComponent,{data:this.helpsSettings});
  }
}
