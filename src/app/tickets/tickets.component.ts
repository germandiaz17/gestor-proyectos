import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TicketsService } from '../services/tickets.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './tickets.component.html'
})
export class TicketsComponent {

    newTicketName: string = ''
    newTicketComment:string = ''
    selectStatusTicket: string = ''
    tickets: any[] = []
    storyUserId!:string
    isEditing: boolean = false
    ticketNoId!: number 

    constructor(private ticketService: TicketsService, private route: ActivatedRoute) {}

    ngOnInit() {
      this.storyUserId = String(this.route.snapshot.paramMap.get('id'));
      this.loadTickets(this.storyUserId)
    }

    loadTickets(storyUserId: string) {
      this.ticketService.getTickets(storyUserId).subscribe(
        (data) => {
          this.tickets = data;
        },
        (error) => {
          console.error('Error loading tickets:', error);
        }
      );
    }

    newRegisterStoryUser(form: NgForm) {
      if (form.valid) {
        if(!this.isEditing) {
          const ticketRegister = {name:this.newTicketName, status: this.selectStatusTicket, user_story_id: parseInt(this.storyUserId), comments: this.newTicketComment};
          this.ticketService.newTicket(ticketRegister).subscribe(
            (response) => {
              alert('Ticket creado con exito')
              this.newTicketName = ''
              this.newTicketComment = ''
              this.selectStatusTicket = ''
            },
            (error) => {
              alert('Error al intentar registrar el nuevo ticket');
            }
          );
        }else {
          const ticketUpdate = {name:this.newTicketName, status: this.selectStatusTicket, comments: this.newTicketComment, ticketId:this.ticketNoId};
          this.ticketService.updateTicket(ticketUpdate).subscribe(
            (response) => {
              alert('Ticket Actualizado con exito')
              this.newTicketName = ''
              this.newTicketComment = ''
              this.selectStatusTicket = ''
              this.isEditing = !this.isEditing
            },
            (error) => {
              alert('Error al intentar registrar el nuevo ticket');
            }
          );
        }
      } else {
        alert('No has completado los campos requeridos.');
      }
    }

    changeModeEditing(ticketId:number) {
      const position = this.tickets.find(e => e.id ===ticketId)
      this.isEditing = !this.isEditing
      this.newTicketName = position.name
      this.newTicketComment = position.comments
      this.selectStatusTicket = position.status
      this.ticketNoId = ticketId
    }

    canceledTicket(ticketId:number) {
      const position = this.tickets.find(e => e.id ===ticketId)
      position.status = "canceled"
    }
}