# Mini Project 5
### Brandon Foshe and Zane Jones
### Live link: to come
---
### This is a movie wishlister site using a Single Page Application
#### In this SPA we have:
|Purpose |Extension |
|--- |--- |
|Home - the home page to browse and add movies |/ |
|Login - the login page to sign in or sign up |/login |
|Create User - the page for creating a user account |/createUser |
|Wishlist - view and download your wishlisted movies |/wishlist |
|Movie pages - view more information about movies |/movie/(movie name) |
#### To navigate to a movie page, find the movie and click on "View Details"
#### Or use this format: /movie/Movie%20Title

---
### Code organization:
#### In the components folder, we have 4 components: Login, MovieCard, NavBar, and Wishlist
#### In the public folder, we keep our movie database (movie.json) and our assets (like movie pictures / logo)
#### In our routes folder, we have the formatting displayed when going to a page
#### In the app folder, we have all the above folders, plus app essentials: app.css, auth.js root.tsx, and routes.ts

---
### User authentication:
#### Users are able to sign up, log in, and log out of their account through the login page
#### In order to view / download your list of wishlisted movies, you must be logged in
