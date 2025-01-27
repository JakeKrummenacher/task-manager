This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This app currently runs on [this Vercel Deployment](https://jake-task-manager.vercel.app/)

### Note: The WebSocket Server runs on Heroku and may need a minute or so to start up. 
## My approach to this application

First, I went ahead with the creation of the Next.js app. While this is not explicitly react only, create-react-app was not appealing to me due to it being currently deprecated. I am able to adapt to any framework built on React as needed (or take on any new front end framework as needed).

#### I had a few things in mind when creating the WebSocket server:

1. Adding tasks
2. Removing Tasks
3. Completing tasks
4. Marking tasks as incomplete (though this was not a requirement, upon doing some quality assurance, I felt that a sort of "undo" action was desired)
5. Sorting tasks by completion (this was also not a requirement, but I think intuitively, a user of such an application would want their outstanding tasks to show up first.)
6. Sufficient logging to understand issues as they arise

#### The front end is pretty straight forward, but I had a couple things in mind when creating it:
1. Use TailwindCSS as it is a popular CSS solution right now. I am flexible with any type of CSS as needed
2. Make sure that everything functions as a user would expect it to. For example, when a task is already completed, a line is drawn through the text, and the button text changes to "Mark as Incomplete".
3. Use Prettier to make the app more uniform all around
4. Use TypeScript for good practice

## Running the App Locally:

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then, start the WebSocket Server in a seperate terminal instance: 
```bash
node server.js
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
