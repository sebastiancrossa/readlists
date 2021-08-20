
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

**Client:** React.js

**Server:** Flask

The site uses a postgreSQL database of readlists created through Flask. The React frontend 
recieves and displays data from the Flask API backend adn Google Books API.

## CI/CD 

The deployment of Kuration.tech was automated and tested through GitHub actions, and monitored through cAdvisor, Prometheus, Grafana and a Discord bot. The database, backend and monitoring tools were containerized through Docker.

### Containers

<img width="1291" alt="Screen Shot 2021-08-20 at 1 26 58 AM" src="https://user-images.githubusercontent.com/68940723/130258117-fc31be4d-4ce0-45a9-b3d9-2cda4c3402d0.png">

### Grafana Dashboard

<img width="1440" alt="Screen Shot 2021-08-20 at 11 08 12 AM" src="https://user-images.githubusercontent.com/68940723/130258256-eb0a7ee6-9e86-4907-8bc6-1d305c9ee71b.png">

### Discord Bot

![discordbot](https://user-images.githubusercontent.com/68940723/130258462-1644d8d1-d367-4b25-a675-75e22aa87c23.png)



The AWS instance that the backend server runs on allows all traffic since firewalld handles the firewall rules on the virtual machine.

![image](https://user-images.githubusercontent.com/67514557/130160929-071d5141-aaa1-4225-af97-213c4da65472.png)
  
## Authors

This project was made as part of the Major League Hacking 
Production Engineering Fellowship.

- [@sebastiancrossa](https://www.github.com/sebastiancrossa)
- [@zuleinis](https://www.github.com/zuleinis)
- [@nimrashakoor](https://www.github.com/nimrashakoor)

  
