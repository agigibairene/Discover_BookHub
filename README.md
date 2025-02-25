# 📌 A BOOK DISCOVERY APP

**Discover** is an interactive book discovery platform that helps users find their next great read through an intuitive filtering system. Users can browse books by genres such as *Self-Help, Religion, Poetry, Fiction,* and *Romance* or explore curated lists like *Trending, Popular, New Releases,* and *Best Sellers.* The platform also features a **Personal Library**, allowing users to save books of interest for easy access later. Additionally, a dedicated **Popular Authors** section highlights notable writers to watch out for.

## Prerequisites
1. [Node.js](https://nodejs.org/en/download)
2. [MongoDB](https://www.mongodb.com/docs/manual/installation/)

## VISIT DISCOVER 
[Visit UI of Discover](https://discovery-app-alpha.vercel.app/)

## ACCESS DEPLOYED BACKEND 👇

1. [Access books database here](https://discover-book-alpha.vercel.app/api/books)
2. [Access authors database here](https://discover-book-alpha.vercel.app/api/authors)


## Technologies and Packages used
```
    1. Frontend: 
       - React TypeScript + vite
       - Tailwind CSS (A CSS framework for styling) & vanilla CSS
       - Framer motion for animation
       - React icons
       - Redux and Redux toolkit for state management
       - React Router DOM for routing
       - Animated images from lottie files

    2. Backend: 
       -  Node JS
       -  MongoDB for the Database
```

## Set up project
```
    git clone https://github.com/ALU-BSE/summative-a-react-discovery-app-agigibairene.git
    cd summative-a-react-discovery-app-agibairene
```

###  1. Setting up Backend:
   
```   
    cd backend
    npm install
    npm run start 
```

Create a .env file in the backend directory and add these variables to your file
```
    touch .env
    echo "MongoDB_URL = your_mongodb_connection_string" >> .env
    echo "MongoDB_Password = your_mongodb_password" >> .env
    echo "secretKey=your_secret_key" >> .env
```

### 2. Setting up Frontend:
```
    cd discovery-app
    npm install 
    npm run dev
```


### API Endpoints
```
    GET http://localhost:3000/api/authors/
    GET http://localhost:3000/api/books/
    GET http://localhost:3000/api/books?category=${category}&specificType=${specificType}

    POST http://localhost:3000/api/authors/createAuthor
    POST http://localhost:3000/api/books/createBook

```