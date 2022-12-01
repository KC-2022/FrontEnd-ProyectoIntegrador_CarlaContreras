import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyectos } from 'src/app/model/proyectos';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-new-proyectos',
  templateUrl: './new-proyectos.component.html',
  styleUrls: ['./new-proyectos.component.css']
})
export class NewProyectosComponent implements OnInit {
  nombre: string;
  img: string;

  constructor(private proyectosS: ProyectosService,private activatedRouter: ActivatedRoute,
    private router: Router, public imageService: ImageService) { }

  ngOnInit(): void {
  }

  onCreate(): void{
    const proyectos = new Proyectos(this.nombre, this.img);
    this.proyectosS.save(proyectos).subscribe(
      data => {
        alert("Proyecto creado correctamente");
        this.router.navigate(['']);
      }, err =>{
        alert("Falló al añadir Proyecto");
        this.router.navigate(['']);
      }
    )
  }
  uploadImage($event:any){
    const id= this.activatedRouter.snapshot.params['id'];
    const name = "proyecto_" + id;
    this.imageService.uploadImage($event, name)
    
  }

}
