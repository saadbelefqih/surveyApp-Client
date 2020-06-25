import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler,HttpEvent } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import {catchError, finalize, retry} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthHtppInterceptorServiceService implements HttpInterceptor{

  constructor(private router:Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      const token = "Bearer "+ sessionStorage.getItem('token');
      req = req.clone({
        setHeaders: {
          Authorization: token
        }
      })
    }

    return next.handle(req)
    .pipe(
      // Retry on failure
      retry(2),

      // Handle errors
      catchError((error: HttpErrorResponse) => {
        if(error.status===401){
          this.handleAuthError();
        }
        // TODO: Add error handling logic here
        console.log(`HTTP Error: ${req.url}`);
        return throwError(error);
      }),

      // PROFILING
      finalize(() => {
        const profilingMsg = `${req.method} "${req.urlWithParams}"`;
        console.log(profilingMsg);
      })
      );
  }

  private handleAuthError() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('token');
    Swal.fire({
      position: "bottom-left",
      icon: 'error',
      title: "Votre Session est expirée ",
      showConfirmButton: false,
      timer: 2500
      }).then(()=>{
        this.router.navigateByUrl("/login");}
        )
  }
}
