import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];
let sells = JSON.parse(localStorage.getItem('sells')) || [];
let settings = JSON.parse(localStorage.getItem('settings')) || [];
let suppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                //Opciones que se agregaron de Product
                case url.endsWith('/product') && method === 'POST':
                    return addProduct();
                case url.endsWith('/product') && method === 'GET':
                    return getProducts();
                case url.endsWith('/product') && method === 'PUT':
                    return updateProduct()
                //Opciones que se agregaron de Sells
                case url.endsWith('/ventas') && method === 'POST':
                    return addSell();
                case url.endsWith('/ventas') && method === 'GET':
                        return getSells();
             /*   case url.endsWith('/ventas') && method === 'PUT':
                    return add();*/
                //Settings
                case url.endsWith('/settings') && method === 'PUT':
                    return setting();
                case url.endsWith('/settings') && method === 'GET':
                        return getSettings();
                //Suppliers
                case url.endsWith('/supplier') && method === 'POST':
                    return addSupplier();
                case url.endsWith('/supplier') && method === 'GET':
                    return getSuppliers();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }
        function setting() {
            const setting = body
            
            localStorage.setItem('settings', JSON.stringify(settings));

            return ok();
        }
        function addProduct() {
            const product = body

            if (products.find(x => x.name === product.name)) {
                return error('Producto "' + product.name + '" ya esta en el inventario')
            }

            product.serial_number = products.length ? Math.max(...products.map(x => x.serial_number)) + 1 : 1;
            products.push(product);
            localStorage.setItem('products', JSON.stringify(products));

            return ok();
        }
        function addSupplier() {
            const supplier = body

            if (suppliers.find(x => x.name === supplier.name)) {
                return error('Supplier "' + supplier.name + '" ya esta registrado')
            }

            supplier.id = suppliers.length ? Math.max(...suppliers.map(x => x.id)) + 1 : 1;
            suppliers.push(supplier);
            localStorage.setItem('suppliers', JSON.stringify(suppliers));

            return ok();
        }
       function updateProduct() {
            const product = body

            if (products.find(x => x.serial_number === product.serial_number)) {
                return error('Producto "' + product.serial_number + '" ya esta en el inventario')
            }
            
            //products.push(product);
            localStorage.setItem('products', JSON.stringify(products));

            return ok();
        }

        function addSell() {
            const sell = body

            
            sells.push(sell);
            localStorage.setItem('sells', JSON.stringify(sells));

            return ok();
        }
        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function getProducts() {
            if (!isLoggedIn()) return unauthorized();
            return ok(products);
        }
        function getSells() {
            if (!isLoggedIn()) return unauthorized();
            return ok(sells);
        }
        function getSettings() {
            if (!isLoggedIn()) return unauthorized();
            return ok(settings);
        }
        function getSuppliers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(suppliers);
        }
        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};