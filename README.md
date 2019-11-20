# yetanotherdashboard
> Simple dashboard prototype made for recruitment purposes in past.

## Live preview:
https://pawel-majczyk.github.io/yetanotherdashboard/

Login: admin@admin.com
Password: admin

## Requirements given:
> * Widok pod URLem “/“ (homepage) będący formularzem logowania. Formularz powienien składać sie z 2 inputów: “email” oraz “password”. Email powinien być walidowany pod kątem tego czy jest prawidłowem adresem email. Hasło nie powinno być puste. Błędy walidacji powinny być wyświetlane bezpośrednio przy danym inpucie (w AntDesign posiadają one stan “error”. Formularz powinien przepuszczać do drugiego widoku wyłącznie zestawem danych admin/admin. Po poprawnej autentykacji, umieść inforamcję o tym że user jest zalogowany w Vuex a następnie przekieruj usera na stronę '/dashboard' 
> * Widok pod URLem “/dashboard”. Wejście na podstronę powinno być możliwe wyłącznie jeśli wskazuje na to odpowiedni stan w Vuex. Wdiok powinien posiadać następujący layout:
![alt text](https://i.imgur.com/e9hUZCK.png)
> 
> W headerze wystarczy wyłącznie napis/logo "Admin". W sidebarze powinny znaleźć się dowolne 4 pozycje menu.
> * W conetent umieść tabelę składającą się z 5 kolumn ID, Imię, email, nazwa firmy. Dane zaciągnij z https://jsonplaceholder.typicode.com/users


## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
