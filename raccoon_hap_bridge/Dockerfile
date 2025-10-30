# Use official Node.js LTS image
FROM node:20-bullseye-slim

# Set working directory
WORKDIR /usr/src/app

# Copy application package.json and install dependencies
COPY application/package*.json ./
RUN npm install --production

# Copy application files
COPY application/ ./

# Copy add-on scripts
COPY run.sh ./
RUN chmod a+x run.sh

# Set default command
CMD [ "/usr/src/app/run.sh" ]
