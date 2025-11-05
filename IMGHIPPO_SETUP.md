# ImgHippo Image Upload Setup

This application uses ImgHippo API for storing student profile images.

## Setup Instructions

1. **Get your ImgHippo API Key:**

   - Visit https://imghippo.com/
   - Create an account or log in
   - Navigate to your API settings to get your API key

2. **Configure the API Key:**

   - Open `backend/.env` file
   - Replace `YOUR_API_KEY_HERE` with your actual ImgHippo API key:
     ```
     IMGHIPPO_API_KEY=your_actual_api_key_here
     ```

3. **Restart the backend server** after updating the .env file

## Features

- **Upload Images:** Students can have profile pictures uploaded to ImgHippo
- **Delete Images:** Remove profile pictures when needed
- **Auto-cleanup:** When uploading a new image, the old one is automatically deleted from ImgHippo
- **Size Limit:** Maximum 50MB per image (as per ImgHippo API limits)
- **Supported Formats:** All standard image formats (jpg, png, gif, etc.)

## API Endpoints

### Upload Student Image

```
POST /upload/student/:id/image
Content-Type: multipart/form-data
Authorization: Bearer <token>

Body:
- file: <image file>
```

### Delete Student Image

```
DELETE /upload/student/:id/image
Authorization: Bearer <token>
```

## Database Fields

The Student entity now includes:

- `school` (string, optional)
- `parentPhoneNumber` (string, optional)
- `parentEmail` (string, optional)
- `imageUrl` (string, optional) - ImgHippo permanent URL
- `imageViewUrl` (string, optional) - ImgHippo CDN URL for viewing
