# Chess Openings Website

In fulfilment of the solo project assignment due Friday week 8 at QA consulting.

## The Brief

* A Trello board 
* An application with a functioning front-end website and integrated APIs.
* Automated tests for validation of the application. 
* Code fully integrated into a VCS which will subsequently be built through a CI server and deployed to a cloud-based virtual machine

## Solution

I created a chess openings website that allows a user to rate openings out of five stars and leave a comment. 

The website interacts with two h2 databases:
*One that stores star ratings and comments with full CRUD functionality
*The second stores image locations for each opening 

## Testing

JUnit, Mockito and Selenium tests have been used for automated testing, and SonarLint/SonarQube for static reporting and refactoring.

[Link to Final Surefire Report](https://github.com/JonathanAstle/Project/blob/master/Documentation/surefire-report.html)

## Technologies used

* H2 Database Engine - Database
* Java - Logic
* Jenkins - CI Server
* Maven - Dependency Management
* Surefire - Test Reporting
* Git - VCS
* Trello - Project Tracking
* GCP - Live Environment

## Front End Design

### Wireframe

![Wireframe](/wireframe.png)

### Final Appearance

![Appearance](/website.png)

## Improvements for the future

* Include Grand Master's comments on each opening's respective page
* Include performance scores for each opening
* Take a more TDD approach
* Provide a report for selenium tests

## Authors

Jonathan Astle

