# Conference Center Events

## System Architecture

#### Hardware

The web application will have a serverless architecture. The application will be deployed on Heroku. Using a PaaS solution is cost-effective as it does not require additional skill and physical infrastructure investment.

#### Software

- The applications will use a React frontend instead of Next, this is to accomodate the use of Redux for state management.

- Application styling will be done with a combination of CSS stylesheets, bootstrap and Bootsatch bootstrap themes. Bootstrap will safe time and effort designing the app user interface, but still allows for easy customisation.

- A custom Express server will be used for routing, user management and other database CRUD operations.

- A MongoDB database to store data.

- The MERN stack allows for consistent use of JavaScript for the front and back end. Furthermore React is extremely popular and has variety of third-party libraries available that can expand its factionality.

## System Requirements Specification

This application will advertise upcoming events at a conference centre. Normal users will be able to view a list of upcoming events and a super user (admin) would be able to add, edit and delete events.

This application will be used by external users who are interested in upcoming events.

### Existing Applications with Similar Functionality

[HeyConference](https://heyconference.com/)

HeyConferene is a free mobile app for participants and organisers. It allows organisers to create events, publish content for event participants and to promote and sell event tickets online. Customising the event to cater for sponsors or branding the app is done at a cost.

Although HeyConference allows organisers to manage aspects of an event, it does not cater for managing events at a single site.

[Entegy](https://entegy.com.au)

Entegy offers various standalone platforms to support event management. The Event Apps platform is a customisable app to manage events. It allows participants to view agendas, take session notes and organisers to send push notifications.

Events Apps is designed more for event management rather than managing a conference centre.

---

### Functional & Non-functional Requirments

| Req No. | Requirement                                                                   | Inputs                                  | Outputs                |
| ------- | ----------------------------------------------------------------------------- | --------------------------------------- | ---------------------- |
| FR-001  | <b>Create new event</b> - Creates a new event in the database                 | Event details                           | Confirm event creation |
| FR-002  | <b>Edit existing event</b> - Updated the event date, time, presenter or venue | Event to be updated and the new details | confirm event update   |
| FR-003  | <b>View upcoming events</b> - Displays all upcoming events ordered by date    | User prompt to see events               | Disply of events       |
| FR-004  | <b>Delete existing event</b> - Removes event for the database                 | Event cancelation notification          | Confirm event deletion |
| FR-005  | <b>Authenticate user</b> - Checks user credetials against the database        | Email and password                      | User logged in         |
| NFR-001 | <b>Users shall be authenticated before access to data is allowed</b>          | Email and password                      | User logged in         |
| NFR-002 | <b>Users can be authenticated using other passport strategies</b>             | Google/Facebook/Apple auth details      | User logged in         |

- Event details include event name, description, presenter, date, time

## App Usage

The Conference Center Events app allows users to view, modify and delete conference centre events. Normal users can view events and super users can modify and delete events. Users can register and authenticate using local, Google and Spotify [Passport](https://www.passportjs.org/) strategies.

Deployed: https://rocky-thicket-50181.herokuapp.com/

### Installation

1. Download the repository
2. In the mern_conf_centre_app/1. config directory create a file called app_keys.js for API keys.

```
app_keys.js



module.exports = {
google: {
clientID:"xxx",
clientSecret: "xxx",
},
spotify: {
clientID: "xxx",
clientSecret: "xxx",
},
mongodb: {
URI:"mongodb+srv://user:password@cluster.mongodb.net/database?retryWrites=true&w=majority",
},
session: {
cookieKey:"xxxxx",
cookieKey02: "xxxxx",
},
};



```

3. Run the following CLI commands:

```
# Install back-end dependencies - mern_conf_centre_app directory
 - npm install

 # Install front-end dependencies - mern_conf_centre_app/client directory
  - npm install

# Run the back-end and front-end  concurrently
  - npm run dev


```

## Testing

Test scripts have been created for the React front-end ( [Jest](https://jestjs.io/) ) and the Express server ( [Mocha](https://mochajs.org/) & [Chai](https://www.chaijs.com/) ).

Front-end testing:

```
mern_conf_centre_app/client directory
 - npm test
```

Back-end testing

```
mern_conf_centre_app directory
 - npm test

```

## App Security

- API keys are kept in the app-keys.js and tes_keys.js files. These have been included in the .gitignore file.
- User passwords are not stored in plain test in the database. They have been salted and hashed.
- App session cookies have been set to expire
- A content security policy has been setup using Helmet.
