# S3Util Development Guide

## Overview

The `S3Util` class, available in the comments module, is built using the AWS SDK S3 library. It provides a simple utility class, `AWSS3Util.java`, which contains methods required to interact with an AWS S3 bucket. This solution is designed to work both with a local stack container containing an S3 bucket and the AWS-hosted S3 server.

## Prerequisites

1. Docker and Docker Compose installed on your machine.
2. AWS CLI installed.
3. Docker daemon running.
4. For Rancher Desktop users, enable the Docker daemon with the command:
    ```sh
    docker context use rancher-desktop
    ```

## Setup LocalStack with S3

1. In the comments project, locate the `localstack.yaml` file. This file contains the setup required to spin up a LocalStack with an S3 bucket.
2. Run the following command to start the LocalStack Docker container:
    ```sh
    docker-compose -f localstack.yaml up
    ```

## LocalStack Endpoint

- The default port configured in the Docker Compose file is `4566`. This will be the LocalStack endpoint locally.

## Interact with LocalStack S3 via Command Line

1. Set up the necessary environment variables for AWS access keys:
    ```sh
    export AWS_SECRET_ACCESS_KEY=anything
    export AWS_DEFAULT_REGION=us-east-1
    export AWS_ACCESS_KEY_ID=anything
    ```
2. List the S3 buckets in the LocalStack:
    ```sh
    aws --endpoint-url=http://localhost:4566 s3 ls
    ```

## Development with S3Util

- The `AWSS3Util.java` class contains methods for interacting with the S3 bucket.
- Refer to the `AWSS3UtilTest.java` class for sample test cases demonstrating the usage of `S3Util`. These examples include:
  - Configuring the utility with the endpoint, region, access key ID, and secret access key.
  - Creating a bucket.
  - Checking if a bucket exists.
  - Uploading an object to a bucket.
  - Checking if a bucket contains a particular object.
  - Downloading an object as a file.
  - Deleting an object from a bucket.

## Example Commands

```sh
# Set AWS credentials for local stack
export AWS_SECRET_ACCESS_KEY=blah
export AWS_DEFAULT_REGION=us-east-1
export AWS_ACCESS_KEY_ID=blah

# Start LocalStack with Docker Compose
docker-compose -f localstack.yaml up

# List S3 buckets in LocalStack
aws --endpoint-url=http://localhost:4566 s3 ls