# Use the official Deno image as a base. Using a specific version is recommended.
FROM denoland/deno:1.44.4

# The port that your application listens to. Not needed for this bot, but good practice.
# EXPOSE 8000

WORKDIR /app

# Copy the configuration example. The actual config.ts will be mounted as a volume.
COPY config.example.ts .

# Copy dependencies file first to leverage Docker layer caching.
COPY deno.json .

# Copy all source code and locales.
COPY src/ ./src/
COPY locales/ ./locales/
COPY main.ts .

# Create a config.ts from the example for build-time caching.
# The actual config.ts will be mounted by the user at runtime.
RUN cp config.example.ts config.ts

# Cache the dependencies. This will download all npm modules from the import map.
# This step is crucial for faster builds if dependencies don't change.
RUN deno cache main.ts

# Switch to the non-root 'deno' user for security.
USER deno

# Define the command to run the bot.
# We expect the user to mount their config.ts and a data directory.
# --allow-read=. : Allows reading source files, config.ts, and bindings.json
# --allow-write=./data : Restricts writing only to the persistent data volume.
CMD ["run", "--allow-net", "--allow-env", "--allow-read=.", "--allow-write=./data", "main.ts"]