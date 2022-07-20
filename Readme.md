# MERN Ecommerce

![NodeJs](https://res.cloudinary.com/practicaldev/image/fetch/s--Lvl1ZNKy--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1ph7yc1i1vqqgwpxegw5.png)

## Description

An e-commerce backend with NodeJs/Mongoose, that utilizes third party API's:

1. Buyers browse the store categories, products and brands
2. Sellers or Merchants manage their own brand component
3. Admins manage and control the entire store components

- features:
  - Node provides the backend environment for this application.
  - Express middleware is used to handle requests, routes.
  - Mongoose schemas to model the application data.

---

## Database Seed

```diff
- npm run data:destroy
+ npm run data:import
```

---

## API Documentation

Postman [documentation](https://rb.gy/c5glty)

---

## Install

Some basic Git commands are:

```
$ git clone git@github.com:Mohy-dev/E-Commerce_Backend_NodeJs
$ npm install

```

---

## Setup

```
 Create .env file that include:

 - MONGO_URI & JWT_SECRET & JWT_EXPIRY
   PORT & BASE_SERVER_URL
 - MAILGUN_API_KEY & MAILGUN_DOMAIN
   EMAIL_FROM => Mailchimp configuration
```

---

## How To Use ⬇️

### Start development

```diff
+ $ npm run dev
```

---

## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

---
