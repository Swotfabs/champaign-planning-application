# Description

This is a small react project that is part of an application.
Created by Fabian Junge.

## Objective

This website will grab data from the U.S. Census Bureua on the amount of people who commuted in different ways.
The data will be obtained dynamically for the years 2010 - 2019, the data for a specific year being fetched and given whenever the user selects what year to view.

### Running the Code

Clone the project, run `npm install` to get everying set up.

To start the server run `npm start`

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Decisions
<!-- There is / will be a .json file that contains the api key for the U.S. Census Bureua as well as one named .json.template (or \[name\.template.json]) that describes where to put the api key. -->
<!-- Usually in a project I have the template and instructions for creating a file without the \[template\] and putting your api key there and have the file with the api key in .gitignore.
As part of this is getting the api key and having the project work "out of the box" I will include the actual file with the template though I normally do not do this.
 -->
Usually for a project that keeps an api key I do not hardcode the key in but rather have an external .json file the user has to put a key of their own in. As having an api key is part of the application
I would have it in the repository... except right now the key isn't validating correctly and the api is working despite not recieving having a key at all so this point is mute.

### Log 
Let's have some fun along the honesty and thought process line.
I will have descriptive commit messages, it's something I have internalized, but those will sort of show the slow journey through the project.

Here I will keep a log of my overall progress each day so you can kind of see what happened at a glance and also information that is not represented in the git project itself.

Thursday and (most of) Friday:
 * I knew none of the three component based javascript choices you said to work with. I have done *a lot* of work with Angular which is a component style framework for
everything from the javascript to the HTML to the css.
	* So looking at the choices Stencil: seems to be focused on UI which I do not need for this, React seems to be a component style system for javascript, Preact touted itself as a lightweight version of React
	* Have the most experience with Angular, a heavily component focused setup, I went with React as the one most similar to what I know.
	* I spent all of Thursday (6 to 7 hours was all the rest of my life permitted) learning React as best I could. I also found out how to use React with external APIs and created a test project with that.
	* Friday was spent with more planning and documentation reading and a whiteboard until I just sat myself down and forced myself to code as you can have all of the theory you want, but if you cannot put it into practice you have nothing to show for it.
	* Have a functioning year selector component that communicates with the data rendering component in a way that leaves the overarching App component a function component which means I'll be able to use hooks to fetch the data from the api asynchrnonously.
		* Which is to say I actually got a solid amount done on Friday.

Saturday
 * had a commitment which prevented work on the project.

Sunday
 * App working with the github api, now to figure out the census api using a lot of Postman
 * Api now works with the Census Bureau's api albeit there is some key validation wonkyness going on
 	* By which I mean the key fails to validate but I can use the Census's api without the need of a key. I sent an email regarding this.

Monday
 * Moved all census codes to a dict at the very top to increase readability and so they can be easily updated should the codes change in the future without having to touch the rest of the project.

Tuesday
 * After trying two others, managed to get google-chart working with the application. Edited to look the way I want it to and cleaned up the fetch() logic.

Wednesday
 * Cleaning, a little bit more documentation, cloning the project in an empty repository and making sure it works.

#### Plans / ToDo
This will likely be updated after I finish things and might not be in the final Readme at the end but it is here now.
* ~~Get a basic template going that has the year selection and data communication between the user input and data app (should be simple).~~ (Done)
* ~~Make sure I have external api integration working though display the results as plain text~~ (Done)
* Get the api key from the U.S. Census Buruea and mess around in Postman until I have the syntax down.
* ~~Change the api integration from earlier to connect with the U.S. Census instead of whatever I had it linked to before.~~ (Done)
* ~~Remember to put "This product uses the Census Bureau Data API but is not endorsed or certified by the Census Bureau." at the bottom of the bar graph as per the terms of service of the Census Bureau key.~~ (Done)
* ~~Have the data displayed in a bar graph instead of as plain text~~ (Done)
* ~~Refactor and clean up everything.~~ (One can do this to any arbitrary degree but right now things are readable and clean which for this application is the main thing I care about)