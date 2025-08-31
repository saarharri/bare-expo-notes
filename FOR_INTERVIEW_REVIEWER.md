
# Original Homework Proposal

As part of the homework assignment to develop a Peer-to-Peer decentralized network architecture application, I propose an offline-first mobile application designed for educational use in remote, internet-scarce environments such as rural villages in developing countries or mountainous regions. The application enables decentralized data sharing and collaboration among peers (e.g., teachers and students) without relying on a central server or internet connectivity.

The Minimal Viable Product focuses on core features: allowing users to post questions (e.g., by a teacher) and submit replies (e.g., by students), with all data stored locally on devices and synced peer-to-peer when connections are available.

This eliminates the need for costly hardware infrastructure, such as dedicated servers, and addresses challenges like unreliable power or maintenance in low-resource settings.

To extend its utility, the application incorporates a “data mule” paradigm, where a mobile user (e.g., a traveling teacher) acts as a synchronization bridge between isolated groups, propagating updates across disconnected networks.

Built with an offline-first architecture, the app ensures usability in isolation (e.g., students reviewing content at home) while enabling opportunistic syncing upon rejoining peers.

This approach leverages P2P principles to promote resilience, scalability, and accessibility in underserved areas, contrasting with traditional client-server models that depend on stable internet and centralized infrastructure

# Final Result

### overview 

This project was developed as interview homework with a planned four-hour timeframe, therefore the feature scope was slightly narrowed.

The testing process involved one Android device and one emulator, with both tests performed on an Ubuntu system.

### Current Features
- Join and leave swarms
- Add notes and view notes lists
- Monitor peer connection counts
- Import notes from connected peers
- Offline functionality with sync capabilities when back online

# Known Problems

## 1 .mjs type checks
Type checking automation for .mjs files would save developers significant debugging time by catching errors during build runtime.

## 2 re-discovering peers 
Connection drops can prevent peer discovery; current workaround involves both devices leaving and rejoining the swarm, but automatic reconnection is needed.

## 3 importing notes solution
The current peer note import architecture has scalability limitations. When the UI requests peer notes, the backend queries all connected peers simultaneously, collects their responses, and returns the merged results. This synchronous approach works with our current limited peer and notes count but would fail with thousands of peers/notes. 

HyperCore’s replication technology represents the ideal solution, but properly implementing it would require significant additional time to master the intricacies of its swarming and replication systems. Balancing thoroughness with project timelines, we selected the current approach while recognizing it has scaling trade-offs.

## 4 Testing improvements
The current testing setup with one emulator and one Android device on Ubuntu needs expansion to include multiple physical devices and additional peers. 

Future testing priorities should focus on automated UI simulation to ensure the app doesn’t crash during user interactions and all the features work.

Notes merging between peers represents the highest-risk functionality due to its complexity. We should implement comprehensive unit tests and simulations using different input scenarios to verify that expected outcomes are delivered.

## 5 IOS, Windows 10

Windows 10 build does not finish successfully. Not tested on IOS.

## 6 

...

# Final Concluding technical reflection

I was impressed by the "Pear by Holepunch" framework, The ease of building P2P applications.

This technology represents a real breakthrough in the field, and I’m interested to explore it further.

While this homework assignment certainly has room for growth, I believe it demonstrates my problem-solving approach and implementation skills across both backend and frontend development.
