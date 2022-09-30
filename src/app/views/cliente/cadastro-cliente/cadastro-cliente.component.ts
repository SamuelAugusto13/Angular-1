import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {
  cliente: Cliente = new Cliente();
  
  constructor(private http: HttpClient, private clienteService: ClienteService) {
  }

  ngOnInit(): void {
  }

  VerificaCEP() {
    this.http.get(`https://viacep.com.br/ws/${this.cliente.cep}/json/`).toPromise().then( data => {
        const dado: any = data;
        this.cliente.endereco = dado.logradouro;
      }
    );
  }

  salvarCliente() {
    const c = this.cliente
    
    let observable = this.clienteService.post(c);
    observable.subscribe(s => {
      console.log("Salvando novo cliente: ", s)
    })
  }

  lerClientes(){
    let observable = this.clienteService.getAll();

    observable.subscribe(listaCliente => {
      const entries = Object.entries(listaCliente)
      console.log(listaCliente);

      entries.forEach(entry => {
        console.log(entry)
      })
    })
  }

  lerCliente(id: string){
    let observable = this.clienteService.get(id);

    observable.subscribe(cliente => {
      console.log("Apenas um cliente: ", cliente)
    })
  }

  novoCliente() {
    
  }

  alteraCliente() {
    const c = new Cliente();
    c.nome = "João dos Santos";
    c.cpf = "33333333";
    c.cep = "01001000";
    c.endereco = "Praça da Sé";
    c.id = "";

    let observable = this.clienteService.put("-NCwjKLy9NLcMVnH-umf", c);
    observable.subscribe(c => {
      console.log("Alterando um cliente: ", c)
    })
  }

  excluirCliente() {
    let observable = this.clienteService.delete("-NCx99-GwAbt6v9QZibj");
    observable.subscribe(c => {
      console.log("Cliente excluido: ", c)
    })
  }

}
