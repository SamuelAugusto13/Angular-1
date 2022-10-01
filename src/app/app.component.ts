import { Component, OnInit } from '@angular/core';
import { Cliente } from './models/cliente';
import { ClienteService } from './services/cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'appproj01';
  listaCliente = new Array<Cliente>();

  constructor(private clienteService: ClienteService){}

  ngOnInit(): void {
    this.lerClientes();
  }

  lerClientes(){
    this.listaCliente = [];
    let observable = this.clienteService.getAll();

    observable.subscribe(l => {
      const entries = Object.entries(l)
      console.log(l);

      entries.forEach(entry => {
        const c = entry[1];
        c.id = entry[0];
        this.listaCliente.push(entry[1]);
      })
    })
  }

  excluirCliente(id: string) {
    let observable = this.clienteService.delete(id);
    observable.subscribe(c => {
      console.log("Excluindo: ", c)
    })
  }
}
