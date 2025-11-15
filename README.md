# Game Review Service - Communication Contract

## Overview
The Review Service provides a RESTful API that lets users create, view, and delete video game reviews.

**Base URL**: `http://localhost:4000/`

## Running the Service
```bash
# Install node packages
npm install

# Run the service
npm run dev
```

The service will run on `http://localhost:4000`.

---

## API Endpoints

### 1. Create Review

**Endpoint**:

**Description**:

**Parameters**:

**Example Request**:

**Example Response** (200 OK):
```json
{

}
```

**Error Response** (404 not found):
```json
{

}
```

---

### 2. Get Review

**Endpoint**:

**Description**:

**Parameters**:

**Example Request**:

**Example Response** (200 OK):
```json
{

}
```

**Error Response** (404 not found):
```json
{

}
```

---

### 3. Delete Review

**Endpoint**: `POST /reviews/delete/:reviewId`

**Description**: Deletes the review with the given reviewId from the reviews database.

**Parameters**:
- reviewId (path parameter, integer): The unique identifier of the review.

**Example Request**:
```javascript
const reviewId = 4
const response = await fetch(`http://localhost:4000/reviews/delete/${reviewId}`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
});

const data = await response.json();
console.log(data);
```

**Example Response** (200 OK):
```json
{
    "message": "Delete successful"
}
```

**Error Response** (404 not found):
```json
{
    "message": "Review not found"
}
```
---

## Data Model
| Field | Type | Description |
|-------|------|-------------|
| `reviewId` | integer | Unique review identifier
| `userId` | integer | The review author's userId
| `gameId` | integer | The gameId of the game being reviewed
| `reviewScore` | integer | The user's rating of the game
| `review` | string | The text of the user's review