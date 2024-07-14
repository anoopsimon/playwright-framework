# Contribution
Acceptance Criteria

User Story:
As a developer, I want a structured folder setup for the stubbing service so that I can efficiently organize and extend mocks for different types of services.

Acceptance Criteria:

	1.	Folder Structure:
	•	Given the ABC app repository is organized,
	•	When the stubbing solution PQR is implemented,
	•	Then it should contain separate folders for gRPC mocks and REST mocks, with the capability to add new folders for additional service types in the future.
	2.	Data Placement:
	•	Given the need to store response data for mocks,
	•	When mock responses are created,
	•	Then JSON and XML files should be placed in a data folder within each subfolder for the respective applications.

Readme Format for Folder Structure

ABC (Source Code Repository)
│
├── src (Source Code)
│
├── tests
│   ├── PQR (Stubbing Solution)
│   │   ├── grpc
│   │   │   ├── applicationX
│   │   │   │   ├── data
│   │   │   │   │   ├── response1.json
│   │   │   │   │   └── response2.json
│   │   │   ├── applicationY
│   │   │   │   ├── data
│   │   │   │   │   ├── response1.json
│   │   │   │   │   └── response2.json
│   │   │   └── applicationZ
│   │   │       ├── data
│   │   │       │   ├── response1.json
│   │   │       │   └── response2.json
│   │   ├── rest
│   │       ├── applicationA
│   │       │   ├── data
│   │       │   │   ├── response1.json
│   │       │   │   └── response2.json
│   │       ├── applicationB
│   │       │   ├── data
│   │       │   │   ├── response1.json
│   │       │   │   └── response2.json
│   │       └── applicationC
│   │           ├── data
│   │           │   ├── response1.json
│   │           │   └── response2.json
│
└── README.md (Documentation)

This format ensures clarity and ease of understanding for organizing and extending the stubbing solution.