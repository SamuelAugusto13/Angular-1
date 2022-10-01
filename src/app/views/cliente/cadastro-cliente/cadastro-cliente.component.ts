import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit, OnDestroy {
  cliente: Cliente = new Cliente();
  nome: string = "";
  sub: any;
  id: string = "";
  titulo = "Cadastra novo Cliente"
  
  constructor(private http: HttpClient, private clienteService: ClienteService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"]
      console.log("Id: ", this.id);
      if (this.id) {
        this.titulo = `Altera o cliente de id ${this.id}`;
        this.lerCliente(this.id);
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  VerificaCEP() {
    this.http.get(`https://viacep.com.br/ws/${this.cliente.cep}/json/`).toPromise().then( data => {
        const dado: any = data;
        this.cliente.endereco = dado.logradouro;
      }
    );
  }

  salvarCliente() {
    if (this.id) {
      this.salvaEdicaoCliente();
    } else {
      this.salvaNovoCliente();
    }
  }

  salvaEdicaoCliente(){
    let observable = this.clienteService.put(this.id, this.cliente);
    observable.subscribe(s => {
      console.log("Alterando o cliente: ", s)
    })
  }

  salvaNovoCliente() {
    let observable = this.clienteService.post(this.cliente);
    observable.subscribe(s => {
      console.log("Salvando novo cliente: ", s)
    })
  }

  lerCliente(id: string){
    let observable = this.clienteService.get(id);

    observable.subscribe(cliente => {
      console.log("Cliente do banco: ", cliente);
      this.cliente = cliente;
      console.log("Cliente da página: ", this.cliente);
    })
  }
  
}
