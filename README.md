# Queue Service

## Description

This is a simple queue service that allows you to add and remove items from a queue.

## Environment Variables

.env

```bash
PORT=3000
```

## Installation

```bash
npm install
```

## Running the app

```bash

npm run start
```

## Endpoints

### Add item to queue

```bash
GET localhost:3000/api/v1/queue/enqueue
```

### Check enqueue result

```bash
GET localhost:3000/api/v1/queue/result/uuid
```
