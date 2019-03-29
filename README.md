WurzelBot 

My Bot for Wurzel Empire game using Node.js, Pug(Jade), Express, MongoDB, Puppeteer and few more.

Got to tidy this project up as it had few versions and implementations.
First one looked like this (and please don't laught I'm serious xD):

Interface: Excel
VBA for user input and data processing to txt file.

Connector: Batch scripts

Executables: C++
Parsing data from txt's into valid URL's and calling Windows Shell to open them in the browser (Chrome), opening multiple tabs for the request to plant the fields(6 per req, 204 total fields) and then simulating key press of Ctrl+W (Chrome shortcut) to close the tabs!

AND IT WORKED XD

TODO:

- Clean it up, remove excesive modules(used previous projects as a template)
- Set up server for sending XHR (CORS otherwise) Express API for handling that
- Monitor the state of the fields(MongoDB)
- Monitor and handle XHR responses
- Improve performance (dunno if the img.src hack slows the requests or game servers cant handle them that fast)
- Better interface (Maybe React)
- Automate to keep the fields busy all the time(got autologin cause the session expires after 2h)
- Maintenance of game servers around 3-5 AM (hold requests then, the plants still grow)
- Deployment and notifications
- Auto restarting and setting up after failures
- REMOVE THE DAMN PUG/JADE XD

Node.js: Server
Express: API + XHR
Mongodb & Mongoose: State of fields + logs (Maybe Redux?)
Puppeteer: Headless Chromium auto log in for 2h game session
Maybe some CSS lib/framework for better looks? (tho custom CSS is the best)