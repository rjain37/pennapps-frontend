## Inspiration
Data analytics can be **extremely** time-consuming. We strove to create a tool utilizing modern AI technology to generate analysis such as trend recognition on user-uploaded datasets.The inspiration behind our product stemmed from the growing complexity and volume of data in today's digital age. As businesses and organizations grapple with increasingly massive datasets, the need for efficient, accurate, and rapid data analysis became evident. We even saw this within one of our sponsor's work, CapitalOne, in which they have volumes of financial transaction data, which is very difficult to manually, or even programmatically parse.

We recognized the frustration many professionals faced when dealing with cumbersome manual data analysis processes. By combining **advanced machine learning algorithms** with **user-friendly design**, we aimed to empower users from various domains to effortlessly extract valuable insights from their data.

## What it does
On our website, a user can upload their data, generally in the form of a .csv file, which will then be sent to our backend processes. These backend processes utilize Docker and MLBot to train a LLM which performs the proper data analyses. 

## How we built it
Front-end was very simple. We created the platform using Next.js and React.js and hosted on Vercel.

The back-end was created using Python, in which we employed use of technologies such as Docker and MLBot to perform data analyses as well as return charts, which were then processed on the front-end using ApexCharts.js. 

## Challenges we ran into
- It was some of our first times working in live time with multiple people on the same project. This advanced our understand of how Git's features worked.
- There was difficulty getting the Docker server to be publicly available to our front-end, since we had our server locally hosted on the back-end.
- Even once it was publicly available, it was difficult to figure out how to actually connect it to the front-end.

## Accomplishments that we're proud of
- We were able to create a full-fledged, functional product within the allotted time we were given.
- We utilized our knowledge of how APIs worked to incorporate multiple of them into our project.
- We worked positively as a team even though we had not met each other before.

## What we learned
- Learning how to incorporate multiple APIs into one product with Next.
- Learned a new tech-stack
- Learned how to work simultaneously on the same product with multiple people.

## What's next for DataDaddy
### Short Term
- Add a more diverse applicability to different types of datasets and statistical analyses.
- Add more compatibility with SQL/NoSQL commands from Natural Language.
- Attend more hackathons :)
### Long Term
- Minimize the amount of work workers need to do for their data analyses, almost creating a pipeline from data to results.
- Have the product be able to interpret what type of data it has (e.g. financial, physical, etc.) to perform the most appropriate analyses. 
