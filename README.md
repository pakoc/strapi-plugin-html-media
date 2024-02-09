# HTML MEDIA

The html-media plugin provides a custom customField that allows you to upload zip archives with html pages to the Strapi CMS. These zip archives contain mini web applications with an index.html launch file in the root of the archive. Upon uploading a mini application archive, the server unpacks the archive and saves information about it in a separate table called html-media in the database.

Each uploaded mini application is assigned a unique identifier called uid, through which you can retrieve information about it by making a GET request to /html-media/<uid>. The information about a mini application includes the following fields:

```json
{
  "id": 73,
  "uid": "133f63b3-3dbf-42ae-bf66-a5bb10a805ca",
  "sourceUrl": "/uploads/media/sources/media-example_133f63b3-3dbf-42ae-bf66-a5bb10a805ca.zip",
  "viewUrl": "/uploads/media/view/media-example_133f63b3-3dbf-42ae-bf66-a5bb10a805ca/index.html",
  "createdAt": "2024-02-06T11:41:18.748Z",
  "updatedAt": "2024-02-06T11:41:18.748Z",
  "fileName": "media-example.zip",
  "size": 18893479
}
```

- uid: Unique identifier for the mini application
- sourceUrl: Path to the original zip file
- viewUrl: Path to the unpacked mini application
- createdAt: Date and time when the mini application was created
- updatedAt: Date and time when the mini application was last updated
- fileName: Original filename from the upload
- size: Size of the archive in bytes

Enjoy using the html-media plugin for managing and uploading mini web applications with ease in your Strapi CMS.

## ⏳ Installation

## 🛠️ Plugin Configuration

## 🖐 Requirements

Supported Strapi versions:

Strapi v4.x.x
