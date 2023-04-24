# **Setup Steps for developing locally**

This file describes steps for installing and/or using different components of
the MERN stack to develop our project application locally.

## **Different Technologies Used**
Name | Description
--- | ---
Babel | 
Express | 
Node | 
MongoDB | 
Mongoose | 
React | 
Typescript | 
Webpack | 

## **Node**

### **Mac Installation**

1. Install Homebrew, a terminal-based package manager. If you haven't yet
    installed Homebrew, you can do so [here](https://brew.sh/).
2. Run `brew update` to update Homebrew.
3. Run `brew install node`.
4. Check that you have both `node` and `npm` installed by running

        node -v
        npm -v

### **Setting Up Local Development Environment**

All commands should be run in the `src/` directory.

Install `npm` packages:

        npm install

To start the server on a local port, run

        npm run build
        npm run start

Then, in your browser, go to the localhost URL printed in the terminal.

Alternatively, if you would like to have the browser automatically refresh
when you save changes to React components and `server.js`, instead run

        npm run watch

Then, go to the **Loopback** URL, **not** the URL following `nodemon` output.
