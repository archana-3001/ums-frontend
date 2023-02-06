This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


Frontend : 

Src—------

    • Components—----------
        
        ◦ layout : contain basic layout 
        
        ◦ listAllUsers contain table of users and it is parent component for UserComponent
        
        ◦ listComponent : it contain 3 buttons create, update and search
        
        ◦ Login-form : username and password required and  jwt token based authentication
        
        ◦ manageUser : get all users api called from here and Usercontext is set
        
        ◦ Nav: navbar
        
        ◦ SearchByAttr : search user with one or more attributes
        
        ◦ User-form : contains form to create user
        
        ◦ userComponent: display user details it is called from listAllUsers and SearchByAttr


    • Pages—---------

        ◦ Index: http://localhost:3000/usersConfig wrap login component in layout component, it is default page
        
        ◦ userConfig: http://localhost:3000/usersConfig for create , update and search users

    • State—----------

        ◦ RefreshContext : created context for users 

        ◦ RefreshProvider : wrapped all components to use UserContext and RefreshContext 

        ◦ UserContext contains user information and Refresh context is boolean to just toggle between true and false.


