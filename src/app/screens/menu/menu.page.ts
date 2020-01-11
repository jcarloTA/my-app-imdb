import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  selectedPath = '';
  public appPages = [
    {
      title: 'Peliculas',
      url: '/menu/films',
      icon: 'film'
    },
    {
      title: 'Peliculas Favoritas',
      url: '/menu/favorite-movies',
      icon: 'heart'
    },
    {
      title: 'Ver despues',
      url: '/menu/watch-later',
      icon: 'play'
    },
  ];


  constructor(private router: Router) {
    console.log('aslsdfkasldkj')
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
    console.log('inital menu')
  }

}
