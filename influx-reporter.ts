import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import axios from 'axios';

class InfluxReporter implements Reporter {
  private influxDBUrl: string;
  private influxDBToken: string;
  private org: string;
  private bucket: string;

  private testResults: Array<{ testName: string; duration: number; status: string }> = [];

  constructor() {
    this.influxDBUrl = 'http://localhost:8086';
    this.influxDBToken = 'nReATlzc1B60eFxokH59Qee0PcPmO0i5kYI0LUz7DceXTGiRVfSaULtNuVek90_M8RJ_A7IZ5zThxxYkpxdcfQ=='; // InfluxDB Token
    this.org = 'my-org'; 
    this.bucket = 'playwright'; 
  }

  async onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Test finished: ${test.title}, Status: ${result.status}, Duration: ${result.duration}ms`);
    this.testResults.push({
      testName: test.title,
      duration: result.duration,
      status: result.status,
    });
  }

  async onEnd(result: FullResult) {
    console.log('All tests finished. Sending results to InfluxDB...');
    for (const testResult of this.testResults) {
      const lineProtocol = `playwright_tests,testName=${testResult.testName.replace(
        / /g,
        '_'
      )} status="${testResult.status}",duration=${testResult.duration}`;
      try {
        await axios.post(
          `${this.influxDBUrl}/api/v2/write?org=${this.org}&bucket=${this.bucket}&precision=ms`,
          lineProtocol,
          {
            headers: {
              Authorization: `Token ${this.influxDBToken}`,
              'Content-Type': 'text/plain',
            },
          }
        );
        console.log(`Data sent to InfluxDB: ${lineProtocol}`);
      } catch (error) {
        console.error('Error sending data to InfluxDB:', error);
      }
    }
  }
}

export default InfluxReporter;
