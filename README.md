
# JWT Auth

This repository has the JWT authentication with the express framework using PostgreSQL.

## API Reference

#### Register Users

```http
  POST /api/auth/register
```

| Parameter | Type     |
| :-------- | :------- |
| `username` | `string` |
| `password` | `string` |
| `role` | `string` |

#### Login User

```http
  POST /api/auth/login
```

| Parameter | Type     |
| :-------- | :------- |
| `username` | `string` |
| `password` | `string` |

#### Get Loggedin User

```http
  GET /api/auth/getUser
```

#### Logout User

```http
  GET /api/auth/logout
```
Workflow: https://lucid.app/lucidchart/80d51d9f-a3e8-4361-b310-499d7eaeb8da/edit?viewport_loc=481%2C-27%2C640%2C353%2C0_0&invitationId=inv_eb239550-597a-41e5-b694-9dc8063fc959

![Alt Text](https://www.dropbox.com/scl/fi/kij856e258p3lwtkbq22k/JWT-Token-Authentication.png?rlkey=uwxzqax1b4yljqp6ih7le89co&raw=1)
