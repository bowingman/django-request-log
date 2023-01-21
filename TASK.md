Technologies to be used:

Python, Django, Django Rest Framework (Optional), Bootstrap, Ajax, Sqlite

Goal:

This will be a 2 page application where you will need to create a page where basic CRUD operations can be used. No Login and Signup needed, can be open application. Second page will show log of all requests.

Details are as following:

1. Homepage will show list of users in the system with a paginated list.
2. There will be a section below the list having 4 components:

   - a. 4 Buttons on top of this section named GET, POST, PUT, DELETE
   - b. Request section on left
   - c. Response Section on right
   - d. Submit button on request section to submit the request

3. When GET button is selected, Request section should show a text input asking id of user and submission of this request should show the JSON response in response section.
4. When POST button is selected, Request section should show input fields to add new users and submission of this request should create the user and show the details in response section.
5. When PUT button is selected, Request section should show input fields with extra id field(which user you want to update) and submission of this request should update the user details and show the details in response section.
6. When DELETE button is selected, Request section should show text input asking id of user and submission of this request should delete the user and show the status in response section. But before sending this request there should be a confirmation popup.

7. Second page should show log of all requests made using homepage in a paginated list.

Notable Points:

1. Homepage should not have any reload, Once you land on homepage everything should be done using AJAX.2. Logs should show only the requests made using homepage not any other requests made to server.
2. No need to create any model, you can reuse the user model provided by django as for
   user detail, we can use only username, first name, last name and email id.
3. Any other enhancements are welcome and appreciated, But please mention them in the
   submission document.
   Submission:
4. We will be expecting the submission of this assignment by Monday. Submission can be done via public repo on github/bitbucket or as a zip file.
5. Sqlite file should be committed or should be included in zip file.
6. Along with the codebase, we would require 2 documents,
   a) README which should specify all steps to setup the project locally and run it.
   b) Documentation which should specify anything we need to know which is extra or deviation from the requirements.
   We look forward to the submission of this assignment. You can always reach me at hr@technoarchsoftwares.com or nitish@technoarchsoftwares.com for any questions or concerns
