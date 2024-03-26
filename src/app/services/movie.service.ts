import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface ApiRes {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }

  private apiKey = '8d337e1e1fe73e9372bb86ef280f4885';
  private apiUrl = 'https://api.themoviedb.org/3';

  getBestMovies(page = 1): Observable<ApiRes>{
    return this.http.get<ApiRes>(
      `${environment.baseUrl}/movie/popular?page=${page}&api_key=${environment.apikey}`
    );
  }
  getMoviesDetails(id:string): Observable<any>{
    return this.http.get<ApiRes>(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apikey}`
    );
  }

  searchMovies(query: string): Observable<any> {
    const url = `${this.apiUrl}/search/movie`;
    const params = {
      api_key: this.apiKey,
      query: query,
    };

    return this.http.get(url, { params });
  }
}
