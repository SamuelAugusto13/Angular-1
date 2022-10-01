import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroClienteComponent } from './views/cliente/cadastro-cliente/cadastro-cliente.component';

const routes: Routes = [
  {path:"cadastro-cliente", component: CadastroClienteComponent},
  {path:"cadastro-cliente/:id", component: CadastroClienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
