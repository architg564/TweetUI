import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.get("skip")) {
    return next(req);
  }
  return next(req.clone({
    headers: req.headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
  }));
};
