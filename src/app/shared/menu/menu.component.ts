import { AfterViewInit, Component,EventEmitter,OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, AfterViewInit{

  @Input() curentPage: string = '';
  @Input() loggedInUser?: firebase.default.User | null;
  @Output() selectedPage: EventEmitter<string> = new EventEmitter<string>();
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();

constructor() { }
ngOnInit(): void {
  
}

ngAfterViewInit(): void {
}

    menuSwitch() {
    this.selectedPage.emit(this.curentPage);
  }

  close(logout?: boolean){
    this.onCloseSidenav.emit(true);
    if(logout === true){
      this.onLogout.emit(logout);
    }
  }
}
