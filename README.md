# Chess Openings Website

In fulfilment of the solo project assignment due Friday week 8 at QA consulting.

## The Brief

*A Trello board 
*An application with a functioning front-end website and integrated APIs.
*Automated tests for validation of the application. 
*Code fully integrated into a VCS which will subsequently be built through a CI server and deployed to a cloud-based virtual machine

## Solution

I created a chess openings website that allows a user to rate openings out of five stars and leave a comment. 

The website interacts with two h2 databases:
*One that stores star ratings and comments with full CRUD functionality
*The second stores image locations for each opening 

## Testing

JUnit, Mockito and Selenium tests have been used for automated testing, and SonarLint/SonarQube for static reporting and refactoring.

Final surefire report: 
[Link to Final Surefire Report](/surefire-report.html)

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

![Poses Wireframe](/wireframe.png)





```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
