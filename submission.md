# Submission Notes

These notes are for the benefit of the reviewer - they are not required for the project submission, but feel free to include any additional information about your submission that you would like the reviewer to know.

We've provided some questions to help guide you, but feel free to include any additional information if you feel it will be helpful.

## Given more time, what would you have included or done differently?

- Fuzzy search: I didn't have enough time to get to this one!
- Unit tests for all fe components: I included some tests on the frontend to give you an idea of how I approach testing, but I didn't have time to complete all tests. In a real world project, I wouldn't ship anything that didn't have corresponding tests.
- Mobile styles: On cellular devices, the app is usable. However, it's not the prettiest and I would change the filters so they would take up less room and be more visually appealing--perhaps something like a hamburger menu/drawer combo.
- Media List Styles: I made a workable, responsive grid for the individual media styles, but if there's an odd number of results, the final row is a bit wonky. Given more time, I'd ensure style consistency. I'd also account for excessive title lengths or genres through truncation.
- Styles generally: I almost exclusively relied on MUI's `sx` prop for styling in the interest of time. In a real-world project I would avoid this, as it's essentially equivalent to in-line styling under the hood, which isn't performant, easily-maintainable, or aligned with best practices. Instead, I'd break styles out separately from the JSX.
- Performance: Lighthouse revealed that I have a performance score of 80. While it isn't terrible, there is room for improvement; especially if future scalability were important for this app. Some ideas on how to improve performance: client-side caching of genres/years for the metadata dropdowns (cache buster would be needed too), client-side caching for most viewed/recently viewed items, or serving images at different sizes based on the device's screen size to reduce download size for smaller screens.
- Security: I didn't have time to go deep into security measures on either the fe or be. For the fe I'd look into adding a content security policy to prevent XSS and click jacking. On the backend I'd look into whether or not I needed additional headers for security.

## Did you deviate from the instructions? If so, why?

- I took some small liberties with the designs for visual appeal and user experience.
  - From a user experience perspective, I didn't like that the only way to reset the media type was by using the Clear All Filters button. So I added an "All" radio option to make it easier and improve user experience. I also added a label for the radio group for accessibility compliance.
  - I alphabetized the media list results by title because it felt less random.
  - I populated the genre and years fields with the specific selections instead of the selection count. This was the native behavior of the component I used, but it would be good to match the designs after 3 or more selections for visual simplicity.

## What part of the exercise did you find the biggest challenge, and why?

- I had a hard time getting TS setup on the backend. I'm pretty familiar with setting up TS with React frontends, but I've never needed to set it up in a monorepo before, and I kept running into config issues. I know there's a way to have a hierarchy of tsconfig files, but I ultimately decided to spend my time elsewhere, as TS wasn't essential.

## Is there anything else you'd like to us to know?

- Tech Stack Considerations

  - Frontend
    - React + TS: This is the stack I'm most familiar with!
    - Material-UI: This is another library I have experience with and it streamlined my development process by reducing the overhead needed for styling, accessibility, and functionality.
  - Backend
    - Knex: This is a query builder for Node that provided an optimal way to interact with my SQL database with some built in security features.

- Bonus features
  - I added an extra GET endpoint that returns all unique genres and years for easy display in the frontend dropdowns for those categories. I did all of the transformation work on the backend because it yielded a performance boost.
  - Auto scroll to top of the list when a user goes to a new page. This was to improve user experience, as it's better than making the user scroll to the top of the list each time the page changes.
  - Visual display to indicate no matches and api errors. Explicit communication improves user experience by reducing confusion.
