import { Component, EventEmitter,OnInit, Input , Output } from '@angular/core';

@Component({
  selector: 'app-shared-button',
  templateUrl: './shared-button.component.html',
  styleUrls: ['./shared-button.component.css']
})

export class SharedButtonComponent implements OnInit {
  @Input() label: string ="";
@Output() onClick = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  onClickButton(event :any) {
    this.onClick.emit(event);
  }
}
