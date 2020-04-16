import { Injectable } from '@angular/core';
import {HttpEvent,HttpInterceptor,HttpHandler,HttpRequest,HttpResponse,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError,tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
@Injectable({
    providedIn: 'root'
  })
export class Interceptor implements HttpInterceptor {

	constructor() { }

	// intercept request and add token
  	intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

        // modify request
      
       
	    request = request.clone({ headers: new HttpHeaders({
            'Content-Type':  'application/json'
            })
        })
  
        //handle response
        return next.handle(request)
	    .pipe(
	        tap(event => {
	          if (event instanceof HttpResponse) {
                // http response status code
               
                console.log(event.status);
                if(event.status == 201){
                Swal.fire('Info', 'User Created/Updated Successfully', 'success');
                }
	          }
	        }, error => {
               
                // error handling to be done here
	   			// http response status code
               console.error(error.status);
               if(error.status == 500){
                Swal.fire('Oops...', error.message, 'error')
                  //this.toaster.error('Something went wrong','INFO')
               }
               else if(error.status == 401){
                Swal.fire('Oops...',  error.message, 'error')
                //this.toaster.error('Unauthorized','INFO')
              
               }
	          	console.error(error.message);
	          	console.log("--- end of response---");

	        })
	      )

    };
  
 
}