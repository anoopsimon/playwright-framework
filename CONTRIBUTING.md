
# AutoX Java Kafka Util

## Kafka Util Overview

### 1. Introduction to Kafka Util

AutoX Java REST module contains the Kafka Util, which helps interact with Kafka topics by producing and consuming messages and asserting JSON responses received from the topic. This basic Kafka Util can be extended depending on project demands.

### 2. Current Kafka Development and Automation Frameworks in the Bank

Within the bank, most Kafka development is done using the BSERV framework, developed with Spring Boot for developing and deploying Kafka. Teams using Kafka for distributed event store and stream processing platform and the testing team require automation features to connect to Kafka topics, post messages, and read messages. Scenarios include:
- Posting messages to a topic
- Consuming messages from a topic
- Both posting and consuming messages

Features of the Kafka Util include:
- Seamless integration with Kafka topics
- Posting messages
- Consuming messages
- Asserting received messages

Current automation frameworks:
- **Karate**: Offers Kafka automation features and is heavily used within the bank.
- **BSERV Framework's Kafka Utility**: Provides seamless integration with Kafka topics and works well with the BSERV framework used for building Kafka.

### 3. Kafka Util Features in AutoX Java

AutoX Java aims to standardize frameworks while providing Kafka automation. Features include:
- Kafka client class exposing methods to connect to Kafka using properties stored in `AutoX.properties`
- SSL certificate configuration for BSERV Kafka servers authentication
- Methods to produce and consume messages
- Methods to assert received messages

### 4. Building and Maintaining Kafka Utility Locally

To develop the Kafka Utility:
1. Ensure Docker daemon, Rancher Desktop, and Docker Compose are installed and running.
2. Use the `Kafka.yaml` file to set up a working Kafka environment locally:
   ```sh
   docker-compose -f kafka.yaml up
   ```
   This command will spin up Kafka locally and expose the broker on port 9092 by default.

3. Access the Kafka client:
   - `src/main/java/com/bank/autox/kafka/KafkaClient.java`
   - Add new functionalities based on project requirements.

4. Configure AutoX framework in `src/test/resources/autox.properties` file:
   - Kafka properties follow the format:
     ```
     kafka.[application-name].bootstrap-servers
     kafka.[application-name].topic
     ```
   - This allows multiple Kafka configurations in the same properties file.

5. Usage examples are provided in the Kafka client test file, loading configurations from `autox.properties` and seamlessly using produce and consume methods.
