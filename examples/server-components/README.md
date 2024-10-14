# React Server Components

## Only with React 19+
At the time of createion, React 19 is in RC stage. To install 19. Do this.
```bash
npm create vite project-name -- --template react-swc
# Choose React
# Choose JavaScript+SWC
cd project-name
npm install --save-exact react@rc react-dom@rc
npm install 
```
Note that you cannot create a TS project for React 19 yet. There are no official type definitions.

## Notes
- There's a difference between server components and server actions.
- Server Components are an automatic thing? Created by the compiler who makes an intelligent decision based on optimization if a component can be pre-rendered (thus server) or must be rendered live (thus client)?
- When compiling, the same output is created whether or not you 'use server', 'use client', or have nothing at all.
- I see no difference in additional requests to a server - any server.
