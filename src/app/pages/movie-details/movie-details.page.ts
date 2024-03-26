import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: any;
  imageBaseUrl = environment.images;
  constructor( private router:ActivatedRoute,
    private movieService: MovieService) { };

  ngOnInit() {
    
    const id = this.router.snapshot.paramMap.get('id');

    if (id) {
      this.movieService.getMoviesDetails(id).subscribe(
        (res) => {
          this.movie = res;
          console.log(this.movie);
        },
        (error) => {
          console.error('Error retrieving movie details:', error);
        }
      );
    }
}
openHomepage(URL: string) {
  window.open(URL, '_blank');
}
}











