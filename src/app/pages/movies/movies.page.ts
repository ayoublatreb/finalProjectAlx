import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
interface Movie {
  title: string;
  release_date: string;
  vote_average:number;
  poster_path:string;
  
  // ... other properties
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: any[] = [];
  currentPage = 1;
  imageBaseUrl = environment.images;
  searchQuery = '';
  
  constructor(private movieservice:MovieService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }
  async loadMovies( event?:InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieservice.getBestMovies(this.currentPage).subscribe(
      (res) => {
        loading.dismiss();
        this.movies.push(...res.results);
 
        event?.target.complete();
        if (event) {
          event.target.disabled = res.total_pages === this.currentPage;
        }
  
    
  });

}
loadMore(event: InfiniteScrollCustomEvent) {
  this.currentPage++;
  this.loadMovies(event);
}
async searchMovies() {
  this.movies = []; // Clear existing movie data
  this.currentPage = 1; // Reset current page

  const loading = await this.loadingCtrl.create({
    message: 'Searching...',
    spinner: 'bubbles',
  });
  await loading.present();

  this.movieservice.searchMovies(this.searchQuery).subscribe(
    (res) => {
      loading.dismiss();
      this.movies = res.results;

      // Handle cases where search results may have infinite scrolling
      // You may need to adapt this logic based on your API or data source
    },
    (error) => {
      loading.dismiss();
      console.error('Error while searching movies:', error);
    }
  );
}

}















