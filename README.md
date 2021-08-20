
# Kuration

Like choosing songs to listen to, 
finding books to read can be hard. Kuration recommends “readlists” 
that carry books grouped by different topics and learnings so that
readers can spend less time browsing, and more time reading!

You can see the website in action at [Kuration.tech](https://www.kuration.tech).

## Demo

https://user-images.githubusercontent.com/67514557/130158349-a42f8bd1-19c2-4033-b24c-9b29ff6f01ce.mov

## Run Locally

Please refer to the client and server directories for instructions
on how to run each component separately.

## Tech Stack

This project was primarily written in Python and JavaScript.

**Client:** React

**Server:** Flask

The site uses a postgreSQL database of readlists created through Flask. The React frontend 
recieves and displays data from the Flask API backend.

## CI/CD

The deployment of Kuration.tech was automated and tested through GitHub actions, and monitored through cAdvisor and a Discord bot. The database and cAdvisor were both containerized through Docker.

The AWS instance that the backend server runs on allows all traffic since firewalld handles the firewall rules on the virtual machine.

![image](https://user-images.githubusercontent.com/67514557/130160929-071d5141-aaa1-4225-af97-213c4da65472.png)
  
## Authors

This project was made as part of the Major League Hacking 
Production Engineering Fellowship.

- [@sebastiancrossa](https://www.github.com/sebastiancrossa)
- [@zuleinis](https://www.github.com/zuleinis)
- [@nimrashakoor](https://www.github.com/nimrashakoor)

  
