<h1>Music Web Application</h1>
<p>
    A full-stack music web application made as a self project to demonstrate the use of Django and React. The application is a platform having the following key features:
    <ul>
        <li>Register and login to the application</li>
        <li>Search for different music categories</li>
        <li>Stream the music in real time with basic controls</li>
        <li>Like the music and create playlists</li>
        <li>Responsive design optimized for both desktop and mobile devices.</li>
    </ul>
</p>

<h2>Technologies Used</h2>
<ul>
    <li>
        <h3>Frontend: React, Bootstrap</h3>
        <p>
            The frontend of the application is made using React. The application is a single page application with multiple components. The application is styled using css, Bootstrap. Frontend includes components for login, music display, search, audio player, playlist, etc.
        </p>
    </li>
    <li>
        <h3>Backend: Django, Django Rest Framework</h3>
        <p>
           The Backend of the application is made using Django. The backend includes models for user and music and connected to the frontend using Django Rest Framework. The backend provide
           <ol>
                <li> APIs for user registration, music search, music streaming, providing data related to music, artists, etc. </li>
                <li> platform to directly serve the frontend </li>
           </ol>
        </p>
    </li>
    <li>
        <h3>Database: Firebase (Real time and cloud storage), SQLite</h3>
        <p>
           All the important data for the application is stored in Firebase as well as SQLite. The application use firebase SDK to interact with the firebase database. The types of databases used are:
           <ol>
                <li>Real time database: Connected to frontend and store information about the liked songs and playlists of a user.</li>
                <li>Cloud Storage: Connected to backend and store mp3 files, media files, music cover images, images of artists, etc. </li>
                <li>SQLite: Inbuilt Django Database is used to store the metadata of music, artists and users.</li>
            </ol>
        </p>
    </li>
</ul>

<h2>Installation</h2>

<h3>Pre-requisites</h3>
    <ul>
        <li>Node.js</li>
        <li>Python</li>
        <li>Django</li>
        <li>Django dependencies:
        <ul>
            <li>django-cors-headers</li>
            <li>django-rest-framework</li>
            <li>mutagen</li>
            <li>firebase-admin</li>
        </ul>
        </li>
    </ul>

You can also checkout 'requirements.txt' for more details.

<h3>Steps to start project</h3>

1. Clone the repository

```bash
git clone https://github.com/mohitdixit02/musicappproject.git
```

2. Open the project in terminal and install the dependencies

```bash
cd musicappproject/backend
pip install -r requirements.txt
```

3. Start the backend server

```bash
python manage.py runserver
```

In case you want to start the dev server of frontend, open another terminal and run the following commands:

```bash
cd musicappproject/backend/frontend
npm install
npm start
```

<h2>Suggestions</h2>
I am happy for any suggestions or improvements. Feel free to open an issue or pull request.
or you can email me on: mohit.vsht@gmail.com

Thanks !!

<h3>Author: Mohit Sharma</h3>
