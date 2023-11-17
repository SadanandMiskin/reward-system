#  Reward system

 - [ ] live link - https://nextlabs.onrender.com/login
 - [ ] Spreadsheet - https://docs.google.com/spreadsheets/d/1WCAl_5lcxTPp7PDs_xuVHCNWhHJVPeYyFAios91PjGk/edit?usp=sharing

## Description of the Project

The online application known as the Android App Reward System has two key parts:

### Admin Facing 
The website's admin-facing section is made to allow administrators to add Android apps and reward users with points for downloading those apps. Every 24 hours, it crawls the Play Store to retrieve the app's category. Key elements consist of:
- Including Android apps and the related information.
- Giving points for downloading apps.
- Admin uploaded image name and points will be automatically updated to google sheet using google spreadsheet api.


### User Facing 
The website's user-facing section is made with end users in mind. Users can view the apps that the administrator has added and the points that go with them. Key elements consist of:
- User login and registration.
- User profiles that contain personal data.
- The user's points earned.
- The user's completed tasks.
- The ability to upload screenshots as evidence of task completion (such as confirmation of an app installation).


### Features

- **Admin Features:** 
  - Include fresh Android applications.
  - Give rewards for downloading particular apps.
  - Check whether user has uploaded the image and only give points ,if done.
  - Google Spread Sheet auto filling.

- **User Featues**
  - User registration and authentication are among the user features.
  - Control of user profiles.
  - Tracking of points.
  - Monitoring task completion.
  - Upload and manage screenshots associated with tasks.


## Getting Started

### Prerequisites

Before using the Android App Reward System, make sure you have the following prerequisites:

- Node.js and npm
- MongoDB 

### Installation

Follow these steps to set up the project:

1. Clone the project repository:

   
   - git clone https://github.com/SadanandMiskin/reward-system.git
   - cd reward-system


2. Install project dependencies:

   - npm install
 
3. Set up the database and configuration by creating (.env) file inside root directory.

4. Run the application (using nodemon):
   - nodemon server.js
   

### Usage
- The admin-facing component allows admin users to log in.
- After admin posts image , the details of the image will be auto filled in Google Spread Sheet using api.
- Points are awarded for adding Android apps.
- To access the user-facing component, user accounts can be made.
- Users can view the tasks that are accessible and the points that go with them.
- Users can provide screenshots as confirmation that they have finished tasks.

