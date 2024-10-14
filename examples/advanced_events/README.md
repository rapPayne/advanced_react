# Advanced Events

What do you do when you want to tap into an event that React doesn't handle? One that doesn't have a synthetic event create for it?

- DOMContentLoaded
- unload
- beforeUnload
- focus
- blur
- online
- offline 
- storage - When someone uses localStorage or sessionStorage
- There's an onScroll? Yeah but only for the element, not the window.
- There's an onResize? Yeah but only for `<audio>` and `<video>`
- There's an onLoad? Yeah but it's for the *content*, like an `<img src>`