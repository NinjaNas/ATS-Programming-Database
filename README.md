# ATS-Programming-Database

### Introduction
Boomerang Youth Inc is a non-profit organization that promotes positive growth and bounce back opportunities to middle and high school students across the Chapel Hill-Carrboro City Schools district as well as the greater Orange County District. Their biggest program, Alternative to Suspension (ATS), served around 112 students from 15 schools within the two districts during the ’21-’22 academic year. This program offers students facing suspension an opportunity to re-engage and build on their strengths by connecting and growing alongside each other.

As the program grows, Boomerang Youth Inc is finding it harder to keep up with student documentation and student-staff communication. While they currently employ several methods to store data on students, it is becoming more and more complex to access information stored across multiple domains. Therefore, Boomerang Youth Inc is looking for a software solution that would address this issue.

With this project, we aim to help the organization streamline their administrative overhead by developing new software solutions that integrate into their workflow along with providing new capabilities.

This project was developed using the Agile/XP method by Elad Ohana, Gabriel Mercado, Zackary Barbari, and Khang Tran for the COMP 523 Software Engineering Lab.

Link to Boomerang Youth's Website: https://boomerangyouth.org/

## Admin Demo
This is the demo of the admin side of the project: 
- https://www.youtube.com/watch?v=T_4iN3jzSXU

[![Admin Guide](https://user-images.githubusercontent.com/54213302/206003459-084128d3-41b4-48d6-b6ab-157a4126a31b.png)](https://www.youtube.com/watch?v=T_4iN3jzSXU)

## Student Dashboard View
Here is a snapshot of what the student will see when they log in. The page is fully functional. Students are able to create and complete tasks and fill out the questionnaire.

![Student View](https://user-images.githubusercontent.com/54213302/206004650-8e9de2e3-9c90-400d-bea2-bbcc6d1b9ad7.png)

## Technologies Used
- Frontend
  - Next.js / React.js
  - HTML / CSS / Javascript
- Backend
  - Express.js
  - Passport.js
  - Bcrypt.js
  - Jest.js
- Database
  - MySQL
  - PlanetScale

## Features
### Administrators
- Modify and create 
  - Admin and students users through the user dashboard or through the list of all users
  - Student Sessions 
  - Verifying or incompleting student tasks
  - Student attendence to the program 
  - Questionnaire and wrapup forms for the students to fill out
  - Contact information, medical information, and demographics
- Automatically aggerate and view data from the database
### Students
- Modify and create 
  - Completing tasks
- Fill out questionnaire
- Access the help page
### Technical Features
- Authorization system using passport-local strategy
- Session stores on server and database
- Queries to a MySQL database
- Unit testing on api calls using Jest.js

## Team Website
This is the team website where we have documented our team, progress, assignments, and the project.
- https://tarheels.live/comp523f22project/

[![Team Website](https://user-images.githubusercontent.com/54213302/206006404-36d718c1-3fea-4b49-af08-fb19eb52615d.png)](https://tarheels.live/comp523f22project/)

## Documentation
### User Manual and Developer Manual
The user manual contains all of the necessary information to install/setup the codebase and the database for it. It also contains the developer manual for the succending team to read, explaining the structure of the codebase, and where they should be head towards next.
- https://tarheels.live/comp523f22project/documentation-plan/
### Requirements and User Stories
The requirements that we found necessary, probable, and improbable are listed here. The user stories that guided us are also listed.
- https://tarheels.live/comp523f22project/deliverables/d1-specifications/
### Design Document and Data Dictionary
Here is our Architecture diagram, data dictionary, and design rationale.
- https://tarheels.live/comp523f22project/d2-design-document/
### Testing Plan
This shows our ideal test plan and our current test plan.
- https://tarheels.live/comp523f22project/d3-testing-plan/
### Progress
Here we documented our progress with the project, class assignments, when we met together, and when we met with the client.
- https://tarheels.live/comp523f22project/progress/
## Other Resources from COMP 523
### Next.js Tech Talk
One of the assignments for COMP 523 was a tech talk. We decided to talk about create a Next.js project and some of the important features such as special files and folders, routing, api calls, SEO, and different rendering methods (CSR, SSR, SSG, and ISR).
- https://tarheels.live/comp523f22project/tech-talk/
- https://github.com/eladohana/comp523-teamM-techtalk

## Contact Team
Team Email: comp523team-M@unc.edu

Elad Ohana (Design Coordinator): elad_ohana@med.unc.edu

Gabriel Mercado (Team Coordinator): gabomm99@email.unc.edu

Zackary Barbari (Communication Lead): zackb@unc.edu

Khang Tran (Technical Lead): ktra@email.unc.edu
