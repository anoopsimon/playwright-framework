 private static void runGradleAllureTask(String projectDir) throws IOException, InterruptedException {
        String osName = System.getProperty("os.name").toLowerCase();
        String gradleCommand = osName.contains("win") ? "gradlew.bat" : "./gradlew";
        String[] command = {gradleCommand, "allureGenerate"};

        ProcessBuilder processBuilder = new ProcessBuilder(command);
        processBuilder.directory(new File(projectDir));
        processBuilder.inheritIO();  // To show the output in the console
        Process process = processBuilder.start();
        int exitCode = process.waitFor();

        if (exitCode != 0) {
            throw new IOException("Failed to run Gradle Allure task. Exit code: " + exitCode);
        }
    }
}